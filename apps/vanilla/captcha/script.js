// script.js

let currentCaptcha = "";

function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // évite 0/O et 1/I
  const length = 5;
  let code = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    code += chars[index];
  }

  currentCaptcha = code;

  const captchaTextEl = document.getElementById("captcha-text");
  if (!captchaTextEl) {
    console.error("Élément #captcha-text introuvable");
    return;
  }

  captchaTextEl.textContent = code;

  // petite rotation aléatoire pour le style
  const randomAngle = (Math.random() * 10 - 5).toFixed(1); // entre -5 et 5
  captchaTextEl.style.transform = `rotate(${randomAngle}deg)`;
}

function showMessage(text, type) {
  const msg = document.getElementById("captcha-message");
  msg.textContent = text;
  msg.className = "message"; // reset
  if (type) {
    msg.classList.add(type);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("my-form");
  const refreshBtn = document.getElementById("refresh-captcha");
  const captchaInput = document.getElementById("captcha-input");

  // Génère un premier captcha au chargement
  generateCaptcha();

  // Bouton pour rafraîchir le captcha
  refreshBtn.addEventListener("click", () => {
    generateCaptcha();
    captchaInput.value = "";
    showMessage("");
  });

  // Validation du formulaire
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // pour la démo

    const userValue = captchaInput.value.trim();

    if (userValue === "") {
      showMessage("Veuillez recopier le captcha.", "error");
      return;
    }

    if (userValue.toUpperCase() !== currentCaptcha.toUpperCase()) {
      showMessage("Captcha incorrect, réessayez.", "error");
      generateCaptcha();
      captchaInput.value = "";
      captchaInput.focus();
      return;
    }

    showMessage("Captcha validé !", "success");

    // Quand tu voudras l'envoi réel :
    // form.submit();
  });
});
