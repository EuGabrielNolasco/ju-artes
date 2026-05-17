export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  featured: boolean
  available: boolean
  materials: string[]
}

export const products: Product[] = [
  {
    id: "bolsa-tote-linho",
    name: "Bolsa Tote Linho Areia",
    description:
      "Bolsa tote ampla em linho cru, alças reforçadas e bolso interno. Acompanha o dia inteiro sem perder a postura.",
    price: 189,
    category: "bolsas-necessaires",
    image: "/products/bolsa-tote-linho.jpg",
    featured: true,
    available: true,
    materials: ["Linho natural", "Alças reforçadas"],
  },
  {
    id: "necessaire-floral",
    name: "Necessaire Floral Petit",
    description:
      "Necessaire pequena com forro impermeável e estampa floral exclusiva. Cabe os essenciais sem pesar.",
    price: 65,
    category: "bolsas-necessaires",
    image: "/products/necessaire-floral.jpg",
    featured: true,
    available: true,
    materials: ["Forro impermeável", "Estampa exclusiva"],
  },
  {
    id: "carteira-couro-veg",
    name: "Carteira Slim Couro Vegetal",
    description:
      "Carteira slim em couro vegetal, com espaço para cartões, notas e um bolso secreto para fotos queridas.",
    price: 145,
    category: "bolsas-necessaires",
    image: "/products/carteira-couro-veg.jpg",
    featured: false,
    available: true,
    materials: ["Couro vegetal", "Bolso secreto"],
  },
  {
    id: "mochila-pequena-bordada",
    name: "Mochila Pequena Bordada",
    description:
      "Mochila compacta em algodão encerado com bordado floral feito ponto a ponto. Para sair leve e bem acompanhada.",
    price: 268,
    category: "bolsas-necessaires",
    image: "/products/mochila-pequena-bordada.jpg",
    featured: true,
    available: true,
    materials: ["Algodão encerado", "Bordado manual"],
  },
  {
    id: "babador-bandana",
    name: "Babador Bandana Duplo",
    description:
      "Babador em formato bandana com algodão duplo e botão de pressão. Confortável e charmoso para os pequenos.",
    price: 39,
    category: "infantil",
    image: "/products/babador-bandana.jpg",
    featured: false,
    available: true,
    materials: ["Algodão duplo", "Botão de pressão"],
  },
  {
    id: "kit-bibs-aquarela",
    name: "Kit 3 Bibs Aquarela",
    description:
      "Trio de bibs em tons aquarela com costura reforçada. Ideal para o enxoval e momentos da papinha.",
    price: 98,
    category: "infantil",
    image: "/products/kit-bibs-aquarela.jpg",
    featured: true,
    available: true,
    materials: ["Algodão", "Costura reforçada"],
  },
  {
    id: "naninha-coelho",
    name: "Naninha Coelho de Pano",
    description:
      "Naninha de pano em algodão macio com orelhas longas. O primeiro amigo do bebê, costurado à mão.",
    price: 119,
    category: "infantil",
    image: "/products/naninha-coelho.jpg",
    featured: false,
    available: true,
    materials: ["Algodão macio", "Costurada à mão"],
  },
  {
    id: "jogo-americano-tear",
    name: "Jogo Americano Tear (Par)",
    description:
      "Par de jogos americanos em algodão tramado, lavável em máquina. Veste a mesa com textura e calor.",
    price: 89,
    category: "casa-mesa",
    image: "/products/jogo-americano-tear.jpg",
    featured: false,
    available: true,
    materials: ["Algodão tramado", "Lavável"],
  },
  {
    id: "capa-almofada-terra",
    name: "Capa de Almofada Terra",
    description:
      "Capa de almofada 45x45 em tecido encorpado tom terracota. Zíper invisível, acabamento impecável.",
    price: 79,
    category: "casa-mesa",
    image: "/products/capa-almofada-terra.jpg",
    featured: true,
    available: true,
    materials: ["Tecido encorpado", "Zíper invisível"],
  },
  {
    id: "caminho-mesa-bordado",
    name: "Caminho de Mesa Bordado",
    description:
      "Caminho de mesa em linho com bordado livre nas pontas. Peça-protagonista para almoços lentos.",
    price: 178,
    category: "casa-mesa",
    image: "/products/caminho-mesa-bordado.jpg",
    featured: false,
    available: false,
    materials: ["Linho", "Bordado livre"],
  },
  {
    id: "scrunchie-cetim",
    name: "Trio de Scrunchies Cetim",
    description:
      "Trio de scrunchies em cetim, gentis com o cabelo e duráveis. Tons coordenados com o catálogo da estação.",
    price: 45,
    category: "acessorios",
    image: "/products/scrunchie-cetim.jpg",
    featured: false,
    available: true,
    materials: ["Cetim", "Tons coordenados"],
  },
  {
    id: "chaveiro-pompom",
    name: "Chaveiro Pompom Trançado",
    description:
      "Chaveiro com pompom de algodão trançado e argola dourada. Mimo perfeito para presentear.",
    price: 35,
    category: "acessorios",
    image: "/products/chaveiro-pompom.jpg",
    featured: false,
    available: true,
    materials: ["Algodão trançado", "Argola dourada"],
  },
]

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug)
}
