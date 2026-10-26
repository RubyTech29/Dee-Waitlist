const form = document.querySelector("#waitlist-form");
const button = document.querySelector("#submit-button");
const message = document.querySelector("#form-message");
const successPanel = document.querySelector("#success-panel");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  message.className = "form-message";

  if (!form.reportValidity()) return;

  const payload = {
    fullName: document.querySelector("#fullName").value.trim(),
    email: document.querySelector("#email").value.trim(),
    phone: document.querySelector("#phone").value.trim(),
    consent: document.querySelector("#consent").checked
  };

  if (!payload.consent) {
    message.textContent = "Please agree to receive launch updates before joining.";
    message.classList.add("error");
    return;
  }

  const label = button.querySelector(".button-label");
  button.disabled = true;
  label.textContent = "SAVING YOUR PLACE...";

  try {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "We couldn't complete your registration. Please try again.");
    }

    form.hidden = true;
    successPanel.hidden = false;
  } catch (error) {
    message.textContent = error.message || "Something went wrong. Please try again.";
    message.classList.add("error");
  } finally {
    button.disabled = false;
    label.textContent = "RESERVE MY PLACE";
  }
});

document.querySelector("#join-another").addEventListener("click", () => {
  successPanel.hidden = true;
  form.hidden = false;
  form.reset();
  message.textContent = "";
  document.querySelector("#fullName").focus();
});