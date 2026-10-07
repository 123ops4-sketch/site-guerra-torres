"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  COOKIE_CONSENT_OPEN_EVENT,
  clearPreferenceReviewParam,
  getStoredConsent,
  saveConsent,
  wantsPreferenceReview,
  type CookieConsentOpenDetail,
} from "@/lib/cookieConsent";

type BannerView = "notice" | "preferences";

const EXIT_MS = 240;

function ConsentSwitch({
  id,
  checked,
  disabled,
  onCheckedChange,
}: {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (next: boolean) => void;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-card",
        checked ? "bg-primary" : "bg-[#d9d9d6]",
        disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-1 left-1 size-5 rounded-full bg-white shadow-sm transition-transform",
          checked && "translate-x-5"
        )}
      />
    </button>
  );
}

export default function CookieConsent() {
  const titleId = useId();
  const descriptionId = useId();
  const essentialId = useId();
  const optionalId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const focusOnOpen = useRef(false);

  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [view, setView] = useState<BannerView>("notice");
  const [optionalOn, setOptionalOn] = useState(false);
  const [canDismiss, setCanDismiss] = useState(false);

  const reveal = useCallback((nextView: BannerView, focus: boolean) => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    const stored = getStoredConsent();
    setOptionalOn(stored?.optional === true);
    setCanDismiss(stored !== null);
    setView(nextView);
    setMounted(true);
    focusOnOpen.current = focus;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setShown(true));
    });
  }, []);

  const dismiss = useCallback(() => {
    setShown(false);
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setMounted(false);
      closeTimer.current = null;
    }, EXIT_MS);
  }, []);

  useEffect(() => {
    const stored = getStoredConsent();
    const review = wantsPreferenceReview();
    let cancelled = false;

    if (!stored || review) {
      queueMicrotask(() => {
        if (cancelled) return;
        reveal(review && stored ? "preferences" : "notice", review);
        if (review) clearPreferenceReviewParam();
      });
    }

    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsentOpenDetail>).detail;
      const current = getStoredConsent();
      const nextView = detail?.view ?? (current ? "preferences" : "notice");
      reveal(nextView, detail?.focus === true);
    };

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, onOpen);
    return () => {
      cancelled = true;
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, onOpen);
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, [reveal]);

  useEffect(() => {
    if (!shown || !focusOnOpen.current) return;
    focusOnOpen.current = false;
    dialogRef.current?.focus();
  }, [shown]);

  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (view === "preferences" && !canDismiss) {
        setView("notice");
        return;
      }
      if (canDismiss) dismiss();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, view, canDismiss, dismiss]);

  const accept = (optional: boolean) => {
    saveConsent(optional);
    dismiss();
  };

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-60 flex justify-center sm:justify-start sm:p-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className={cn(
          "pointer-events-auto max-h-[calc(100dvh-3.5rem)] w-full overflow-y-auto rounded-t-2xl rounded-b-none border border-x-0 border-b-0 border-border-default bg-bg-card shadow-[0_-12px_40px_rgba(31,31,31,0.12)] outline-none transition-all duration-300 ease-out sm:max-h-[calc(100dvh-3rem)] sm:max-w-104 sm:rounded-2xl sm:border-x sm:border-b sm:shadow-[0_18px_50px_rgba(31,31,31,0.14)]",
          shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        )}
      >
        <div className="h-1 bg-linear-to-r from-primary via-primary-light to-secondary" />

        <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pb-5">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h2
                  id={titleId}
                  className="font-heading text-base font-semibold text-text-primary"
                >
                  {view === "notice" ? "Privacidade e cookies" : "Preferências de cookies"}
                </h2>
                {canDismiss && (
                  <button
                    type="button"
                    onClick={dismiss}
                    className="-mr-1 -mt-1 flex size-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg-section hover:text-text-primary"
                    aria-label="Fechar aviso de cookies"
                  >
                    <X className="size-4" aria-hidden />
                  </button>
                )}
              </div>
              <p
                id={descriptionId}
                className="mt-1 text-sm leading-relaxed text-text-muted font-body"
              >
                {view === "notice" ? (
                  <>
                    Usamos cookies essenciais para o site funcionar. Análise e
                    marketing só são ativados com a sua autorização, conforme a
                    LGPD.{" "}
                    <Link
                      href="/cookies"
                      className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
                    >
                      Saiba mais
                    </Link>
                  </>
                ) : (
                  "Escolha o que podemos usar. Os essenciais permanecem ativos porque o site depende deles."
                )}
              </p>
            </div>
          </div>

          {view === "notice" ? (
            <div className="mt-4 flex flex-col gap-2">
              <Button
                type="button"
                className="h-11 w-full font-heading hover:bg-primary-light"
                onClick={() => accept(true)}
              >
                Aceitar todos
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full border-border-default bg-bg-card font-heading text-text-primary hover:border-primary/30 hover:bg-bg-section hover:text-text-primary"
                onClick={() => accept(false)}
              >
                Apenas essenciais
              </Button>
              <button
                type="button"
                onClick={() => setView("preferences")}
                className="h-10 rounded-lg text-sm font-medium text-text-secondary transition-colors hover:text-primary"
              >
                Personalizar
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3 rounded-xl border border-border-subtle bg-bg-base px-3.5 py-3">
                <div>
                  <p className="flex flex-wrap items-center gap-2">
                    <label
                      htmlFor={essentialId}
                      className="font-heading text-sm font-semibold text-text-primary"
                    >
                      Essenciais
                    </label>
                    <span className="rounded-full bg-secondary/25 px-2 py-0.5 text-[11px] font-medium tracking-wide text-text-secondary">
                      Sempre ativos
                    </span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">
                    Segurança, funcionamento das páginas e memória desta escolha.
                  </p>
                </div>
                <ConsentSwitch id={essentialId} checked disabled />
              </div>

              <div className="flex items-start justify-between gap-3 rounded-xl border border-border-default bg-bg-card px-3.5 py-3">
                <div>
                  <label
                    htmlFor={optionalId}
                    className="font-heading text-sm font-semibold text-text-primary"
                  >
                    Análise e marketing
                  </label>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">
                    Google Analytics, Google Tag Manager e Meta Pixel, para
                    entender o uso do site. Só entram se você autorizar.
                  </p>
                </div>
                <ConsentSwitch
                  id={optionalId}
                  checked={optionalOn}
                  onCheckedChange={setOptionalOn}
                />
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <Button
                  type="button"
                  className="h-11 w-full font-heading hover:bg-primary-light"
                  onClick={() => accept(optionalOn)}
                >
                  Salvar preferências
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 border-border-default bg-bg-card text-text-primary hover:border-primary/30 hover:bg-bg-section hover:text-text-primary"
                    onClick={() => {
                      setOptionalOn(getStoredConsent()?.optional === true);
                      setView("notice");
                    }}
                  >
                    Voltar
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 border-border-default bg-bg-card text-text-primary hover:border-primary/30 hover:bg-bg-section hover:text-text-primary"
                    onClick={() => accept(true)}
                  >
                    Aceitar todos
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
