
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#waitlist-form");
    const button = document.querySelector("#submit-button");
    const message = document.querySelector("#form-message");
    const successPanel = document.querySelector("#success-panel");
    const year = document.querySelector("#year");
    const joinAnother = document.querySelector("#join-another");
  
    if (year) {
      year.textContent = new Date().getFullYear();
    }
  
    // Reveal animations
    if ("IntersectionObserver" in window) {
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
    } else {
      document.querySelectorAll(".reveal").forEach((element) => {
        element.classList.add("is-visible");
      });
    }
  
    // Card animation
    const heroArt = document.querySelector(".hero-art");
  
    if (heroArt) {
      setInterval(() => {
        heroArt.classList.toggle("show-back");
      }, 4000);
    }
  
    // Check form and EmailJS
    if (!form || !button || !message || !successPanel) {
      console.error("Waitlist form elements are missing from index.html.");
      return;
    }
  
    if (!window.emailjs) {
      console.error("EmailJS library did not load.");
      message.textContent = "Email service unavailable. Please refresh and try again.";
      message.classList.add("error");
      return;
    }
  
    emailjs.init({
      publicKey: "OBEX2L9TP6ISvgjYg"
    });
  
    // Waitlist submission
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      message.textContent = "";
      message.className = "form-message";
  
      if (!form.reportValidity()) return;
  
      const fullName = document.querySelector("#fullName")?.value.trim();
      const email = document.querySelector("#email")?.value.trim();
      const phone = document.querySelector("#phone")?.value.trim();
      const consent = document.querySelector("#consent")?.checked;
  
      if (!fullName || !email || !phone) {
        message.textContent = "Please complete all required fields.";
        message.classList.add("error");
        return;
      }
  
      if (!consent) {
        message.textContent = "Please agree to receive launch updates before joining.";
        message.classList.add("error");
        return;
      }
  
      const label = button.querySelector(".button-label");
      button.disabled = true;
  
      if (label) label.textContent = "JOINING THE WAITLIST...";
  
      try {
        await emailjs.send(
          "service_68279gi",
          "template_fow8ko3",
          {
            to_email: "deestudio287@gmail.com",
            full_name: fullName,
            customer_email: email,
            phone_number: phone,
            consent: "Yes",
            signup_date: new Date().toLocaleString()
          }
        );
  
        form.hidden = true;
        successPanel.hidden = false;
      } catch (error) {
        console.error("EmailJS submission failed:", error);
  
        message.textContent =
          "We couldn't submit your details. Please try again.";
        message.classList.add("error");
      } finally {
        button.disabled = false;
        if (label) label.textContent = "RESERVE MY PLACE";
      }
    });
  
    // Join again
    if (joinAnother) {
      joinAnother.addEventListener("click", () => {
        successPanel.hidden = true;
        form.hidden = false;
        form.reset();
        message.textContent = "";
  
        document.querySelector("#fullName")?.focus();
      });
    }
  });
  