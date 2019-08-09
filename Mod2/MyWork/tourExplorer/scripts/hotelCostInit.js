/*Description: window onload Init script to assign function on button for hotel cost calculator
 *Author: HartCode Programmer
 *Date:08/02/2019
 */

/* This function is called during window onload of the Hotel Cost calculator page and 
 * assign function to the button
 * No parameters
 * Calls: canRoomHold(), checkNumeric(), getRoomCost(), getBreakfastCost(), getDiscount(), resetForm()
 */
"Use Strict";
window.onload = function() {
    const selectRoomTypeField = document.getElementById("selectRoomType");

    let inputCheckInDateField = document.getElementById("inputCheckInDate");
    let inputNoOfNightsField = document.getElementById("inputNoOfNights");

    const selectNoOfAdultsField = document.getElementById("selectNoOfAdults");
    const selectNoOfChildField = document.getElementById("selectNoOfChild");

    let inputCheckboxBrkfstYesField = document.getElementById("inputCheckboxBrkfstYes");

    let inputRadioboxNoneField = document.getElementById("inputRadioboxNone");
    let inputRadioboxAAAField = document.getElementById("inputRadioboxAAA");
    let inputRadioboxSrField = document.getElementById("inputRadioboxSr");
    let inputRadioboxMilField = document.getElementById("inputRadioboxMil");

    let errorMsgIdField = document.getElementById("errorMsgId");
    let totalCostField = document.getElementById("totalCost");
    let taxField = document.getElementById("tax");
    let discountField = document.getElementById("discount");
    let totalRoomCostField = document.getElementById("totalRoomCost");
    const estimateTotalCostBtnField = document.getElementById("estimateTotalCostBtn");
    let inclusiveDateField = document.getElementById("inclusiveDate")
    const resetBtnField = document.getElementById("resetBtn");
    resetBtnField.onclick = resetForm;

    estimateTotalCostBtnField.onclick = function() {
        let validateUserInput = false;
        // Assign/convert read string for calculation
        let noOfNights = Number(inputNoOfNights.value);

        // Array with the list of room types and its property. will be replaced with server call
        let roomCostList = [
            { roomType: "Queen", maxOccupancy: 5, seasonRatePerNight: 250, restOfYearRate: 150 },
            { roomType: "King", maxOccupancy: 2, seasonRatePerNight: 250, restOfYearRate: 150 },
            { roomType: "King Suite", maxOccupancy: 4, seasonRatePerNight: 310, restOfYearRate: 190 },
            { roomType: "2-Bedroom Suite", maxOccupancy: 6, seasonRatePerNight: 350, restOfYearRate: 210 }
        ];
        let roomType = selectRoomTypeField.options[selectRoomTypeField.selectedIndex].value;
        let selectNoOfAdults = Number(selectNoOfAdultsField.options[selectNoOfAdultsField.selectedIndex].value);
        let selectNoOfChild = Number(selectNoOfChildField.options[selectNoOfChildField.selectedIndex].value);
        let inputCheckboxBrkfstYes = inputCheckboxBrkfstYesField.checked;

        let inputRadioboxAAA = inputRadioboxAAAField.checked;
        let inputRadioboxSr = inputRadioboxSrField.checked;
        let inputRadioboxMil = inputRadioboxMilField.checked;
        let discountCode, breakfastIncluded;
        errorMsgId = errorMsgIdField.value;
        let inputCheckInDate = new Date(inputCheckInDateField.value);
        // validate the room availability based on number of people
        let canRoomHold = canRoomHoldCustomer(roomType, selectNoOfAdults, selectNoOfChild, roomCostList);

        // validate user input and fire error message, otherwise proceed with calculation.
        validateUserInput = checkNumeric(noOfNights, selectRoomTypeField, selectNoOfAdultsField, inputCheckInDateField, errorMsgIdField, canRoomHold);

        if (!validateUserInput) {
            // clear out the result (previously successful response), if there is an error in input validation.
            totalRoomCostField.innerHTML = " ";
            discountField.innerHTML = " ";
            taxField.innerHTML = " ";
            totalCostField.innerHTML = " ";
            inclusiveDateField.innerHTML = " ";
        } else {
            // set discount Code
            if (inputRadioboxAAA) {
                discountCode = "AAA";
            } else if (inputRadioboxSr) {
                discountCode = "Senior";
            } else if (inputRadioboxMil) {
                discountCode = "Military";
            } else {
                discountCode = " ";
            }

            // Set breakfast code
            if (inputCheckboxBrkfstYes) {
                breakfastIncluded = true;
            } else {
                breakfastIncluded = false;
            }
            // call following functions to find out checkout date, room cost, breakfast cost, discount amount
            let checkoutDate = getCheckoutDate(inputCheckInDate, noOfNights)
            let roomCost = getRoomCost(roomType, inputCheckInDate, noOfNights, roomCostList);
            let breakfastCost = getBreakfastCost(noOfNights, discountCode, selectNoOfAdults, selectNoOfChild, breakfastIncluded);
            let roomCostBeforeDiscount = roomCost + breakfastCost;
            let discount = getDiscount(roomCost, discountCode, breakfastIncluded);
            let totalRoomCostWithoutTax = roomCostBeforeDiscount - discount;
            let taxAmount = 0.12 * totalRoomCostWithoutTax;
            let totalCost = taxAmount + totalRoomCostWithoutTax;

            let inputCheckInDateFix = new Date(inputCheckInDate.getTime() + (1000 * 60 * 60 * 24));

            // Publish the result to document
            inclusiveDateField.innerHTML = "Check-in Date: " + inputCheckInDateFix.toDateString() + "<br>" + "Check-out Date: " + checkoutDate.toDateString();
            totalRoomCostField.innerHTML = "Total room Cost : $ " + roomCostBeforeDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            discountField.innerHTML = "Discount : $ " + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            taxField.innerHTML = "Tax : $ " + taxAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            totalCostField.innerHTML = "Total Cost: $ " + totalCost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

            // success message
            if (isNaN(totalCost)) {
                document.getElementById("errorMsgId").innerHTML = "Error";
                $(errorMsgIdField).removeClass("badInput");
            } else {
                document.getElementById("errorMsgId").innerHTML = "Success";
                $(errorMsgIdField).removeClass("badInput");
            }
        }
    };

    /* Function is to reset the results section in the hotel page
     *  @param = None
     * Uses the field defined with in onload function
     * Calls to None
     */

    function resetForm() {
        totalRoomCostField.innerHTML = " ";
        discountField.innerHTML = " ";
        taxField.innerHTML = " ";
        totalCostField.innerHTML = " ";
        inclusiveDateField.innerHTML = " ";
        errorMsgIdField.innerHTML = " ";
    }
}



