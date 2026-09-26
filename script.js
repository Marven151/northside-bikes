(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Booking form validation (client-side only, no backend)
  var form = document.getElementById("bookingForm");
  if (!form) return;

  var successBox = document.getElementById("formSuccess");

  var fields = [
    { id: "name", errId: "err-name", message: "Enter your name." },
    { id: "email", errId: "err-email", message: "Enter a valid email address." },
    { id: "bikeType", errId: "err-bikeType", message: "Choose a bike type." },
    { id: "service", errId: "err-service", message: "Choose a service." },
    { id: "date", errId: "err-date", message: "Pick a preferred date." }
  ];

  function validateField(field) {
    var el = document.getElementById(field.id);
    var errEl = document.getElementById(field.errId);
    el.setAttribute("data-touched", "true");

    var valid = el.checkValidity();

    if (field.id === "date" && el.value) {
      var chosen = new Date(el.value + "T00:00:00");
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen < today) {
        valid = false;
      }
    }

    if (!valid) {
      errEl.textContent = field.message;
      el.setAttribute("aria-invalid", "true");
    } else {
      errEl.textContent = "";
      el.removeAttribute("aria-invalid");
    }
    return valid;
  }

  fields.forEach(function (field) {
    var el = document.getElementById(field.id);
    el.addEventListener("blur", function () { validateField(field); });
    el.addEventListener("input", function () {
      if (el.getAttribute("data-touched") === "true") validateField(field);
    });
    el.addEventListener("change", function () {
      if (el.getAttribute("data-touched") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var allValid = true;
    fields.forEach(function (field) {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      if (successBox) successBox.hidden = true;
      return;
    }

    form.reset();
    fields.forEach(function (field) {
      document.getElementById(field.id).removeAttribute("data-touched");
      document.getElementById(field.errId).textContent = "";
    });

    if (successBox) {
      successBox.hidden = false;
      successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
})();
