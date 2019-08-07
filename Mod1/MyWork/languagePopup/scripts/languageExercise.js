/*Description: Usage of BOM exercise for language / In-progress and Not complete yet
 *Author: HartCode Programmer
 *Date:08/05/2019
 * Updated on 08/06/2019
 */
"Use Strict";
window.onload = function() {
    msgDivField = document.getElementById("msgDiv");
    const openBtnField = document.getElementById("openBtn")
    let popupWindow;

    openBtnField.onclick = function() {
        popupWindow = window.open("index.html", "popUpWin", "height=500,width=300");
        let browserLanguage = navigator.language;
        console.log("language: " + navigator.language);
        let pos1 = browserLanguage.indexOf("-");
        language = browserLanguage.substr(0, pos1);
        nation = browserLanguage.substr(pos1 + 1);
        console.log("language: " + language)
        console.log("nation: " + nation)
        switch (language) {
            case "en":
                if (nation = "US") {
                    msg = "Hello World";
                } else {
                    msg = "Hola Mundo";
                }
                break;
            case "de":
                msg = "Hallo Welt";
                break;
            default:
                break;
        }
        let msgDiv = document.getElementById("msgDiv");
        msgDiv.innerHTML = msg;

        popupWindow.focus();
    }
    popupWindow.onload = function() {
        let browserLanguage = navigator.language;
        console.log("language: " + navigator.language);
        let pos1 = browserLanguage.indexOf("-");
        language = browserLanguage.substr(0, pos1);
        nation = browserLanguage.substr(pos1 + 1);
        console.log("language: " + language)
        console.log("nation: " + nation)
        switch (language) {
            case "es":
                if (nation = "US") {
                    msg = "Hello World";
                } else {
                    msg = "Hola Mundo";
                }
                break;
            case "de":
                msg = "Hallo Welt";
                break;
            default:
                break;
        }
        const msgDiv = googleBtnOpen.document.getElementById("msgDiv");
        msgDiv.innerHTML = msg;
    }
}