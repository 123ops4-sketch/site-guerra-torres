/**
 * Utilitários de consentimento de cookies (LGPD).
 * Compartilhado entre CookieConsent e scripts de analytics.
 */

export const COOKIE_CONSENT_STORAGE_KEY = "cookie_consent";
const VALIDITY_MONTHS = 12;

export interface CookieConsentState {
  essential: boolean;
  optional: boolean;
  timestamp: number;
}

export function getStoredConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentState;
    if (!parsed || typeof parsed.essential !== "boolean") return null;
    const expiry = parsed.timestamp + VALIDITY_MONTHS * 30 * 24 * 60 * 60 * 1000;
    if (Date.now() > expiry) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function hasOptionalConsent(): boolean {
  const consent = getStoredConsent();
  return consent?.optional === true;
}

/** Nome do evento disparado quando o usuário atualiza preferências de cookies. */
export const COOKIE_CONSENT_UPDATED_EVENT = "cookie-consent-updated";

/** Abre o aviso para revisar a escolha já salva, sem apagar o consentimento. */
export const COOKIE_CONSENT_OPEN_EVENT = "cookie-consent-open";

export interface CookieConsentOpenDetail {
  focus?: boolean;
  view?: "notice" | "preferences";
}

export function saveConsent(optional: boolean): void {
  if (typeof window === "undefined") return;
  try {
    const state: CookieConsentState = {
      essential: true,
      optional,
      timestamp: Date.now(),
    };
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT));
  } catch {
    // armazenamento indisponível (modo privado ou bloqueio)
  }
}

export function openCookiePreferences(): void {
  if (typeof window === "undefined") return;
  const detail: CookieConsentOpenDetail = { focus: true, view: "preferences" };
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_OPEN_EVENT, { detail }));
}

export function wantsPreferenceReview(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("cookies") === "preferencias";
}

/** Remove `?cookies=preferencias` sem nova navegação. */
export function clearPreferenceReviewParam(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (url.searchParams.get("cookies") !== "preferencias") return;
  url.searchParams.delete("cookies");
  const search = url.searchParams.toString();
  window.history.replaceState(
    window.history.state,
    "",
    `${url.pathname}${search ? `?${search}` : ""}${url.hash}`
  );
}
