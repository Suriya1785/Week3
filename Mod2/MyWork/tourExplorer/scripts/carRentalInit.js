/*Description: window onload Init script to assign function on button for Car Rental calculator
 *Author: HartCode Programmer
 *Date:08/02/2019
 */

/* This function is called during window onload of the car(t) Rental calculator page and 
 * assign function to the button
 * No parameters
 * Calls: function checkNumeric(), getDropOfDate(), getAdditionalOptionRate(), getSurcharge(), getTotalDue(), resetForm()
 */
"Use Strict";
window.onload = function() {
    const inputCarTypeField = document.getElementById("inputCarType");
    let inputPickUpDateField = document.getElementById("inputPickUpDate");
    let inputNoOfDaysField = document.getElementById("inputNoOfDays");
    let inputCheckboxElecTollField = document.getElementById("inputCheckboxElecToll");
    let inputCheckboxGpsField = document.getElementById("inputCheckboxGps");
    let inputCheckboxRoadAsstField = document.getElementById("inputCheckboxRoadAsst");
    let inputRadioboxNoField = document.getElementById("inputRadioboxNo");
    let inputRadioboxYesField = document.getElementById("inputRadioboxYes");
    let errorMsgIdField = document.getElementById("errorMsgId");
    let totalDueField = document.getElementById("totalDue");
    let carRentalAmountField = document.getElementById("carRentalAmount");
    let optionsRateField = document.getElementById("optionRate");
    let surchargeAmountField = document.getElementById("surchargeAmount");
    let dropOfDateField = document.getElementById("dropOfDate");
    const estimateTotalCostBtnField = document.getElementById("estimateTotalCostBtn");
    const resetBtnField = document.getElementById("resetBtn");
    resetBtnField.onclick = resetForm;

    estimateTotalCostBtnField.onclick = function() {
        let validateUserInput = false;
        // Assign/convert read string for calculation
        let noOfDays = parseInt(inputNoOfDaysField.value);

        let inputCheckboxElecToll = inputCheckboxElecTollField.checked;
        let inputCheckboxGps = inputCheckboxGpsField.checked;
        let inputCheckboxRoadAsst = inputCheckboxRoadAsstField.checked;
        let inputRadioboxNo = inputRadioboxNoField.checked;
        let inputRadioboxYes = inputRadioboxYesField.checked;
        errorMsgId = errorMsgIdField.value;
        let inputPickUpDate = new Date(inputPickUpDateField.value);
        // validate User input
        validateUserInput = checkNumeric(noOfDays, inputCarTypeField, inputPickUpDateField, errorMsgIdField);
        if (!validateUserInput) {
            carRentalAmountField.innerHTML = " ";
            optionsRateField.innerHTML = " ";
            surchargeAmountField.innerHTML = " ";
            totalDueField.innerHTML = " ";
            dropOfDateField.innerHTML = " ";
        } else {
            let baseCarRental = getBaseCarRental(inputCarTypeField);
            let dropOfDate = getDropOfDate(inputPickUpDate, noOfDays);
            let totalBaseCarRental = baseCarRental * noOfDays;
            let additionalOptionRate = getAdditionalOptionRate(inputCheckboxElecToll, inputCheckboxGps, inputCheckboxRoadAsst, noOfDays);
            let surcharge = getSurcharge(inputRadioboxYes, totalBaseCarRental);
            let totalDue = getTotalDue(additionalOptionRate, surcharge, totalBaseCarRental);

            // Publish the result to document
            totalDueField.innerHTML = "Total due: $ " + totalDue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            carRentalAmountField.innerHTML = "Car rental: $ " + totalBaseCarRental.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            if (inputRadioboxYes) {
                surchargeAmountField.innerHTML = "Under 25 Surcharge: $ " + surcharge.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            } else {
                surchargeAmountField.innerHTML = " ";
            }
            optionsRateField.innerHTML = "Options: $ " + additionalOptionRate.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            dropOfDateField.innerHTML = "Drop Of Date: " + dropOfDate.toDateString();
            // success message
            if (isNaN(totalDue)) {
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
        carRentalAmountField.innerHTML = " ";
        optionsRateField.innerHTML = " ";
        surchargeAmountField.innerHTML = " ";
        totalDueField.innerHTML = " ";
        dropOfDateField.innerHTML = " ";
        errorMsgIdField.innerHTML = " ";
    }
}

/*Function to calculate the base car rental based on the car type chosen
 * @param carType (dropdown) - selected car type
 */

function getBaseCarRental(carTypeDropdown) {
    let carRental = 0;
    let carType = carTypeDropdown.options[carTypeDropdown.selectedIndex].value;
    switch (carType) {
        case "Economy":
            carRental = 29.99;
            break;
        case "Compact":
            carRental = 39.99;
            break;
        case "Intermediate":
            carRental = 49.99;
            break;
        case "FullSize":
            carRental = 59.99;
            break;
        default:
            break;
    }
    return carRental;
}

/* Function to calculate drop of date based on the pick up date and number of Days 
 * @param noOfDays (integer) - number of days for rental
 * @param pickUp date (date) - pick up date
 * @param roadAsst (Boolean) - Roadside assistance selection
 */

function getDropOfDate(pickUpDate, noOfDays) {
    let pickUpDateMilliSec = pickUpDate.getTime();
    const milliSecPerDay = 1000 * 60 * 60 * 24;
    let noOfDaysMilliSec = noOfDays * milliSecPerDay;
    dropOfDateMilliSec = pickUpDateMilliSec + noOfDaysMilliSec;
    dropOfDate = new Date(dropOfDateMilliSec);
    return dropOfDate;
}

/* Function to calculate rate for the option chosen - gps, electronic toll and road assistance
 * @param elecToll (Boolean) - electronicl toll gate selection
 * @param gps (Boolean) - Gps selection
 * @param roadAsst (Boolean) - Roadside assistance selection
 */
function getAdditionalOptionRate(elecToll, gps, roadAsst, noOfDays) {
    let optionRate = 0;
    // Add price for Toppings, if chosen
    if (elecToll) {
        optionRate += (3.95 * noOfDays);
    }
    if (gps) {
        optionRate += (2.95 * noOfDays);
    }
    if (roadAsst) {
        optionRate += (2.95 * noOfDays);
    }
    console.log("optionRate :" + optionRate);
    return optionRate;
}


/* Function to calculate surcharge based on the age of drive chosen 
 * @param drvUnder25Yes (Boolean) - driver age is under 25  
 * @param totalBaseCarRental (number) - calculated base rental for number of days
 * @param roadAsst (Boolean) - Roadside assistance selection
 */
function getSurcharge(drvUnder25Yes, totalBaseCarRental) {
    let surcharge = 0;
    if (drvUnder25Yes) {
        surcharge = totalBaseCarRental * 0.3;
    }
    console.log("Surcharge : " + surcharge);
    return surcharge;
}

/* Function to calculate surcharge based on the age of drive chosen 
 * @param optionRate (number) - total rate for chosen option  
 * @param surcharge (number) - surcharge amount 
 * @param totalBaseCarRental (number) - total base rental cost for given number of days
 */
function getTotalDue(optionRate, surcharge, totalBaseCarRental) {
    let totalDue = 0;
    totalDue = optionRate + surcharge + totalBaseCarRental;
    console.log("totalDue : " + totalDue);
    return totalDue;
}

/* This function is to validate non numeric character at the starting of the field and set error flag
 * populate error message field
 * @param (number) - user entered number of days
 * @param (string) - car/t type
 * @param (date)   - cart pick up date
 * @param (string) - Error message field to build appropriate error message
 */
function checkNumeric(numOfdays, inputCarTypeField, inputPickUpDateField, errorMsgIdField) {
    let errorMsg, isError = false;
    let currentDate = new Date();
    let selectedDate = new Date(inputPickUpDateField.value);

    // set Error flag based on number validation
    if (inputCarTypeField.selectedIndex <= 0) {
        errorMsg = "Select the car type option";
        isError = true;
    } else if (!inputPickUpDateField.value) {
        errorMsg = "Select the date from Pickup date";
        isError = true;
    } else if (selectedDate.getTime() < currentDate.getTime()) {
        errorMsg = "Selected date is invalid: Pick future date/time from Pickup date";
        isError = true;
    } else if ((isNaN(numOfdays) || (numOfdays <= 0))) {
        errorMsg = "Enter valid number in 'Number Of days'";
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