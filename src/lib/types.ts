export type ProductCardData = {
  id: string
  slug: string
  name: string
  description: string
  price: number
  category: string
  categoryName: string
  gradient: string
  image: string
  featured: boolean
  available: boolean
  materials: string[]
}

export type CategoryData = {
  slug: string
  name: string
  description: string
  gradient: string
  iconName: string
}
