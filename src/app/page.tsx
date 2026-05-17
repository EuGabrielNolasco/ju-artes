import { Hero } from "@/components/sections/Hero"
import { FeaturedProducts } from "@/components/sections/FeaturedProducts"
import { Categories } from "@/components/sections/Categories"
import { About } from "@/components/sections/About"
import { Testimonials } from "@/components/sections/Testimonials"
import { HowToBuy } from "@/components/sections/HowToBuy"
import { WaveDivider } from "@/components/WaveDivider"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <WaveDivider fill="#F1ECE2" />
      <Categories />
      <WaveDivider flip fill="#F1ECE2" />
      <About />
      <WaveDivider fill="#F1ECE2" />
      <Testimonials />
      <WaveDivider flip fill="#F1ECE2" />
      <HowToBuy />
    </>
  )
}
