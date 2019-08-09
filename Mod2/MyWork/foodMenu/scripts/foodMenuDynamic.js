/* Script to exercise multi dimensional arrays - Foodmenu arrays
 * Author: HartCode programmer
 * Date: 07/31/2019
 */
"Use Strict";

window.onload = function() {
    let foodMenu = [{
            menu: "Breakfast",
            items: [
                { item: "Sausage and Egg Biscuit", price: 3.49 },
                { item: "Sandwich", price: 2.5 },
                { item: "Halva", price: 9.5 }
            ]
        },
        {
            menu: "Lunch",
            items: [
                { item: "Biscuits and Water", price: 5.49 },
                { item: "Vegetable Sandwich", price: 4.5 },
                { item: "Dosa-2Nos", price: 3.5 },
                { item: "Idli-2Nos", price: 2.5 }
            ]
        },
        {
            menu: "Dinner",
            items: [
                { item: "Chicken Sandwich", price: 7.49 },
                { item: "Coke", price: 1.5 },
                { item: "Paniyaram-2Nos", price: 3.2 },
                { item: "Vada", price: 2.8 },
                { item: "Lemonade", price: 1.9 }
            ]
        }
    ];
    const selectCategoryField = document.getElementById("selectCategory");
    let errorMsgIdField = document.getElementById("errorMsgId");
    loadFoodMenuListDropDown(foodMenu);

    //Event handler function to assign for onclick
    selectCategoryField.onchange = function() {
        let isValid = checkUserInput(selectCategoryField, errorMsgIdField);
        if (isValid) {
            listMenuOption(foodMenu, selectCategoryField);
            document.getElementById("errorMsgId").innerHTML = " ";
        } else {
            document.getElementById("menu").innerHTML = " ";
        }
    };
};


/* Event Handler function to load menu dropdown during windows Onload 
 * @param = foodMenu (javascript object array - 2D) - contains list of food menu items
 * calls to None
 */
function loadFoodMenuListDropDown(foodMenu) {
    for (let i = 0; i < foodMenu.length; i++) {
        let addOptionItem = document.createElement("option");
        addOptionItem.value = foodMenu[i].menu;
        addOptionItem.text = foodMenu[i].menu;
        let parentDiv = document.getElementById("selectCategory");
        parentDiv.appendChild(addOptionItem);
    }
}

/* Event Handler function to load menu dropdown during windows Onload 
 * @param = foodMenu (javascript object array - 2D) - contains list of food menu items
 * @param = selectCategoryField (string - option dropdown) - contains the selected food category type
 * calls to None
 */
function listMenuOption(foodMenu, selectCategoryField) {
    let selectedFoodCategory = selectCategoryField.options[selectCategoryField.selectedIndex].value;
    let table = document.getElementById("menu");
    table.classList.add("tableBorder");
    let thead = document.querySelectorAll("thead");
    if (thead.length == 0) {
        let head = table.createTHead();
        head.classList.add("tableBorder");
        row = head.insertRow(0);
        let cellHeaderFood = row.insertCell(0);
        cellHeaderFood.innerHTML = "Food";
        let cellHeaderPrice = row.insertCell(1);
        cellHeaderPrice.innerHTML = "Price";
    }

    // create tbody if it does not exist and assign an ID, if already exists, clear them  
    // table.innerHTML = " "; use if we want to clear the whole table
    let tbody = document.getElementById("foodMenuList");
    if (tbody != null) {
        tbody.innerHTML = " ";
        row = tbody.insertRow(0);
        tbody.classList.add("tableBorder");
    } else {
        tableBody = table.createTBody();
        tableBody.id = "foodMenuList";
        row = tableBody.insertRow(0);
        tableBody.classList.add("tableBorder");
    }

    // Loop through food menu items to read through 2D array and display food price
    for (let i = 0; i < foodMenu.length; i++) {
        if (selectedFoodCategory == foodMenu[i].menu) {
            for (let j = 0; j < foodMenu[i].items.length; j++) {
                let cellFood = row.insertCell(0);
                cellFood.innerHTML = foodMenu[i].items[j].item;
                let cellPrice = row.insertCell(1);
                cellPrice.innerHTML = "$" + foodMenu[i].items[j].price.toFixed(2);
                row = table.insertRow(table.rows.length);
            }
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