/*Description: Usage of DOM exercise - Image Handler
 *Author: HartCode Programmer
 *Date:08/07/2019
 */
"Use Strict";
window.onload = function() {
    // Set reference for anchor button
    const largerLinkField = document.getElementById("largerlink");
    const smallerLinkField = document.getElementById("smallerLink");
    largerLinkField.onclick = increaseFontSize;
    smallerLinkField.onclick = decreaseFontSize;
    // Note: Event handler does not pass arguments    
};

/* Event Handler function to decrease font size function
 * @param = None
 * calls to changeParaSize()
 */
function decreaseFontSize() {
    let percentChange = -20;
    changeParaSize(percentChange);
}

/* Event Handler function to increase font size function
 * @param = None
 * calls to changeParaSize()
 */
function increaseFontSize() {
    let percentChange = 20;
    changeParaSize(percentChange);
}

/* Function is to read and calculate the font size change  
 * @param = percentChange is number - indicates percentate of font size
 * calls to "None"
 */
function changeParaSize(percentChange) {
    const allParas = document.querySelectorAll("p");
    let len = allParas.length;
    let size;
    for (let i = 0; i < len; i++) {
        let para = allParas[i];
        // check whether fontSize is default, if default, set it to 1.0em
        if (para.style.fontSize == "") {
            size = "1.0em";
        } else {
            // parseFloat function extracts the floating number from passed string (1.0em to 1.0)
            size = parseFloat(para.style.fontSize);
            size = size + (size * (percentChange / 100));
            size = size + "em";
        }
        // set fontsize with the calculated size
        allParas[i].style.fontSize = size;
    }
}