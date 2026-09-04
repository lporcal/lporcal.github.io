/**
 * Cookie Consent Banner + Google Consent Mode v2
 * Portfolio Lucas Porcal - lporcal.github.io
 *
 * INSTALACIÓN:
 * 1. Guardar este archivo como /js/cookie-consent.js en tu proyecto
 * 2. En el <head> de CADA página HTML, ANTES del script de gtag.js, agregar:
 *
 *    <script src="/js/cookie-consent.js"></script>
 *
 * 3. Reemplazar tu script actual de GA4 por el bloque que está más abajo
 *    en la sección "GA4 CON CONSENT MODE" (o dejar que este archivo lo inyecte).
 */

(function () {
  const GA_ID = "G-H6DX5RCE3M";
  const STORAGE_KEY = "lp_cookie_consent"; // "granted" | "denied"

  // ---------- 1. CONSENT MODE V2: estado por defecto (antes de cualquier decisión) ----------
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });

  // ---------- 2. Cargar GA4 (Consent Mode permite cargarlo siempre; ----------
  //              GA4 respeta las banderas y usa modo cookieless si no hay consentimiento)
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gaScript);

  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });

  // ---------- 3. Aplicar consentimiento guardado previamente ----------
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "granted") {
    updateConsent("granted");
  } else if (saved === "denied") {
    updateConsent("denied");
  } else {
    // No hay decisión previa -> mostrar banner cuando cargue el DOM
    document.addEventListener("DOMContentLoaded", showBanner);
  }

  function updateConsent(state) {
    gtag("consent", "update", {
      analytics_storage: state,
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
    });
  }

  // ---------- 4. Banner ----------
  function showBanner() {
    const style = document.createElement("style");
    style.textContent = `
      #lp-cookie-banner {
        position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;
        background: #31555f; color: #fff;
        padding: 1rem 1.25rem;
        display: flex; flex-wrap: wrap; gap: 1rem;
        align-items: center; justify-content: space-between;
        font-family: inherit; font-size: 0.9rem;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
      }
      #lp-cookie-banner p { margin: 0; flex: 1 1 300px; line-height: 1.4; }
      #lp-cookie-banner a { color: #d4c547; text-decoration: underline; }
      #lp-cookie-banner .lp-cookie-actions { display: flex; gap: 0.6rem; flex-shrink: 0; }
      #lp-cookie-banner button {
        border: none; border-radius: 6px; padding: 0.5rem 1.1rem;
        font-weight: 600; cursor: pointer; transition: transform .15s ease;
      }
      #lp-cookie-banner button:hover { transform: translateY(-2px); }
      #lp-cookie-accept { background: #d4c547; color: #31555f; }
      #lp-cookie-reject { background: transparent; color: #fff; border: 1px solid #fff !important; }
      @media (max-width: 480px) {
        #lp-cookie-banner { flex-direction: column; align-items: stretch; text-align: center; }
        #lp-cookie-banner .lp-cookie-actions { justify-content: center; }
      }
    `;
    document.head.appendChild(style);

    const banner = document.createElement("div");
    banner.id = "lp-cookie-banner";
    banner.innerHTML = `
      <p>Este sitio usa cookies de Google Analytics para entender cómo se usa el portfolio.
      Podés aceptar o rechazar. Más info en la <a href="/privacidad.html">Política de Privacidad</a>.</p>
      <div class="lp-cookie-actions">
        <button id="lp-cookie-reject">Rechazar</button>
        <button id="lp-cookie-accept">Aceptar</button>
      </div>
    `;
    document.body.appendChild(banner);

    document.getElementById("lp-cookie-accept").addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEY, "granted");
      updateConsent("granted");
      banner.remove();
    });

    document.getElementById("lp-cookie-reject").addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEY, "denied");
      updateConsent("denied");
      banner.remove();
    });
  }
})();
