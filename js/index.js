document.addEventListener("DOMContentLoaded", ()=> {
    let selectPrefix = document.querySelector("#prefixSelect");
    let inputPrefix = document.querySelector("#prefixInput");
    let inputMobile = document.querySelector("#mobileNumber");
    let btnWrap = document.querySelector(".buttons");
    inputPrefix.value = "";
    inputMobile.value = "";
    populateOptions(selectPrefix);

    btnWrap.addEventListener("click", (event)=> {
        let error = false;
        if (selectPrefix.value === "0" && inputPrefix.value === "") {
            showToast("Prefix needed to proceed");
            error = true;
        } 
        if (inputMobile.value === "") {
            showToast("Mobile Number needed to proceed");
            error = true;            
        }
        if(!error) btnEvents({btnWrap:btnWrap, event:event, selectPrefix:selectPrefix, inputPrefix:inputPrefix, inputMobile:inputMobile});
    });

})

function showToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#075e54",
          color:"#dcf8c6",
          borderRadius:"16px" 
        },
        onClick: function(){} // Callback after click
      }).showToast()
}

function btnEvents({btnWrap, event, selectPrefix, inputPrefix, inputMobile}) {
    let fullNum = getValidNum({selectPrefix:selectPrefix, inputPrefix:inputPrefix, inputMobile:inputMobile});
    let whatsappUrl = `https://wa.me/${fullNum}`;
    if (event.target.getAttribute("id") === "sendMSG") {
        // Open the WhatsApp chat
        window.open(whatsappUrl, '_blank');
    }
    else if (event.target.getAttribute("id") === "sendHi") {
        let waMsgUrl = `${whatsappUrl}?text=${encodeURIComponent("Hi")}`;
        // Open the WhatsApp chat
        window.open(waMsgUrl, '_blank');
    }
    else if (event.target.getAttribute("id") === "makeCall") {
        let Call = 'tel:' + fullNum;
        window.open(Call,'_blank');
    }
    else if (event.target.getAttribute("id") === "makeMessage") {
        let Msg = 'sms:' + fullNum;
        window.open(Msg,'_blank');
    }
    else if (event.target.getAttribute("id") === "copyLink") {
        let copyMessage = document.createElement("p");
        btnWrap.parentElement.appendChild(copyMessage);
        if (navigator.clipboard) {
            navigator.clipboard.writeText(whatsappUrl)
              .then(() => {
                  copyMessage.textContent = `Link copied: ${whatsappUrl}`;    
              })
              .catch(err => {
                  console.error('Error copying link: ', err);
                  copyMessage.textContent = 'Failed to copy link.';
              });
        } else {
            // Fallback for unsupported browsers
            const textArea = document.createElement('textarea');
            textArea.value = whatsappUrl;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                copyMessage.textContent = `Link copied: ${whatsappUrl}`;
            } catch (err) {
                console.error('Error copying link: ', err);
                copyMessage.textContent = 'Failed to copy link.';
            }
            document.body.removeChild(textArea);

        }
    }
}

function getValidNum({selectPrefix, inputPrefix, inputMobile}){
    let prefixValue;
    let mobileValue = inputMobile.value;
    let rawValue = (selectPrefix.value !== "0") ? selectPrefix.value
    : (inputPrefix.value !== "") ? inputPrefix.value
    : "91";
    prefixValue = (rawValue.includes("+")) ? rawValue.replace("+", "") : rawValue;
    if(isNaN(prefixValue) || isNaN(mobileValue)) return
    return `${prefixValue}${mobileValue}`;
}

async function populateOptions(selectElm){
    let data = await fetchAPI("https://restcountries.com/v3.1/all?fields=name,cca2,idd");
    data.sort((a, b) => a.name.common.localeCompare(b.name.common))
    data.forEach(obj => {
        let optionElm = document.createElement("option");
        optionElm.setAttribute("data-countrycode", obj.cca2);
        optionElm.setAttribute("value", getEntry (obj.idd));
        optionElm.textContent =`${obj.name.common}`
        selectElm.appendChild(optionElm);
    });
}

function getEntry (obj) {
    let string;
    let num;
    for ( let [key, value] of Object.entries(obj)) {
        if (typeof(value) === "string") string = value;
        if (typeof(value) === "object") num = value.join("");
        if (string !== undefined && num !== undefined) {
            //console.log(`${string}${num}`)
            return `${string}${num}`
        } 

    }
}

async function fetchAPI(apiurl){
    try {
        const response = await fetch(apiurl);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
}