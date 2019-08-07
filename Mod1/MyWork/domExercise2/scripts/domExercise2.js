/*Description: Usage of DOM exercise - querySelectorAll
 *Author: HartCode Programmer
 *Date:08/06/2019
 */
"Use Strict";
window.onload = function() {
    // Below gives images without alt attribute in img selector
    let allImgsWoAlt = document.querySelectorAll("img:not([alt])");


    // let allImgsWoAlt = document.querySelectorAll("img[alt]");
    for (let i = 0; i < allImgsWoAlt.length; i++) {
        allImgsWoAlt[i].alt = "graffiti image";
    }

    //document.images will give you the list of all images
    let allImgs = document.images;
    for (let i = 0; i < document.images.length; i++) {
        let paraId = "para";
        let imgId = document.images[i].getAttribute("id");
        console.log(imgId);
        let imgLastChar = imgId.substr(imgId.length - 1);
        paraId = paraId + imgLastChar;
        document.getElementById(paraId).innerHTML = document.images[i].getAttribute("alt");
    }
}