/*Function to find out whether selected roomtype can hold number of individuals  
 * @param roomType is a string - selected roomType user input value
 * @param numAdults is a number - user input of number of Adults
 * @param numKids is a number - user input of number of child
 * @param roomCostList is array of objects with roomtype, max occupancy, rates
 * Calls to: None
 */
function canRoomHoldCustomer(roomType, numAdults, numKids, roomCostList) {
    let totalNoOfindividuals = numAdults + numKids;
    for (let i = 0; i < roomCostList.length; i++) {
        if (roomCostList[i].roomType == roomType) {
            switch (roomCostList[i].roomType) {
                case "Queen":
                case "King":
                case "King Suite":
                case "2-Bedroom Suite":
                    if (totalNoOfindividuals <= roomCostList[i].maxOccupancy) {
                        console.log("Room can hold");
                        return true;
                    }
                    break;
                default:
                    break;
            }
        }

    }
}

/*Function to calculate room cost based on room type, number of nights and check-in date 
 * @param roomType is a string - selected roomType user input value
 * @param checkinDate is a date - user selected date  
 * @param numKids is a number - user input of number of child
 * @param roomCostList is array of objects with roomtype, max occupancy, rates
 * Apply always the cheap rates
 * calls to: None
 */
function getRoomCost(roomType, checkinDate, numNights, roomCostList) {
    let roomCost;
    for (let i = 0; i < roomCostList.length; i++) {
        if (roomCostList[i].roomType == roomType) {
            switch (roomCostList[i].roomType) {
                case "Queen":
                case "King":
                case "King Suite":
                case "2-Bedroom Suite":
                    roomCost = numNights * (roomCostList[i].restOfYearRate);
                    console.log(roomCost);
                    break;
                default:
                    break;
            }
        }
    }
    return roomCost;
}

