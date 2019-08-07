/*Description: Usage of BOM exercise
 *Author: HartCode Programmer
 *Date:08/05/2019
 * Updated on 08/06/2019
 */
"Use Strict";
window.onload = function() {
    const googleBtnField = document.getElementById("googleBtn");
    const hartfordBtnField = document.getElementById("hartfordBtn");
    const w3SchoolsBtnField = document.getElementById("w3SchoolsBtn");
    const closeBtnField = document.getElementById("closeBtn");

    googleBtnField.onclick = function() {
        googleBtnOpen = window.open("https://www.google.com");
    };
    hartfordBtnField.onclick = function() {
        let params = "height=600, width=600, top=25, left=25, menubar=no, location=yes, toolbar=yes";
        hartfordOpen = window.open("https://www.thehartford.com/", "hartford", params);
        hartfordOpen.focus();
        console.log(navigator.language);
    };
    w3SchoolsBtnField.onclick = function() {
        let params = "height=600, width=400";
        w3schoolsBtnOpen = window.open("https://www.w3schools.com/js", "w3", params);
    };

    /*Function is to close all opened window. Make sure you close all windows
     * Calls to: None
     * @param: None (uses variables within onload function)
     */
    closeBtn.onclick = function() {
        googleBtnOpen.close();
        w3schoolsBtnOpen.close();
        hartfordOpen.close();
    };
}