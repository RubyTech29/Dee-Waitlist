// const form = document.querySelector("#waitlist-form");
// const button = document.querySelector("#submit-button");
// const message = document.querySelector("#form-message");
// const successPanel = document.querySelector("#success-panel");
// const year = document.querySelector("#year");

// year.textContent = new Date().getFullYear();

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add("is-visible");
//       observer.unobserve(entry.target);
//     }
//   });
// }, { threshold: 0.12 });

// document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

// form.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   message.textContent = "";
//   message.className = "form-message";

//   if (!form.reportValidity()) return;

//   const payload = {
//     fullName: document.querySelector("#fullName").value.trim(),
//     email: document.querySelector("#email").value.trim(),
//     phone: document.querySelector("#phone").value.trim(),
//     consent: document.querySelector("#consent").checked
//   };

//   if (!payload.consent) {
//     message.textContent = "Please agree to receive launch updates before joining.";
//     message.classList.add("error");
//     return;
//   }

//   const label = button.querySelector(".button-label");
//   button.disabled = true;
//   label.textContent = "SAVING YOUR PLACE...";

//   try {
//     const response = await fetch("/api/waitlist", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     });
//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error(result.error || "We couldn't complete your registration. Please try again.");
//     }

//     form.hidden = true;
//     successPanel.hidden = false;
//   } catch (error) {
//     message.textContent = error.message || "Something went wrong. Please try again.";
//     message.classList.add("error");
//   } finally {
//     button.disabled = false;
//     label.textContent = "RESERVE MY PLACE";
//   }
// });





const form = document.querySelector("#waitlist-form");
const button = document.querySelector("#submit-button");
const message = document.querySelector("#form-message");
const successPanel = document.querySelector("#success-panel");
const year = document.querySelector("#year");

emailjs.init({
  publicKey: "RyihkwNU-b3OfX_X3"
});
year.textContent = new Date().getFullYear();

// Reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

// Waitlist form
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  message.textContent = "";
  message.className = "form-message";

  if (!form.reportValidity()) return;

  const fullName = document.querySelector("#fullName").value.trim();
  const email = document.querySelector("#email").value.trim();
  const phone = document.querySelector("#phone").value.trim();
  const consent = document.querySelector("#consent").checked;

  if (!consent) {
    message.textContent = "Please agree to receive launch updates before joining.";
    message.classList.add("error");
    return;
  }

  const label = button.querySelector(".button-label");

  button.disabled = true;
  label.textContent = "JOINING THE WAITLIST...";

  try {
    await emailjs.send(
      "service_zz49eyg",
      "template_6nslp3p",
      {
        to_email: "taleatemmanuel@gmail.com",
        full_name: fullName,
        customer_email: email,
        phone_number: phone,
        consent: consent ? "Yes" : "No",
        signup_date: new Date().toLocaleString()
      }
    );

    form.hidden = true;
    successPanel.hidden = false;
  } catch (error) {
    console.error("Email sending failed:", error);

    message.textContent =
      "We couldn't submit your details right now. Please try again.";
    message.classList.add("error");
  } finally {
    button.disabled = false;
    label.textContent = "RESERVE MY PLACE";
  }
});

const heroArt = document.querySelector(".hero-art");

if (heroArt) {
  setInterval(() => {
    heroArt.classList.toggle("show-back");
  }, 4000);
}
document.querySelector("#join-another").addEventListener("click", () => {
  successPanel.hidden = true;
  form.hidden = false;
  form.reset();
  message.textContent = "";
  document.querySelector("#fullName").focus();
});