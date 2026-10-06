// ========================================
// 1. GET THE ELEMENTS FROM HTML
// ========================================

// Form
const form = document.getElementById("card-form");

// Cardholder name
const cardholderName = document.getElementById("cardholder-name");
const cardNameDisplay = document.getElementById("card-name-display");

// Card number
const cardNumber = document.getElementById("card-number");
const cardNumberDisplay = document.getElementById("card-number-display");

// Expiry month
const expiryMonth = document.getElementById("expiry-month");
const monthDisplay = document.getElementById("card-month-display");

// Expiry year
const expiryYear = document.getElementById("expiry-year");
const yearDisplay = document.getElementById("card-year-display");

// CVC
const cvc = document.getElementById("cvc");
const cvcDisplay = document.getElementById("cvc-display");

// Error messages
const nameError = document.getElementById("name-error");
const numberError = document.getElementById("number-error");
const expiryError = document.getElementById("expiry-error");
const cvcError = document.getElementById("cvc-error");

// Completed state
const completedState = document.getElementById("completed-state");
const continueButton = document.getElementById("continue-button");


// ========================================
// 2. UPDATE CARDHOLDER NAME
// ========================================

cardholderName.addEventListener("input", function () {

  if (cardholderName.value === "") {

    cardNameDisplay.textContent = "JANE APPLESEED";

  } else {

    cardNameDisplay.textContent = cardholderName.value;

  }

});


// ========================================
// 3. UPDATE CARD NUMBER
// ========================================

cardNumber.addEventListener("input", function () {

  // Remove anything that isn't a number
  cardNumber.value = cardNumber.value.replace(/\D/g, "");

  // Only allow 16 numbers
  cardNumber.value = cardNumber.value.substring(0, 16);

  // Add a space after every 4 numbers
  const formattedNumber =
    cardNumber.value
      .match(/.{1,4}/g)
      ?.join(" ") || "";

  // Show the number on the card
  cardNumberDisplay.textContent =
    formattedNumber || "0000 0000 0000 0000";

});


// ========================================
// 4. UPDATE EXPIRY MONTH
// ========================================

expiryMonth.addEventListener("input", function () {

  // Only allow numbers
  expiryMonth.value = expiryMonth.value.replace(/\D/g, "");

  // Only allow 2 numbers
  expiryMonth.value = expiryMonth.value.substring(0, 2);

  // Show month on card
  monthDisplay.textContent =
    expiryMonth.value || "00";

});


// ========================================
// 5. UPDATE EXPIRY YEAR
// ========================================

expiryYear.addEventListener("input", function () {

  // Only allow numbers
  expiryYear.value = expiryYear.value.replace(/\D/g, "");

  // Only allow 2 numbers
  expiryYear.value = expiryYear.value.substring(0, 2);

  // Show year on card
  yearDisplay.textContent =
    expiryYear.value || "00";

});


// ========================================
// 6. UPDATE CVC
// ========================================

cvc.addEventListener("input", function () {

  // Only allow numbers
  cvc.value = cvc.value.replace(/\D/g, "");

  // Only allow 3 numbers
  cvc.value = cvc.value.substring(0, 3);

  // Show CVC on card
  cvcDisplay.textContent =
    cvc.value || "000";

});


// ========================================
// 7. FORM VALIDATION
// ========================================

form.addEventListener("submit", function (event) {

  // Stop the page from refreshing
  event.preventDefault();

  // Assume the form is valid
  let isValid = true;


  // ----------------------------------------
  // Clear previous error messages
  // ----------------------------------------

  nameError.textContent = "";
  numberError.textContent = "";
  expiryError.textContent = "";
  cvcError.textContent = "";


  // ========================================
  // CHECK CARDHOLDER NAME
  // ========================================

  if (cardholderName.value.trim() === "") {

    nameError.textContent = "Can't be blank";

    isValid = false;

  }


  // ========================================
  // CHECK CARD NUMBER
  // ========================================

  const cleanCardNumber =
    cardNumber.value.replace(/\s/g, "");

  if (cleanCardNumber === "") {

    numberError.textContent = "Can't be blank";

    isValid = false;

  } else if (!/^\d{16}$/.test(cleanCardNumber)) {

    numberError.textContent = "Wrong format";

    isValid = false;

  }


  // ========================================
  // CHECK EXPIRY DATE
  // ========================================

  if (
    expiryMonth.value.trim() === "" ||
    expiryYear.value.trim() === ""
  ) {

    expiryError.textContent = "Can't be blank";

    isValid = false;

  } else {

    const month = Number(expiryMonth.value);

    if (
      !/^\d{2}$/.test(expiryMonth.value) ||
      !/^\d{2}$/.test(expiryYear.value) ||
      month < 1 ||
      month > 12
    ) {

      expiryError.textContent = "Wrong format";

      isValid = false;

    }

  }


  // ========================================
  // CHECK CVC
  // ========================================

  if (cvc.value.trim() === "") {

    cvcError.textContent = "Can't be blank";

    isValid = false;

  } else if (!/^\d{3}$/.test(cvc.value)) {

    cvcError.textContent = "Wrong format";

    isValid = false;

  }


  // ========================================
  // IF EVERYTHING IS VALID
  // ========================================

  if (isValid) {

    // Hide the form
    form.style.display = "none";

    // Show the thank-you message
    completedState.style.display = "block";

  }

});


// ========================================
// 8. CONTINUE BUTTON
// ========================================

continueButton.addEventListener("click", function () {

  // Hide the thank-you message
  completedState.style.display = "none";

  // Show the form again
  form.style.display = "block";

});