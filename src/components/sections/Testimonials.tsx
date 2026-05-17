import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Mariana S.",
    city: "São Paulo, SP",
    product: "Bolsa Tote Linho Areia",
    text: "Recebi minha bolsa e fiquei apaixonada. A qualidade é muito melhor do que eu esperava — o linho é firme, as alças não afrouxam e o acabamento é impecável. Parece uma peça de atelier.",
    initial: "M",
    color: "#B5654A",
    rotation: "-0.8deg",
  },
  {
    name: "Camila F.",
    city: "Recife, PE",
    product: "Kit 3 Bibs Aquarela",
    text: "Comprei para o enxoval da minha filha e presenteei mais duas amigas grávidas. Todo mundo perguntou onde tinha comprado. Chegou embalado com capricho e com um bilhetinho escrito à mão — esse detalhe me encantou.",
    initial: "C",
    color: "#C28C5C",
    rotation: "0deg",
  },
  {
    name: "Beatriz L.",
    city: "Natal, RN",
    product: "Mochila Pequena Bordada",
    text: "Sigo a Ju há anos e cada peça que ela lança é melhor que a anterior. A mochila bordada ficou ainda mais bonita pessoalmente do que nas fotos. Já estou na lista pra próxima.",
    initial: "B",
    color: "#8B9670",
    rotation: "0.8deg",
  },
]

export function Testimonials() {
  return (
    <section className="bg-cream-100/50 py-20 sm:py-28">
      <div className="container">
        {/* Header */}
        <div className="mb-14 space-y-3 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-copper-400/70" />
            <span className="text-[0.68rem] uppercase tracking-[0.3em] text-copper-600">
              Quem já levou uma peça
            </span>
            <span className="h-px w-8 bg-copper-400/70" />
          </div>
          <h2 className="font-serif text-4xl text-ink text-balance sm:text-5xl">
            O que as clientes{" "}
            <em className="italic text-terracotta-600">contam</em>
          </h2>
          <p className="mx-auto max-w-lg text-ink-soft">
            Cada depoimento é uma peça que chegou, foi usada e virou parte
            do dia de alguém.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="flex flex-col gap-5 rounded-3xl border border-cream-300/60 bg-cream-50/90 p-7 shadow-soft transition-all hover:shadow-warm hover:-translate-y-1"
              style={{ transform: `rotate(${t.rotation})` }}
            >
              {/* Stars */}
              <div className="flex gap-1" aria-label="5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-copper-400 text-copper-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="flex-1 font-serif text-[1.05rem] italic leading-relaxed text-ink-soft">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Product tag */}
              <span className="self-start rounded-full bg-terracotta-50 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-terracotta-600">
                {t.product}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-cream-300/50 pt-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm text-cream-50 shadow-soft"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initial}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="text-xs text-ink-muted">{t.city}</p>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
