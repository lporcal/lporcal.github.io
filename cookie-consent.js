/**
 * Cookie Consent Banner + Google Consent Mode v2
 * Portfolio Lucas Porcal - lporcal.github.io
 *
 * INSTALACIÓN:
 * 1. Guardar este archivo como /js/cookie-consent.js
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
  // Posición: "center" (ventana centrada con fondo atenuado) o "bottom" (barra inferior)
  const BANNER_POSITION = "center";

  function showBanner() {
    const style = document.createElement("style");
    style.textContent = `
      #lp-cookie-overlay {
        position: fixed; inset: 0; z-index: 9999;
        display: flex; align-items: ${BANNER_POSITION === "center" ? "center" : "flex-end"};
        justify-content: center;
        background: ${BANNER_POSITION === "center" ? "rgba(20, 35, 40, 0.55)" : "transparent"};
        padding: 1rem;
        ${BANNER_POSITION === "center" ? "" : "pointer-events: none;"}
      }
      #lp-cookie-banner {
        pointer-events: auto;
        background: #31555f; color: #fff;
        width: 100%; max-width: 520px;
        border-radius: 14px;
        border-top: 5px solid #d4c547;
        padding: 1.75rem 1.75rem 1.5rem;
        font-family: inherit;
        box-shadow: 0 12px 40px rgba(0,0,0,0.35);
        text-align: center;
        animation: lpCookieIn .3s ease-out;
      }
      #lp-cookie-banner h2 {
        margin: 0 0 0.75rem; font-size: 1.3rem; color: #d4c547;
      }
      #lp-cookie-banner p {
        margin: 0 0 1.25rem; font-size: 1rem; line-height: 1.5;
      }
      #lp-cookie-banner a { color: #d4c547; text-decoration: underline; }
      #lp-cookie-banner .lp-cookie-actions {
        display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;
      }
      #lp-cookie-banner button {
        flex: 1 1 140px;
        border-radius: 8px; padding: 0.75rem 1.25rem;
        font-size: 1rem; font-weight: 600; cursor: pointer;
        transition: transform .15s ease;
      }
      #lp-cookie-banner button:hover { transform: translateY(-2px); }
      #lp-cookie-accept { background: #d4c547; color: #31555f; border: 2px solid #d4c547; }
      #lp-cookie-reject { background: transparent; color: #fff; border: 2px solid #fff; }
      @keyframes lpCookieIn {
        from { opacity: 0; transform: translateY(12px) scale(.98); }
        to   { opacity: 1; transform: none; }
      }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement("div");
    overlay.id = "lp-cookie-overlay";
    overlay.innerHTML = `
      <div id="lp-cookie-banner" role="dialog" aria-modal="true" aria-labelledby="lp-cookie-title">
        <h2 id="lp-cookie-title">Tu privacidad</h2>
        <p>Este sitio usa cookies de Google Analytics para entender desde dónde y cómo se visita el portfolio.
        Podés aceptar o rechazar. Más info en la <a href="/privacidad.html">Política de Privacidad</a>.</p>
        <div class="lp-cookie-actions">
          <button id="lp-cookie-reject">Rechazar</button>
          <button id="lp-cookie-accept">Aceptar</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById("lp-cookie-accept").addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEY, "granted");
      updateConsent("granted");
      overlay.remove();
    });

    document.getElementById("lp-cookie-reject").addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEY, "denied");
      updateConsent("denied");
      overlay.remove();
    });
  }
})();