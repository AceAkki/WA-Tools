import { Main } from "./classMain.js";

document.addEventListener("DOMContentLoaded", ()=> {
    let selectPrefix = document.querySelector("#prefixSelect");
    let inputPrefix = document.querySelector("#prefixInput");
    let inputMobile = document.querySelector("#mobileNumber");
    let btnWrap = document.querySelector(".buttons");
    inputPrefix.value = "";
    inputMobile.value = "";
    const classMain = new Main({selectElm:selectPrefix, prefixElm:inputPrefix, mobileElm:inputMobile, btnsParent:btnWrap });
    classMain.initMain();
})
