import { Utility } from "./classUtility.js";
const classUtility = new Utility();

export class Main {
    constructor({selectSelector, prefixSelector, mobileSelector, btnsParent}){
        this.selectPrefix = document.querySelector(selectSelector);
        this.inputPrefix = document.querySelector(prefixSelector);
        this.inputMobile = document.querySelector(mobileSelector);
        this.btnWrap = document.querySelector(btnsParent);
    }

    initMain(){
        this.populateOptions();
        this.updateSelect();
        this.btnWrap.addEventListener("click", (event)=> {
            let error = false;
            if (this.selectPrefix.value === "0" && this.inputPrefix.value === "") {
                classUtility.showToast("Prefix needed to proceed");
                error = true;
            } 
            if (this.inputMobile.value === "") {
                classUtility.showToast("Mobile Number needed to proceed");
                error = true;            
            }
            if(!error) this.btnEvents({event:event});
        });
    }

    // events for all btns in btn wrap
    btnEvents({event}) {
        let fullNum = this.getValidNum();
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
            let copyMessage;
            if (this.btnWrap.parentElement.querySelector(".copy-msg")) {
                copyMessage = this.btnWrap.parentElement.querySelector(".copy-msg");
            } else {
                copyMessage = document.createElement("p");
                copyMessage.classList.add("copy-msg");
                this.btnWrap.parentElement.appendChild(copyMessage);
            }
    
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

    // helper method that modifies then returns valid prefix + num value
    getValidNum(){
        let prefixValue;
        let mobileValue = this.inputMobile.value;
        let rawValue = (this.selectPrefix.value !== "0") ? this.selectPrefix.value
        : (this.inputPrefix.value !== "") ? this.inputPrefix.value
        : "91";
        prefixValue = (rawValue.includes("+")) ? rawValue.replace("+", "") : rawValue;
        if(isNaN(prefixValue) || isNaN(mobileValue)) return
        return `${prefixValue}${mobileValue}`;
    }

    // poppulates the select element with option values
    async populateOptions(){
        let data = await classUtility.fetchAPI("https://restcountries.com/v3.1/all?fields=name,cca2,idd");
        data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        data.forEach(obj => {
            let optionElm = document.createElement("option");
            optionElm.setAttribute("data-countrycode", obj.cca2);
            optionElm.setAttribute("value", this.getEntry (obj.idd));
            optionElm.textContent =`${obj.name.common}`
            this.selectPrefix.appendChild(optionElm);
        });
    }

    // helper method used is populate options to get value
    getEntry(obj) {
        let string;
        let num;
        for ( let [key, value] of Object.entries(obj)) {
            // this can be avoided all together its only + symbol
            if (typeof(value) === "string") string = value;
            if (typeof(value) === "object") num = value.join("");
            if (string !== undefined && num !== undefined) {
                //console.log(`${string}${num}`)
                return `${string}${num}`
            } 
        }
    }   

    // automatically update select after geolocation is enabled
    updateSelect() {
        classUtility.getLocation()
        .then(async (locationObject) => {
            // automatically shows current location based on navigator.geolocation
            let countryCode = await classUtility.getCountry(locationObject.coords.latitude, locationObject.coords.longitude);
            if (countryCode !== undefined) {
                Array.from(this.selectPrefix.querySelectorAll("option")).forEach(elem => elem.removeAttribute("selected", ""));
                Array.from(this.selectPrefix.querySelectorAll("option")).find((elm) => {
                    if (elm.getAttribute("data-countrycode").toLowerCase() === countryCode.toLowerCase()) {
                        elm.setAttribute("selected", "");
                    }
                });                
            }
        })
        .catch(err => console.log(err))
    }
}