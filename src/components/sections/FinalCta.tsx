"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { companyData } from "@/data/companyData";
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  MapPin,
  Send,
  Loader2,
  Instagram,
  Youtube,
  ExternalLink,
  Facebook,
} from "lucide-react";

const STORAGE_KEY = "lp_consultas_solicitacoes";
const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, estava no seu site e preciso tirar algumas dúvidas.";

/** Campo honeypot: nome que parece real para bots; usuários não veem. */
const HONEYPOT_NAME = "website_url";

function buildWhatsAppUrl(number: string, text: string): string {
  const digits = number.replace(/\D/g, "");
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${digits}${encoded ? `?text=${encoded}` : ""}`;
}

export default function FinalCta() {
  const { ref, isVisible } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    cidade: "",
    necessidade: "",
    mensagem: "",
    [HONEYPOT_NAME]: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form[HONEYPOT_NAME as keyof typeof form]) return;
    setIsSubmitting(true);
    const entry = {
      nome: form.nome,
      telefone: form.telefone,
      cidade: form.cidade,
      necessidade: form.necessidade,
      mensagem: form.mensagem,
      timestamp: new Date().toISOString(),
    };
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      const list = raw ? (JSON.parse(raw) as unknown[]) : [];
      list.push(entry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([entry]));
    }
    setSubmitted(true);
    setIsSubmitting(false);
    const text = [
      DEFAULT_WHATSAPP_MESSAGE,
      `Nome: ${form.nome}`,
      `Telefone: ${form.telefone}`,
      `Cidade: ${form.cidade}`,
      `Área do caso: ${form.necessidade || "Não informado"}`,
      form.mensagem ? `Detalhes: ${form.mensagem}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const url = buildWhatsAppUrl(companyData.whatsapp, text);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contato"
      className="py-24 bg-linear-to-tr from-bg-base via-bg-section to-bg-base relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(202,164,101,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-300 mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Coluna esquerda: Formulário + Redes sociais */}
          <div className="space-y-8">
            <div
              id="solicitar-consulta"
              className={`transition-all duration-600 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
            >
              <h3 className="font-heading font-semibold text-text-primary text-lg mb-4">
                Solicite sua Consulta
              </h3>
              <form
                onSubmit={handleSubmit}
                className="relative bg-bg-card border border-border-default rounded-2xl p-6 space-y-4"
              >
                <p className="text-text-muted text-xs font-body leading-relaxed mb-2">
                  Ao enviar, você concorda com a nossa{" "}
                  <Link href="/politica-de-privacidade" className="text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                    Política de Privacidade
                  </Link>{" "}
                  e o uso dos dados para contato e atendimento jurídico.
                </p>
                <div className="absolute -left-2499.75 w-1 h-1 overflow-hidden" aria-hidden>
                  <label htmlFor={HONEYPOT_NAME}>Deixe em branco</label>
                  <input
                    id={HONEYPOT_NAME}
                    name={HONEYPOT_NAME}
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form[HONEYPOT_NAME as keyof typeof form] as string}
                    onChange={(e) => setForm((f) => ({ ...f, [HONEYPOT_NAME]: e.target.value }))}
                  />
                </div>
                <div>
                  <label htmlFor="nome" className="block text-text-muted text-xs font-heading font-semibold uppercase tracking-wider mb-1.5">
                    Nome Completo
                  </label>
                  <input
                    id="nome"
                    type="text"
                    required
                    value={form.nome}
                    onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                    placeholder="Digite seu nome completo"
                    className="w-full px-4 py-3 bg-bg-base border border-border-default rounded-xl text-text-primary text-sm font-body placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="block text-text-muted text-xs font-heading font-semibold uppercase tracking-wider mb-1.5">
                    WhatsApp / Telefone
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    required
                    value={form.telefone}
                    onChange={(e) => setForm((f) => ({ ...f, telefone: e.target.value }))}
                    placeholder="(64) 99999-9999"
                    className="w-full px-4 py-3 bg-bg-base border border-border-default rounded-xl text-text-primary text-sm font-body placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label htmlFor="cidade" className="block text-text-muted text-xs font-heading font-semibold uppercase tracking-wider mb-1.5">
                    Cidade
                  </label>
                  <input
                    id="cidade"
                    type="text"
                    value={form.cidade}
                    onChange={(e) => setForm((f) => ({ ...f, cidade: e.target.value }))}
                    placeholder="Sua cidade"
                    className="w-full px-4 py-3 bg-bg-base border border-border-default rounded-xl text-text-primary text-sm font-body placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label htmlFor="necessidade" className="block text-text-muted text-xs font-heading font-semibold uppercase tracking-wider mb-1.5">
                    Área do seu caso
                  </label>
                  <select
                    id="necessidade"
                    value={form.necessidade}
                    onChange={(e) => setForm((f) => ({ ...f, necessidade: e.target.value }))}
                    className="w-full px-4 py-3 bg-bg-base border border-border-default rounded-xl text-text-primary text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
                  >
                    <option value="">Selecione uma opção</option>
                    {companyData.quoteOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="mensagem" className="block text-text-muted text-xs font-heading font-semibold uppercase tracking-wider mb-1.5">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    id="mensagem"
                    rows={3}
                    value={form.mensagem}
                    onChange={(e) => setForm((f) => ({ ...f, mensagem: e.target.value }))}
                    placeholder="Conte-nos mais detalhes sobre seu caso..."
                    className="w-full px-4 py-3 bg-bg-base border border-border-default rounded-xl text-text-primary text-sm font-body placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitted || isSubmitting}
                  className="w-full min-h-12 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-orange text-white text-sm font-semibold font-heading rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-orange disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-card"
                >
                  {isSubmitting ? (
                    <>
                      Enviando…
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                    </>
                  ) : submitted ? (
                    <>
                      Enviado
                      <Send className="w-4 h-4" aria-hidden />
                    </>
                  ) : (
                    <>
                      Enviar via WhatsApp
                      <Send className="w-4 h-4" aria-hidden />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div
              className={`transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
            >
              <h3 className="font-heading font-semibold text-text-primary text-lg mb-4">
                Siga a {companyData.companyName}
              </h3>
              <div className="bg-bg-card border border-border-default rounded-2xl p-6 space-y-3">
                {companyData.social.instagram?.url && (
                  <a
                    href={companyData.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-border-default hover:border-primary/40 hover:bg-bg-card-hover transition-all text-text-primary font-body text-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-secondary/25 flex items-center justify-center text-primary shrink-0">
                      <Instagram className="w-5 h-5" />
                    </div>
                    {companyData.social.instagram.label}
                  </a>
                )}
                {companyData.social.youtube?.url && (
                  <a
                    href={companyData.social.youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-border-default hover:border-primary/40 hover:bg-bg-card-hover transition-all text-text-primary font-body text-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-secondary/25 flex items-center justify-center text-primary shrink-0">
                      <Youtube className="w-5 h-5" />
                    </div>
                    {companyData.social.youtube.label}
                  </a>
                )}
                {companyData.social.facebook?.url && (
                  <a
                    href={companyData.social.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-border-default hover:border-primary/40 hover:bg-bg-card-hover transition-all text-text-primary font-body text-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-secondary/25 flex items-center justify-center text-primary shrink-0">
                      <Facebook className="w-5 h-5" />
                    </div>
                    {companyData.social.facebook.label}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Coluna direita: Contatos + Unidades */}
          <div className="space-y-8">
            <div
              className={`transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
            >
              <h3 className="font-heading font-semibold text-text-primary text-lg mb-4">
                Contate-nos
              </h3>
              <div className="bg-bg-card border border-border-default rounded-2xl p-6 space-y-3">
                <a
                  href={buildWhatsAppUrl(companyData.whatsapp, DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-border-default hover:border-primary/40 hover:bg-bg-card-hover transition-all text-text-primary font-body text-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary/25 flex items-center justify-center text-primary shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  WhatsApp para Atendimento — {companyData.phone}
                </a>
                <a
                  href={`tel:${companyData.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-border-default hover:border-primary/40 hover:bg-bg-card-hover transition-all text-text-primary font-body text-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary/25 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  Telefone Comercial — {companyData.phone}
                </a>
                <a
                  href={`mailto:${companyData.email}`}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-border-default hover:border-primary/40 hover:bg-bg-card-hover transition-all text-text-primary font-body text-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary/25 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  E-mail Comercial — {companyData.email}
                </a>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border-default text-text-primary font-body text-sm">
                  <div className="w-10 h-10 rounded-xl bg-secondary/25 flex items-center justify-center text-primary shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  Horário de Atendimento — {companyData.businessHours}
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-600 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
            >
              <h3 className="font-heading font-semibold text-text-primary text-lg mb-4">
                Encontre-nos
              </h3>
              <div className="space-y-6 relative">
                {companyData.units.map((unit) => (
                  <div
                    key={unit.name}
                    className="bg-bg-card border border-border-default rounded-2xl overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-2">
                        <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-heading font-semibold text-text-primary text-sm">
                            {unit.name}
                          </p>
                          <p className="text-text-muted text-xs font-body mt-1">
                            {unit.address}
                          </p>
                        </div>
                      </div>
                      <a
                        href={unit.mapsLinkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-primary text-xs font-heading font-semibold hover:underline absolute top-4 right-4"
                      >
                        Abrir no Maps
                        <ExternalLink className="w-3.5 h-3.5 " />
                      </a>
                    </div>
                    <div className="relative w-full aspect-16/10 bg-bg-base">
                      <iframe
                        title={`Mapa ${unit.name}`}
                        src={unit.mapsEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
