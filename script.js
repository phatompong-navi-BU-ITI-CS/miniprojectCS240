
const form = document.querySelector("#registration-form");


const statusMessage = document.querySelector("#form-status");


const fields = [...form.querySelectorAll("input, select, textarea")];


const messages = {
  firstName: "Please enter your first name.(Alphabet only)",
  lastName: "Please enter your last name.(Alphabet only)",
  email: "Please enter a valid email address.",
  phone: "Phone number must contain exactly 10 digits.",
  address: "Please enter your address.",
  country: "Please choose your country.",
  zip: "ZIP code must contain exactly 5 digits.",
};

function getErrorElement(field) {
  return document.querySelector(`#${field.id}-error`);
}


function showError() {
  const popup = document.getElementById('error-popup');
  popup.classList.remove('hidden');

  setTimeout(() => {
    popup.classList.add('hidden');
  }, 4000);
}


function validateField(field) {

  if (field.name === "language") {
    const languageInputs = form.querySelectorAll('input[name="language"]');
    const hasLanguage = [...languageInputs].some((input) => input.checked);


    document.querySelector("#language-error").textContent = hasLanguage
      ? ""
      : "Choose at least one language.";
    return hasLanguage;
  }


  if (field.name === "gender") {
    const genderInputs = form.querySelectorAll('input[name="gender"]');
    const hasGender = [...genderInputs].some((input) => input.checked);


    document.querySelector("#gender-error").textContent = hasGender
      ? ""
      : "Please choose an option.";
    return hasGender;
  }


  showError(field);
  return field.validity.valid;
}


fields.forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    if (field.getAttribute("aria-invalid") === "true") validateField(field);
  });
});


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isValid = fields.every(validateField);

  if (!isValid) {
    statusMessage.textContent =
      "Please fix the highlighted fields and try again.";
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  statusMessage.textContent =
    "Registration complete! This demo does not send data to a server.";


  form.reset();

  fields.forEach((field) => {
    field.removeAttribute("aria-invalid");
    field.closest(".field")?.classList.remove("has-error");
  });
});

function showJob(jobId) {
    // Hide the job descriptions and form
    document.getElementById("jobDetails").classList.remove("hidden");
    document.getElementById("resForm").classList.add("hidden");

    // Hide every job description
    document.querySelectorAll(".job-description").forEach(job => {
        job.classList.add("hidden");
    });

    // Show the selected job
    document.getElementById(jobId).classList.remove("hidden");

    // Scroll to the description
    document.getElementById("jobDetails").scrollIntoView({
        behavior: "smooth"
    });
}

function showApplication(jobName) {
    // Save the selected job in the shared form
    document.getElementById("selected-job").value = jobName;

    // Reveal the form
    document.getElementById("resForm").classList.remove("hidden");

    // Scroll to the form
    document.getElementById("resForm").scrollIntoView({
        behavior: "smooth"
    });
}