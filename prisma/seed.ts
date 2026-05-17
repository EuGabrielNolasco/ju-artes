import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Categories
  await prisma.category.upsert({ where: { slug: "bolsas-necessaires" }, update: {}, create: { slug: "bolsas-necessaires", name: "Bolsas & Necessaires", description: "Para sair com estilo — bolsas, carteiras e necessaires que acompanham o seu ritmo.", gradient: "from-terracotta-400 to-copper-500", iconName: "ShoppingBag" } })
  await prisma.category.upsert({ where: { slug: "infantil" }, update: {}, create: { slug: "infantil", name: "Infantil", description: "Para os pequenos — peças macias, coloridas e costuradas com carinho redobrado.", gradient: "from-copper-300 to-cream-400", iconName: "Baby" } })
  await prisma.category.upsert({ where: { slug: "casa-mesa" }, update: {}, create: { slug: "casa-mesa", name: "Casa & Mesa", description: "Para vestir a casa — jogos americanos, capas e texturas que aquecam o lar.", gradient: "from-sage-400 to-cream-300", iconName: "Home" } })
  await prisma.category.upsert({ where: { slug: "acessorios" }, update: {}, create: { slug: "acessorios", name: "Acessórios", description: "Para presentear ou se presentear — scrunchies, chaveiros e mimos para o dia a dia.", gradient: "from-copper-400 to-terracotta-300", iconName: "Sparkles" } })

  // Products
  const products = [
    { slug: "bolsa-tote-linho", name: "Bolsa Tote Linho Areia", description: "Bolsa tote ampla em linho cru, alças reforçadas e bolso interno. Acompanha o dia inteiro sem perder a postura.", price: 189, category: "bolsas-necessaires", image: "/products/bolsa-tote-linho.jpg", featured: true, available: true, materials: JSON.stringify(["Linho natural", "Alças reforçadas"]) },
    { slug: "necessaire-floral", name: "Necessaire Floral Petit", description: "Necessaire pequena com forro impermeável e estampa floral exclusiva. Cabe os essenciais sem pesar.", price: 65, category: "bolsas-necessaires", image: "/products/necessaire-floral.jpg", featured: true, available: true, materials: JSON.stringify(["Forro impermeável", "Estampa exclusiva"]) },
    { slug: "carteira-couro-veg", name: "Carteira Slim Couro Vegetal", description: "Carteira slim em couro vegetal, com espaço para cartões, notas e um bolso secreto para fotos queridas.", price: 145, category: "bolsas-necessaires", image: "/products/carteira-couro-veg.jpg", featured: false, available: true, materials: JSON.stringify(["Couro vegetal", "Bolso secreto"]) },
    { slug: "mochila-pequena-bordada", name: "Mochila Pequena Bordada", description: "Mochila compacta em algodão encerado com bordado floral feito ponto a ponto. Para sair leve e bem acompanhada.", price: 268, category: "bolsas-necessaires", image: "/products/mochila-pequena-bordada.jpg", featured: true, available: true, materials: JSON.stringify(["Algodão encerado", "Bordado manual"]) },
    { slug: "babador-bandana", name: "Babador Bandana Duplo", description: "Babador em formato bandana com algodão duplo e botão de pressão. Confortável e charmoso para os pequenos.", price: 39, category: "infantil", image: "/products/babador-bandana.jpg", featured: false, available: true, materials: JSON.stringify(["Algodão duplo", "Botão de pressão"]) },
    { slug: "kit-bibs-aquarela", name: "Kit 3 Bibs Aquarela", description: "Trio de bibs em tons aquarela com costura reforçada. Ideal para o enxoval e momentos da papinha.", price: 98, category: "infantil", image: "/products/kit-bibs-aquarela.jpg", featured: true, available: true, materials: JSON.stringify(["Algodão", "Costura reforçada"]) },
    { slug: "naninha-coelho", name: "Naninha Coelho de Pano", description: "Naninha de pano em algodão macio com orelhas longas. O primeiro amigo do bebê, costurado à mão.", price: 119, category: "infantil", image: "/products/naninha-coelho.jpg", featured: false, available: true, materials: JSON.stringify(["Algodão macio", "Costurada à mão"]) },
    { slug: "jogo-americano-tear", name: "Jogo Americano Tear (Par)", description: "Par de jogos americanos em algodão tramado, lavável em máquina. Veste a mesa com textura e calor.", price: 89, category: "casa-mesa", image: "/products/jogo-americano-tear.jpg", featured: false, available: true, materials: JSON.stringify(["Algodão tramado", "Lavável"]) },
    { slug: "capa-almofada-terra", name: "Capa de Almofada Terra", description: "Capa de almofada 45x45 em tecido encorpado tom terracota. Zíper invisível, acabamento impecável.", price: 79, category: "casa-mesa", image: "/products/capa-almofada-terra.jpg", featured: true, available: true, materials: JSON.stringify(["Tecido encorpado", "Zíper invisível"]) },
    { slug: "caminho-mesa-bordado", name: "Caminho de Mesa Bordado", description: "Caminho de mesa em linho com bordado livre nas pontas. Peça-protagonista para almoços lentos.", price: 178, category: "casa-mesa", image: "/products/caminho-mesa-bordado.jpg", featured: false, available: false, materials: JSON.stringify(["Linho", "Bordado livre"]) },
    { slug: "scrunchie-cetim", name: "Trio de Scrunchies Cetim", description: "Trio de scrunchies em cetim, gentis com o cabelo e duráveis. Tons coordenados com o catálogo da estação.", price: 45, category: "acessorios", image: "/products/scrunchie-cetim.jpg", featured: false, available: true, materials: JSON.stringify(["Cetim", "Tons coordenados"]) },
    { slug: "chaveiro-pompom", name: "Chaveiro Pompom Trançado", description: "Chaveiro com pompom de algodão trançado e argola dourada. Mimo perfeito para presentear.", price: 35, category: "acessorios", image: "/products/chaveiro-pompom.jpg", featured: false, available: true, materials: JSON.stringify(["Algodão trançado", "Argola dourada"]) },
  ]

  for (const p of products) {
    await prisma.product.upsert({ where: { slug: p.slug }, update: p, create: p })
  }

  // SiteSettings
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      whatsappNumber: "5584999999999",
      whatsappMessage: "Olá! Vi seu catálogo e tenho interesse em:",
      instagram: "juartes_costuracriativa",
      instagramUrl: "https://instagram.com/juartes_costuracriativa",
      email: "",
      artisanName: "Ju",
      city: "Natal, RN",
    },
  })

  // Sample SaleRecords
  const now = new Date()
  const salesData = [
    { productSlug: "bolsa-tote-linho", productName: "Bolsa Tote Linho Areia", price: 189, month: now.getMonth() - 1 < 0 ? 12 : now.getMonth(), year: now.getMonth() - 1 < 0 ? now.getFullYear() - 1 : now.getFullYear() },
    { productSlug: "necessaire-floral", productName: "Necessaire Floral Petit", price: 65, month: now.getMonth() + 1, year: now.getFullYear() },
    { productSlug: "kit-bibs-aquarela", productName: "Kit 3 Bibs Aquarela", price: 98, month: now.getMonth() + 1, year: now.getFullYear() },
    { productSlug: "mochila-pequena-bordada", productName: "Mochila Pequena Bordada", price: 268, month: now.getMonth() + 1, year: now.getFullYear() },
    { productSlug: "capa-almofada-terra", productName: "Capa de Almofada Terra", price: 79, month: now.getMonth() - 2 < 0 ? 11 : now.getMonth() - 1, year: now.getFullYear() },
  ]

  for (const s of salesData) {
    await prisma.saleRecord.create({ data: s })
  }

  console.log("✓ Seed concluído: 4 categorias, 12 produtos, 1 configuração, 5 vendas de exemplo")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
