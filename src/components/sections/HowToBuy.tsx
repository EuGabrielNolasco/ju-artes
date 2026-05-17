import Link from "next/link"
import { CheckCircle2, MessageCircle, ShoppingBag, Truck } from "lucide-react"
import { WhatsAppIcon } from "@/components/WhatsAppIcon"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

const steps = [
  {
    icon: ShoppingBag,
    title: "Escolha sua peça",
    description:
      "Passeie pelo catálogo e separe o que combinou com você — pode ser uma só ou um cantinho inteiro.",
  },
  {
    icon: MessageCircle,
    title: "Fale pelo WhatsApp",
    description:
      "Clique em 'Tenho interesse': a mensagem já vai pronta com a peça e o valor. Conversa direta com a Ju.",
  },
  {
    icon: Truck,
    title: "Combine a entrega",
    description:
      "A gente acerta forma de pagamento e envio. Peças prontas saem em até 3 dias; encomendas, em até 14.",
  },
]

const guarantees = [
  "Atendimento pessoal — sem robôs, sem formulários",
  "Envio seguro via Correios para todo o Brasil",
  "Cada peça revisada antes de sair das mãos da Ju",
]

export function HowToBuy() {
  const whatsappUrl = buildWhatsAppUrl()

  return (
    <section className="bg-cream-100/70 py-24 sm:py-32">
      <div className="container">
        {/* Header */}
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-copper-400/70" />
            <span className="text-[0.68rem] uppercase tracking-[0.3em] text-copper-600">
              Como comprar
            </span>
            <span className="h-px w-8 bg-copper-400/70" />
          </div>
          <h2 className="font-serif text-4xl text-ink text-balance sm:text-5xl">
            Três passos simples até sua{" "}
            <em className="italic text-terracotta-600">peça favorita</em>{" "}
            chegar.
          </h2>
          <p className="text-ink-soft">
            Sem carrinho, sem fila — uma conversa direta, do jeito artesanal.
          </p>
        </div>

        {/* Steps */}
        <ol className="relative mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, idx) => (
            <li
              key={step.title}
              className="relative rounded-3xl border border-cream-300/60 bg-cream-50 p-8 shadow-soft transition-shadow hover:shadow-warm"
            >
              <span className="absolute -top-5 left-8 inline-flex h-10 w-10 items-center justify-center rounded-full bg-terracotta-500 font-serif text-lg text-cream-50 shadow-warm">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="mb-5 mt-2 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-200 text-terracotta-700">
                <step.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h3 className="font-serif text-2xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 text-sm font-medium tracking-wide text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-[#1ebe57] hover:shadow-warm-lg"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Falar agora no WhatsApp
          </Link>
        </div>

        {/* Guarantees */}
        <ul className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
          {guarantees.map((g) => (
            <li key={g} className="flex items-center gap-2.5 text-sm text-ink-muted">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-sage-400" strokeWidth={2} />
              {g}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
