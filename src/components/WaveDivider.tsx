import { cn } from "@/lib/utils"

type WaveDividerProps = {
  className?: string
  flip?: boolean
  /** Cor do "papel" superior; o fundo da seção seguinte aparece na parte inferior. */
  fill?: string
}

export function WaveDivider({
  className,
  flip = false,
  fill = "#FBF6EE",
}: WaveDividerProps) {
  return (
    <div
      className={cn(
        "pointer-events-none w-full leading-[0]",
        flip && "rotate-180",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[60px] w-full sm:h-[90px]"
      >
        <path
          d="M0,64 C240,128 480,0 720,32 C960,64 1200,112 1440,64 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
