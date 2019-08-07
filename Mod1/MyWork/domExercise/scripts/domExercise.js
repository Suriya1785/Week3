/*Description: Usage of DOM exercise
 *Author: HartCode Programmer
 *Date:08/06/2019
 */
"Use Strict";
window.onload = function() {
    let allParas = document.getElementsByTagName("p");
    let allImgs = document.getElementsByTagName("img");
    allParasLength = allParas.length;
    allImgsLength = allImgs.length;
    for (let i = 0; i < allParasLength; i++) {
        switch (allParas[i].innerHTML) {
            case "TempleIcon":
            case "CartrentalIcon":
            case "HomepageIcon":
                allParas[i].style.border = "2px solid green";
        }
    }

    let allClasses = document.getElementsByClassName("imageGroup");
    allClassesLength = allClasses.length;
    for (let i = 0; i < allClasses.length; i++) {
        allClasses[i].style.border = "2px solid red";
    }

}