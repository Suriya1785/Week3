/*Description: Usage of DOM exercise - Image Handler
 *Author: HartCode Programmer
 *Date:08/07/2019
 */
"Use Strict";
window.onload = function() {
    // find all input with checkboxes
    let imageFiles = ["images/13pioustemple.jpg", "images/carRental1Icon.jpeg", "images/homepageImage.jpg"];
    let imageDescriptions = ["Temple Icon", "Bullock Cart", "Place of little town"];
    const allImages = document.querySelectorAll("img");

    // Apply src, alt and class attribute dynamically through javascript
    for (let i = 0; i < allImages.length; i++) {
        allImages[i].src = imageFiles[i];
        allImages[i].alt = imageDescriptions[i];
        // Below applies bootstrap 4 class for styling
        allImages[i].classList.add("rounded-circle");
        //Below applies custom rounded circle class from custom css
        // allImages[i].classList.add("rounded_circle");
    }
};