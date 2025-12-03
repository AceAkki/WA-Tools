import { Main } from "./classMain.js";

document.addEventListener("DOMContentLoaded", ()=> {
    render(document.querySelector("#root"));
    const classMain = new Main({ selectSelector:"#prefixSelect", prefixSelector:"#prefixInput", mobileSelector:"#mobileNumber", btnsParent:".buttons" });
    classMain.initMain();
})

function render(container) {
    container.innerHTML =
    `
    <div class="main-container">
        <div class="min-sec">
            <label>Select Country</label>
            <select name="countryCode" id="prefixSelect">
                <option data-countrycode="default" value="0" selected>Select Country</option>
            </select>
        </div>
        <div class="min-sec">
            <label>Custom Prefix</label>
            <input id="prefixInput" type="number" maxlength="5">
        </div>
        <div class="min-sec">
            <label>Mobile Number</label>
            <input id="mobileNumber" type="number">
        </div>
        <div class="buttons">
            <div class="btns-grp">
                <a class="btn" id="sendMSG">WA Message</a>
                <a class="btn" id="sendHi">With Hi</a>
            </div>
            <div class="btns-grp">
                <a class="btn" id="makeCall">Call </a>
                <a class="btn" id="makeMessage">Message </a>
            </div>
            <div class="btns-grp">
                <a class="btn" id="copyLink">Link </a>
            </div>
        </div>
    </div>
    `

}

