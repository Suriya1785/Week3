/*Description: Usage of DOM exercise - Create images dynamically
 *Author: HartCode Programmer
 *Date:08/07/2019
 */
"Use Strict";
//window onload function to set the references

let imageObj = [
    { key: "temple", source: "images/13pioustemple.jpg", altTxt: "kabaleeswar temple", optTxt: "Kabaleeshwar Temple" },
    { key: "cart", source: "images/cartwheel.jpeg", altTxt: "cartwheel - transporter", optTxt: "Cart Wheel" },
    { key: "place board", source: "images/board.jpg", altTxt: "Spot to visit", optTxt: "Kumbakonam" },
    { key: "tourSport", source: "images/toursport.jpg", altTxt: "Mesmerizing tourist spot", optTxt: "Mahal" },
    { key: "mansion", source: "images/mansion.jpg", altTxt: "Famous Mansion", optTxt: "Mansion" },
    { key: "saving", source: "images/savings.jpg", altTxt: "Save for future", optTxt: "Savings" },
    { key: "kumbeshwar", source: "images/kumbeshwar.jpg", altTxt: "Arulmigum Kumbeshwar for moksha", optTxt: "Kumbeshwar Temple" },
    { key: "masimagam", source: "images/Masimagam.jpg", altTxt: "Be at Masimagam once in life", optTxt: "Masimagam adventure" },
]

window.onload = function() {
    // Set reference for add and clearAll button
    const addImgBtnField = document.getElementById("addImgBtn");
    const clearAllBtnField = document.getElementById("clearAllBtn");
    addImgBtnField.onclick = addImage;
    clearAllBtnField.onclick = clearAllImage;
    // To load image list dropdown during window load
    loadImgListDropDown();
    // Note: Event handler does not pass arguments    
};

/* Event Handler function to load Images upon looking at all objects in the javascript object array
 * @param = None
 * calls to None
 */
function loadImgListDropDown() {
    for (let i = 0; i < imageObj.length; i++) {
        let addOptionItem = document.createElement("option");
        addOptionItem.value = imageObj[i].key;
        addOptionItem.text = imageObj[i].optTxt;
        let parentDiv = document.getElementById("selectImgItem");
        parentDiv.appendChild(addOptionItem);
    }
}

/* Event Handler function to add Images based on the selection
 * @param = None
 * calls to None
 */
function addImage() {
    let selectImgItemField = document.getElementById("selectImgItem");
    let errorMsgIdField = document.getElementById("errorMsgId");
    let isValid = checkUserInput(selectImgItemField, errorMsgIdField);
    if (isValid) {
        let imgItemToAdd = selectImgItemField.options[selectImgItemField.selectedIndex].value;
        for (let i = 0; i < imageObj.length; i++) {
            if (imageObj[i].key == imgItemToAdd) {
                let addImageItem = document.createElement("img");
                addImageItem.src = imageObj[i].source;
                addImageItem.alt = imageObj[i].altTxt;
                let parentDiv = document.getElementById("allImgDivs");
                parentDiv.appendChild(addImageItem);
                break;
            }
        }
    }
}

/* Event Handler function to clear all images
 * @param = None
 * calls to changeParaSize()
 */
function clearAllImage() {
    let parentDiv = document.getElementById("allImgDivs");
    parentDiv.innerHTML = " ";
}


/* This function is to validate user selection
 * populate error message field
 * @param (string) - selected image dropdown
 * @param (string) - Error message field to build appropriate error message
 */
function checkUserInput(selectImgItemField, errorMsgIdField) {
    let errorMsg, isError = false;

    // set Error flag based on number validation
    if (selectImgItemField.selectedIndex <= 0) {
        errorMsg = "Select the image item list to be added";
        isError = true;
    } else {
        isError = false;
    }
    // Set attribute and content for para tag - Error message / Success
    if (isError == true) {
        document.getElementById("errorMsgId").innerHTML = errorMsg;
        $(errorMsgIdField).addClass("badInput");
    } else {
        return true;
    }
}