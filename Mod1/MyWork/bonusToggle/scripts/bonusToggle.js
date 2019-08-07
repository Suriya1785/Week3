/*Description: Usage of DOM exercise - querySelectorAll
 *Author: HartCode Programmer
 *Date:08/06/2019
 */
"Use Strict";
window.onload = function() {
    // find all input with checkboxes
    const allCheckboxes = document.querySelectorAll("input[type='checkbox']");

    for (let i = 0; i < allCheckboxes.length; i++) {
        allCheckboxes[i].onclick = function() {
            let selection = this.value;
            // we cannot pass variable inside CSS style selector
            let selectedImages = document.querySelectorAll("img[alt$=" + selection + "]");
            selectedCheckboxLength = selectedImages.length

            // Perform toggling based on current status of the style and onload they all come with "displayed"
            for (let j = 0; j < selectedCheckboxLength; j++) {
                if (selectedImages[j].parentNode.style.display == "none") {
                    selectedImages[j].parentNode.style.display = "block";
                } else {
                    selectedImages[j].parentNode.style.display = "none";
                }
            }
        };
    }
}