/*Function to calculate breakfast cost based on number of nights, discount code, number of adults and number of children 
 * @param noOfNights is a Number - selected roomType user input value
 * @param discount Code is a string - code indicate the discount chosen 
 * @param numAdults is a number - user input of number of Adults
 * @param numKids is a number - user input of number of child
 * @param breakfastIncluded is boolean - indicates breakfast is chosen
 * calls to: None
 */
function getBreakfastCost(noOfNights, discountCode, numAdults, numKids, breakfastIncluded) {
    let breakfastCost;
    let adultBreakfastratePerDay = 6.96;
    let kidBreakfastratePerDay = 3.95;
    if (breakfastIncluded) {
        if (discountCode == "Senior") {
            breakfastCost = 0;
        } else {

            breakfastCost = (noOfNights * adultBreakfastratePerDay * numAdults) +
                (noOfNights * kidBreakfastratePerDay * numKids);
        }
    } else {
        breakfastCost = 0;
    }
    console.log(breakfastCost);
    return breakfastCost;
}

/*Function to calculate discount amount based on the discount code/type 
 * @param roomCostBeforeDiscount is a Number - calculated cost from getRoomCost function
 * @param discount Code is a string - code indicate the discount chosen 
 * @param breakfastInclude is boolean - set based on user selected checkbox  
 * calls to: None
 */
function getDiscount(roomCost, discountCode, breakfastIncluded) {
    let discountAmount = 0;
    switch (discountCode) {
        case "AAA":
            discountAmount = roomCost * 0.1;
        case "Senior":
            // Exceptional - Senior - free breakfast, if chosen
            discountAmount = roomCost * 0.1
            break;
        case "Military":
            discountAmount = roomCost * 0.2;
            break;
        default:
            break;
    }
    console.log(discountAmount);
    return discountAmount;
}


/* Function to calculate drop of date based on the pick up date and number of Days 
 * @param noOfDays (Number) - number of days for rental
 * @param pickUp date (date) - pick up date
 * @param roadAsst (Boolean) - Roadside assistance selection
 */
function getCheckoutDate(checkInDate, noOfNights) {
    let checkoutDateMilliSec = checkInDate.getTime();
    const milliSecPerDay = 1000 * 60 * 60 * 24;
    let noOfNightsMilliSec = (noOfNights + 1) * milliSecPerDay;
    checkoutDateMilliSec = checkoutDateMilliSec + noOfNightsMilliSec;
    checkoutDate = new Date(checkoutDateMilliSec);
    return checkoutDate;
}

/* This function is to validate non numeric character at the starting of the field and set error flag
 * populate error message field
 * @param numNights(Number) - user entered number of nights  
 * @param selectRoomTypeField(string) - room type
 * @param selectNoOfAdultsField(string) - no of adults
 * @param inputCheckInDateField(date) - check in date
 * @param errorMsgIdField (string) - hold error message pointer to p tag
 * @param canRoomHold (boolean) - hold the status of room based on the selected number of individuals
 */
function checkNumeric(numNights, selectRoomTypeField, selectNoOfAdultsField, inputCheckInDateField, errorMsgIdField, canRoomHold) {
    let errorMsg, isError = false;
    let currentDate = new Date();
    let selectedDate = new Date(inputCheckInDateField.value);
    // set Error flag based on number validation
    if ((selectRoomTypeField.selectedIndex == -1) || (selectRoomTypeField.selectedIndex == " ")) {
        errorMsg = "Select the Room type dropdown";
        isError = true;
    } else if (!inputCheckInDateField.value) {
        errorMsg = "Select date from Check-in date";
        isError = true;
    } else if (selectedDate.getTime() < currentDate.getTime()) {
        errorMsg = "Selected date is invalid: Pick future date from Check-in date";
        isError = true;
    } else if ((isNaN(numNights)) || (numNights <= 0) || (numNights > 28)) {
        errorMsg = "Select valid Number of Nights ( 1 thru 28)";
        isError = true;
    } else if (((selectNoOfAdultsField == -1) || (selectNoOfAdultsField.selectedIndex == " ")) &&
        ((selectNoOfAdultsField == -1) || (selectNoOfAdultsField.selectedIndex == " "))) {
        errorMsg = "Select Number of Adults dropdown";
        isError = true;
    } else if (!canRoomHold) {
        errorMsg = "Sorry! we do not have room for selected type";
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