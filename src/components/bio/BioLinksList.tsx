import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Music2,
  Youtube,
} from "lucide-react";
import { companyData } from "@/data/companyData";

const socialLinks = [
  {
    key: "instagram",
    label: "Instagram",
    icon: Instagram,
    data: companyData.social.instagram,
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: Facebook,
    data: companyData.social.facebook,
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: Youtube,
    data: companyData.social.youtube,
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: Music2,
    data: companyData.social.tiktok,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    data: companyData.social.linkedin,
  },
];

export default function BioLinksList() {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-heading font-semibold text-text-primary">
        Links úteis
      </h3>

      <div className="space-y-2">
        <Link
          href="/"
          className="flex min-h-12 items-center justify-between rounded-xl border border-border-default bg-bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-bg-card-hover"
          aria-label="Ir para a página principal"
        >
          <span className="flex items-center gap-2 text-sm font-body text-text-secondary">
            <Globe className="h-4 w-4 text-primary" aria-hidden />
            Site oficial
          </span>
          <ArrowRight className="h-4 w-4 text-text-muted" aria-hidden />
        </Link>

        {socialLinks.map((item) => {
          if (!item.data?.url) return null;
          const Icon = item.icon;

          return (
            <a
              key={item.key}
              href={item.data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-between rounded-xl border border-border-default bg-bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-bg-card-hover"
              aria-label={`Abrir ${item.label}`}
            >
              <span className="flex items-center gap-2 text-sm font-body text-text-secondary">
                <Icon className="h-4 w-4 text-primary" aria-hidden />
                {item.label}
              </span>
              <ExternalLink className="h-4 w-4 text-text-muted" aria-hidden />
            </a>
          );
        })}
      </div>
    </section>
  );
}
