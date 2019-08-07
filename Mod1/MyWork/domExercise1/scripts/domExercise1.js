/*Description: Usage of DOM exercise
 *Author: HartCode Programmer
 *Date:08/06/2019
 */
"Use Strict";
window.onload = function() {
    let allInputs = document.querySelectorAll('input[type="text"]');
    const clickBtnField = document.getElementById("clickBtn");

    clickBtnField.onclick = function() {
        let str1 = "";
        for (let i = 0; i < allInputs.length; i++) {
            str1 = str1 + allInputs[i].value + "\n";
        }
        alert(str1);

        // for (let i = 0; i < allInputs.length; i++) {
        //     allInputs[i].value = " ";
        // }

        //space out through forEach function
        Array.from(allInputs).forEach(tempFunction);

    };
}

/*function is to take each items and run through condition
 * @param = item type in querySelector collections
 */

function tempFunction(input) {
    input.value = " ";
}