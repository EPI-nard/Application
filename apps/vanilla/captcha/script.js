document.addEventListener("DOMContentLoaded", () => {

  /* ─────────────────────────────── */
  /* 🔥 BOUTON QUI TOMBE (PHYSIQUE) */
  /* ─────────────────────────────── */

  let clickedOnce = false;
  let hasLanded = false;
  const trollBtn = document.getElementById("random-captcha-btn");

  function startFall() {
    const rect = trollBtn.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const marginBottom = 20;

    // distance maximale avant que le bas du bouton touche (viewport - margin)
    const maxDistance = (viewportH - marginBottom) - rect.bottom;

    if (maxDistance <= 0) {
      // déjà en bas / pas de place
      hasLanded = true;
      return;
    }

    let y = 0;          // déplacement vertical courant
    let v = 0;          // vitesse verticale (px/s)
    const g = 3000;     // gravité (px/s²) – ajuste pour plus/moins rapide
    let lastTime = null;

    function step(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const dt = (timestamp - lastTime) / 1000; // en secondes
      lastTime = timestamp;

      // intégration de la vitesse + position
      v += g * dt;
      y += v * dt;

      // collision avec le "sol"
      if (y >= maxDistance) {
        y = maxDistance;
        v = -v * 0.45; // rebond amorti

        // si la vitesse est très faible → on considère que c'est posé
        if (Math.abs(v) < 80) {
          trollBtn.style.transform = `translateY(${y}px)`;
          hasLanded = true;
          return;
        }
      }

      trollBtn.style.transform = `translateY(${y}px)`;
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  trollBtn.addEventListener("click", () => {
    // 1er clic → chute
    if (!clickedOnce) {
      clickedOnce = true;
      startFall();
      return;
    }

    // si le bouton n'a pas fini de tomber → on ignore
    if (!hasLanded) {
      return;
    }

    // 2e clic (une fois posé) → affiche le captcha
    showRandomCaptcha();
  });

  /* ─────────────────────────────── */
  /* 🔹 CAPTCHA 1 : TEXTE ALÉATOIRE */
  /* ─────────────────────────────── */

  let captcha1 = "";

  function generateCaptcha1() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    captcha1 = code;

    const el = document.getElementById("captcha-text-1");
    el.textContent = code;

    const angle = (Math.random() * 10 - 5).toFixed(1);
    el.style.transform = `rotate(${angle}deg)`;
  }

  document.getElementById("refresh-1").addEventListener("click", generateCaptcha1);

  document.getElementById("form-text").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("input-1").value.trim().toUpperCase();
    const msg = document.getElementById("msg-1");

    if (input === captcha1) {
      msg.style.color = "green";
      msg.textContent = "Correct ✔️";
    } else {
      msg.style.color = "red";
      msg.textContent = "Incorrect ❌";
      generateCaptcha1();
    }
  });

  /* ─────────────────────────────── */
  /* 🔹 CAPTCHA 2 : LOGIQUE         */
  /* ─────────────────────────────── */

  const questions = [
    { q: "Combien font 3 + 5 ?", a: "8" },
    { q: "Combien font 10 - 4 ?", a: "6" },
    { q: "Écris 'chat' :", a: "chat" },
    { q: "Première lettre du mot 'voiture' ?", a: "v" }
  ];

  let logicAnswer = "";

  function generateLogic() {
    const item = questions[Math.floor(Math.random() * questions.length)];
    document.getElementById("logic-question").textContent = item.q;
    logicAnswer = item.a.toLowerCase();
  }

  document.getElementById("form-logic").addEventListener("submit", (e) => {
    e.preventDefault();
    const value = document.getElementById("logic-answer").value.trim().toLowerCase();
    const msg = document.getElementById("msg-logic");

    if (value === logicAnswer) {
      msg.style.color = "green";
      msg.textContent = "Correct ✔️";
    } else {
      msg.style.color = "red";
      msg.textContent = "Incorrect ❌";
      generateLogic();
    }
  });

  /* ─────────────────────────────── */
  /* 🔹 CAPTCHA 3 : MAP             */
  /* ─────────────────────────────── */

  const countries = [
    { key: "france", label: "France" },
    { key: "espagne", label: "Espagne" },
    { key: "italie", label: "Italie" },
    { key: "allemagne", label: "Allemagne" }
  ];

  let correctCountry = "";
  let mapValid = false;

  function generateMap() {
    const item = countries[Math.floor(Math.random() * countries.length)];
    correctCountry = item.key;
    mapValid = false;

    document.getElementById("map-instruction").textContent =
      "Cliquez sur : " + item.label;

    document.querySelectorAll(".country").forEach(b =>
      b.classList.remove("correct", "wrong")
    );
  }

  document.querySelectorAll(".country").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".country").forEach(b =>
        b.classList.remove("correct", "wrong")
      );

      const msg = document.getElementById("msg-map");

      if (btn.dataset.country === correctCountry) {
        btn.classList.add("correct");
        mapValid = true;
        msg.style.color = "green";
        msg.textContent = "Correct ✔️";
      } else {
        btn.classList.add("wrong");
        mapValid = false;
        msg.style.color = "red";
        msg.textContent = "Incorrect ❌";
        generateMap();
      }
    });
  });

  document.getElementById("form-map").addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("msg-map");

    if (mapValid) {
      msg.style.color = "green";
      msg.textContent = "Correct ✔️";
    } else {
      msg.style.color = "red";
      msg.textContent = "Veuillez cliquer sur le bon pays ❌";
    }
  });

  /* ─────────────────────────────── */
  /* 🔹 MODALE + CAPTCHA ALÉATOIRE  */
  /* ─────────────────────────────── */

  const sections = [
    "captcha-text-section",
    "captcha-logic-section",
    "captcha-map-section"
  ];

  function hideAllSections() {
    sections.forEach(id => {
      document.getElementById(id).classList.add("hidden");
    });
  }

  function showRandomCaptcha() {
    hideAllSections();

    const randomId = sections[Math.floor(Math.random() * sections.length)];
    document.getElementById(randomId).classList.remove("hidden");

    if (randomId === "captcha-text-section") {
      document.getElementById("input-1").value = "";
      document.getElementById("msg-1").textContent = "";
      generateCaptcha1();
    }

    if (randomId === "captcha-logic-section") {
      document.getElementById("logic-answer").value = "";
      document.getElementById("msg-logic").textContent = "";
      generateLogic();
    }

    if (randomId === "captcha-map-section") {
      document.getElementById("msg-map").textContent = "";
      generateMap();
    }

    document.getElementById("captcha-modal").classList.remove("hidden");
  }

  document.getElementById("close-modal")
    .addEventListener("click", () => {
      document.getElementById("captcha-modal").classList.add("hidden");
    });

  /* Préparation des captchas (contenu prêt, mais pas affiché) */
  generateCaptcha1();
  generateLogic();
  generateMap();

});
