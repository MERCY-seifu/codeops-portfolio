const PHONE_REGEX = /^(09\d{8}|\+2519\d{8})$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = "signups";

const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password");
const errorArea = document.querySelector("#error-area");
const signupCountEl = document.querySelector("#signup-count");


function readSignups() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveSignup(entry) {
  const signups = readSignups();
  signups.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(signups));
  return signups.length;
}



function showError(message) {
  errorArea.textContent = message;
}

function clearError() {
  errorArea.textContent = "";
}

function updateSignupCount() {
  const count = readSignups().length;
  signupCountEl.textContent = `${count} ${count === 1 ? "person has" : "people have"} signed up`;
}

function validate(name, email, phone, password) {
  if (name.length < 2) {
    return "Name must be at least two characters long.";
  }
  if (!EMAIL_REGEX.test(email)) {
    return "Enter a valid email address (e.g. name@example.com).";
  }
  if (!PHONE_REGEX.test(phone)) {
    return "Enter a valid Ethiopian phone number (e.g. 0912345678 or +251912345678).";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  return null; 
}



form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const password = passwordInput.value;

  const errorMessage = validate(name, email, phone, password);

  if (errorMessage) {
    showError(errorMessage);
    return;
  }

  clearError();
  saveSignup({ name: name, email: email, phone: phone });
  form.reset();
  updateSignupCount();
});


document.addEventListener("DOMContentLoaded", updateSignupCount);