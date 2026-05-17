export type Category = {
  slug: string
  name: string
  description: string
  /** Tailwind gradient classes usadas no placeholder do produto e no card de categoria. */
  gradient: string
  /** Nome do ícone Lucide associado (referenciado em Categories.tsx). */
  iconName: "ShoppingBag" | "Baby" | "Home" | "Sparkles"
}

export const categories: Category[] = [
  {
    slug: "bolsas-necessaires",
    name: "Bolsas & Necessaires",
    description: "Para sair com estilo — bolsas, carteiras e necessaires que acompanham o seu ritmo.",
    gradient: "from-terracotta-400 to-copper-500",
    iconName: "ShoppingBag",
  },
  {
    slug: "infantil",
    name: "Infantil",
    description: "Para os pequenos — peças macias, coloridas e costuradas com carinho redobrado.",
    gradient: "from-copper-300 to-cream-400",
    iconName: "Baby",
  },
  {
    slug: "casa-mesa",
    name: "Casa & Mesa",
    description: "Para vestir a casa — jogos americanos, capas e texturas que aquecam o lar.",
    gradient: "from-sage-400 to-cream-300",
    iconName: "Home",
  },
  {
    slug: "acessorios",
    name: "Acessórios",
    description: "Para presentear ou se presentear — scrunchies, chaveiros e mimos para o dia a dia.",
    gradient: "from-copper-400 to-terracotta-300",
    iconName: "Sparkles",
  },
]

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
