/*Description: window onload Init script to assign function on button for Tour Explorer 
 *Author: HartCode Programmer
 *Date:08/02/2019
 */

/* This function is called during window onload of the Tour Explorer page and 
 * assign function to the button
 * No parameters
 * Calls: None
 */
"Use Strict";
window.onload = function() {
    const selectCategoryField = document.getElementById("selectCategory");

    selectCategoryField.onchange = function() {
        let selectCategory = selectCategoryField.options[selectCategoryField.selectedIndex].value;
        // define the array with key tourist inputs
        listOfTouristSpot = [
            { category: "Sightseeing", title: "Kuberan Falls", description: "Spend an afternoon searching for our invisible falls. Pan for gold while you look", cost: 29.99 },
            { category: "Sightseeing", title: "Kumbeshwar temple", description: "Spend an evening by praying lord shiva", cost: 10.99 },
            { category: "Sightseeing", title: "Nageshwar temple", description: "Spend an night during Navarathri by praying lord shiva", cost: 10.99 },
            { category: "Adventure", title: "River Madhi", description: "Spend 2 hours by boat and enjoy the rid", cost: 5.99 },
            { category: "Adventure", title: "River Bhavani", description: "Spend an hour and eat roadside fish fry, amazing feeling", cost: 9.99 },
            { category: "Adventure", title: "Mount Rockfort", description: "Climb and make a workout for being healthy", cost: 3.99 },
            { category: "Museums/Galleries", title: "Amazing cartwheel", description: "Visit our great science museum with the list of cart wheels and different sizes from ancient history.", cost: 20.99 },
            { category: "Museums/Galleries", title: "Chola temple", description: "Visit our golden temple and look at sculptures from 1800.", cost: 15.99 },
        ]


        // loop through the object array and create the output for matching selection and publish it into p tag.
        let table = document.getElementById("tours");
        table.style.border = "1px solid red";
        // table.style.borderColor = "red";
        let row;
        let tableBody;

        // Create the header if it does not exist and apply the font-weight bold class
        let thead = document.querySelectorAll("thead");
        if (thead.length == 0) {
            let head = table.createTHead();
            head.classList.add("boldHeader");
            row = head.insertRow(0);
            let cellHeaderTitle = row.insertCell(0);
            cellHeaderTitle.innerHTML = "Title";
            let cellHeaderDescription = row.insertCell(1);
            cellHeaderDescription.innerHTML = "Description";
            let cellHeaderCost = row.insertCell(2);
            cellHeaderCost.innerHTML = "Cost";
        }

        // create tbody if it does not exist and assign an ID, if already exists, clear them  
        // table.innerHTML = " "; use if we want to clear the whole table
        let tbody = document.getElementById("tourBodyId");
        if (tbody != null) {
            tbody.innerHTML = " ";
            row = tbody.insertRow(0);
        } else {
            tableBody = table.createTBody();
            tableBody.id = "tourBodyId";
            row = tableBody.insertRow(0);
        }


        //Run through the object array to build the table for the selected list
        for (i = 0; i < listOfTouristSpot.length; i++) {

            // Ignore for the first occurrence, as row is created to place the reference at tbody & tr
            if (listOfTouristSpot[i].category == selectCategory) {
                let cellTitle = row.insertCell(0);
                cellTitle.innerHTML = listOfTouristSpot[i].title;
                let cellDescription = row.insertCell(1);
                cellDescription.innerHTML = listOfTouristSpot[i].description;
                let cellCost = row.insertCell(2);
                cellCost.innerHTML = listOfTouristSpot[i].cost;
                row = table.insertRow(table.rows.length);
            }
        }

    }
};