import { HeartHandshake, Leaf, Sparkles } from "lucide-react"

const pillars = [
  {
    icon: HeartHandshake,
    title: "Feito à mão",
    description:
      "Cada peça é cortada, costurada e finalizada à mão — sem linha de produção, no tempo do ofício.",
  },
  {
    icon: Leaf,
    title: "Materiais selecionados",
    description:
      "Tecidos naturais, aviamentos cuidados e fornecedores que respeitam o trabalho artesanal.",
  },
  {
    icon: Sparkles,
    title: "Peças exclusivas",
    description:
      "Tiragens pequenas e estampas únicas. Quando uma peça se vai, abre espaço para outra história.",
  },
]

export function About() {
  return (
    <section id="sobre" className="py-24 sm:py-32">
      {/* Full-width pull quote */}
      <div className="container mb-20">
        <div className="relative mx-auto max-w-3xl text-center">
          <span
            aria-hidden
            className="absolute -top-14 left-1/2 -translate-x-1/2 font-serif leading-none text-terracotta-200 select-none"
            style={{ fontSize: "9rem" }}
          >
            &ldquo;
          </span>
          <blockquote className="relative font-serif text-2xl italic leading-relaxed text-ink sm:text-3xl sm:leading-relaxed">
            Eu não faço por encomenda. Eu faço pensando em quem vai usar —
            costurei cada ponto como se fosse para minha filha.
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-terracotta-300" />
            <span className="text-[0.66rem] uppercase tracking-[0.28em] text-copper-600">
              Ju, artesã
            </span>
            <span className="h-px w-10 bg-terracotta-300" />
          </div>
        </div>
      </div>

      {/* Story + pillars */}
      <div className="container grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        {/* Story text */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-copper-400/70" />
            <span className="text-[0.68rem] uppercase tracking-[0.3em] text-copper-600">
              Nossa história
            </span>
          </div>
          <h2 className="font-serif text-4xl text-ink text-balance sm:text-5xl">
            Costurar é a forma como{" "}
            <em className="italic text-terracotta-600">a Ju</em> conta o
            que sente.
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-ink-soft">
            <p>
              Tudo começou em uma mesa pequena, perto de uma janela, com a
              máquina de costura herdada da avó. O que era um hobby virou
              ofício; o que era ofício virou linguagem.
            </p>
            <p>
              Hoje a Ju desenha bolsas, peças para os pequenos e detalhes
              que vestem a casa — sempre escolhendo um tecido específico
              para alguém, um botão para outra história, uma cor pra
              alegrar a rotina de quem leva uma peça pra casa.
            </p>
          </div>

          {/* Stats */}
          <dl className="mt-2 grid grid-cols-3 gap-6 border-t border-cream-300/60 pt-6">
            {[
              { value: "5+", label: "anos de ofício" },
              { value: "300+", label: "peças criadas" },
              { value: "100%", label: "feito à mão" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-serif text-3xl text-terracotta-600">
                  {stat.value}
                </dt>
                <dd className="mt-0.5 text-[0.66rem] uppercase tracking-[0.18em] text-ink-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Pillars */}
        <ul className="grid gap-4 lg:pt-12">
          {pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="flex gap-5 rounded-3xl border border-cream-300/50 bg-cream-50/80 p-6 shadow-soft transition-shadow hover:shadow-warm"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-terracotta-50 text-terracotta-600 transition-colors">
                <pillar.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div className="space-y-1">
                <h3 className="font-serif text-xl text-ink">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {pillar.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
