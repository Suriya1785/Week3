/* Script to exercise multi dimensional arrays - Foodmenu arrays
 * Author: HartCode programmer
 * Date: 07/31/2019
 */
"Use Strict";

window.onload = function() {
    const selectMountainListField = document.getElementById("selectMountainList");
    let errorMsgIdField = document.getElementById("errorMsgId");
    let listOfMountainObjects;

    // Load dropdown from JSON data file
    $.getJSON("data/data.json", function(data) {
        listOfMountainObjects = data;
        loadFoodMenuListDropDown(listOfMountainObjects);
    });

    //Event handler function to assign for onclick
    selectMountainListField.onchange = function() {
        let isValid = checkUserInput(selectMountainListField, errorMsgIdField);
        if (isValid) {
            listMenuOption(listOfMountainObjects, selectMountainListField);
            document.getElementById("errorMsgId").innerHTML = " ";
        } else {
            document.getElementById("itemlist").innerHTML = " ";
        }
    };
};


/* Event Handler function to load menu dropdown during windows Onload 
 * @param = foodMenu (javascript object array - 2D) - contains list of food menu items
 * calls to None
 */
function loadFoodMenuListDropDown(listOfMountainObjects) {
    for (let i = 0; i < listOfMountainObjects.mountains.length; i++) {
        let addOptionItem = document.createElement("option");
        addOptionItem.value = listOfMountainObjects.mountains[i].name;
        addOptionItem.text = listOfMountainObjects.mountains[i].name;
        let parentDiv = document.getElementById("selectMountainList");
        parentDiv.appendChild(addOptionItem);
    }
}

/* Event Handler function to load menu dropdown during windows Onload 
 * @param = foodMenu (javascript object array - 2D) - contains list of food menu items
 * @param = selectCategoryField (string - option dropdown) - contains the selected food category type
 * calls to None
 */
function listMenuOption(listOfMountainObjects, selectMountainListField) {
    let selectMountainList = selectMountainListField.options[selectMountainListField.selectedIndex].value;
    let table = document.getElementById("itemlist");
    table.className = "table table-striped mt-3 border";
    let thead = document.querySelectorAll("thead");
    if (thead.length == 0) {
        let head = table.createTHead();
        head.classList.add("tableBorder");
        row = head.insertRow(0);
    }

    // create tbody if it does not exist and assign an ID, if already exists, clear them  
    // table.innerHTML = " "; use if we want to clear the whole table
    let tbody = document.getElementById("mountainBodyListId");
    if (tbody != null) {
        tbody.innerHTML = " ";
        row = tbody.insertRow(0);
        tbody.classList.add("tableBorder");
    } else {
        tableBody = table.createTBody();
        tableBody.id = "mountainBodyListId";
        row = tableBody.insertRow(0);
        tableBody.classList.add("tableBorder");
    }

    // Loop through food menu items to read through 2D array and display food price
    for (let i = 0; i < listOfMountainObjects.mountains.length; i++) {
        if (selectMountainList == listOfMountainObjects.mountains[i].name) {
            let cellNameTitle = row.insertCell(0);
            cellNameTitle.innerHTML = "Name";
            let cellName = row.insertCell(1);
            cellName.innerHTML = listOfMountainObjects.mountains[i].name;
            row = table.insertRow(table.rows.length);
            let cellElevationTitle = row.insertCell(0);
            cellElevationTitle.innerHTML = "Elevation";
            let cellElevation = row.insertCell(1);
            cellElevation.innerHTML = listOfMountainObjects.mountains[i].elevation;
            row = table.insertRow(table.rows.length);
            let cellEffortTitle = row.insertCell(0);
            cellEffortTitle.innerHTML = "Effort";
            let cellEffort = row.insertCell(1);
            cellEffort.innerHTML = listOfMountainObjects.mountains[i].effort;
            row = table.insertRow(table.rows.length);
            let cellImgTitle = row.insertCell(0);
            cellImgTitle.innerHTML = "Images";
            let imgElement = document.createElement("img");
            cellImg = row.insertCell(1);
            imgElement.src = "images/" + listOfMountainObjects.mountains[i].img;
            imgElement.alt = listOfMountainObjects.mountains[i].name;
            cellImg.appendChild(imgElement);
            row = table.insertRow(table.rows.length);
            cellDescTitle = row.insertCell(0);
            cellDescTitle.innerHTML = "Description";
            cellDesc = row.insertCell(1);
            cellDesc.innerHTML = listOfMountainObjects.mountains[i].desc;
            row = table.insertRow(table.rows.length);
            cellCoordsTitle = row.insertCell(0);
            cellCoordsTitle.innerHTML = "Coords";
            cellCoords = row.insertCell(1);
            cellCoords.innerHTML = '"lat": ' + listOfMountainObjects.mountains[i].coords.lat + "<br>" + ' "lng": ' +
                listOfMountainObjects.mountains[i].coords.lng;
        }
    }
}


/* This function is to validate user selection
 * populate error message field
 * @param (string) - selected food category type dropdown
 * @param (string) - Error message field to build appropriate error message
 */
function checkUserInput(selectCategoryField, errorMsgIdField) {
    let errorMsg, isError = false;
    // set Error flag based on number validation
    if ((selectCategoryField.selectedIndex == -1) || (selectCategoryField.selectedIndex == " ")) {
        errorMsg = "Select valid menu option item list to display";
        isError = true;
    } else {
        isError = false;
    }
    // Set attribute and content for para tag - Error message / Success
    if (isError == true) {
        document.getElementById("errorMsgId").innerHTML = errorMsg;
        $(errorMsgIdField).addClass("badInput");
        return false;
    } else {
        return true;
    }
}