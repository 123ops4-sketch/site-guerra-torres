"use client";

import { Button } from "@/components/ui/button";
import { openCookiePreferences } from "@/lib/cookieConsent";

export default function AlterarPreferenciasButton() {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-10 px-4 hover:border-primary/30 hover:bg-bg-section hover:text-text-primary"
      onClick={openCookiePreferences}
    >
      Alterar preferências de cookies
    </Button>
  );
}
