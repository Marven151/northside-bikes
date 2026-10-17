(function () {
  "use strict";
  var els = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach(function (e) { io.observe(e); });
  } else {
    els.forEach(function (e) { e.classList.add("is-in"); });
  }

  // Price list drives the job ticket
  var jobs = document.querySelectorAll(".job");
  var tkWork = document.getElementById("tk-work");
  var tkPrice = document.getElementById("tk-price");
  var tkReady = document.getElementById("tk-ready");
  jobs.forEach(function (job) {
    job.addEventListener("click", function () {
      jobs.forEach(function (j) { j.setAttribute("aria-pressed", j === job ? "true" : "false"); });
      tkWork.textContent = job.dataset.n;
      tkPrice.textContent = job.dataset.p;
      tkReady.textContent = job.dataset.t;
    });
  });

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
      if (chosen < today) valid = false;
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
    ["input", "change"].forEach(function (type) {
      el.addEventListener(type, function () {
        if (el.getAttribute("data-touched") === "true") validateField(field);
      });
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var allValid = true;
    fields.forEach(function (field) { if (!validateField(field)) allValid = false; });
    if (!allValid) {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      successBox.hidden = true;
      return;
    }
    form.reset();
    fields.forEach(function (field) {
      document.getElementById(field.id).removeAttribute("data-touched");
      document.getElementById(field.errId).textContent = "";
    });
    successBox.hidden = false;
    successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
})();
