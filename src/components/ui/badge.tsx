import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-terracotta-500 text-cream-50",
        soft: "bg-cream-200 text-ink-soft",
        outline: "border border-terracotta-500 text-terracotta-700 bg-transparent",
        unavailable: "bg-ink/85 text-cream-50 backdrop-blur-sm",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />
}

export { Badge, badgeVariants }
