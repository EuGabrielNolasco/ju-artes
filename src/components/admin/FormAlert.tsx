import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  success?: string
  error?: string
  className?: string
}

export function FormAlert({ success, error, className }: Props) {
  if (!success && !error) return null

  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm",
        success && "border-sage-200 bg-sage-50 text-sage-500",
        error && "border-red-200 bg-red-50 text-red-600",
        className
      )}
    >
      {success && <CheckCircle2 className="h-4 w-4 shrink-0" />}
      {error && <XCircle className="h-4 w-4 shrink-0" />}
      <span>{success ?? error}</span>
    </div>
  )
}
