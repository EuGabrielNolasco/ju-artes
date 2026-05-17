import { prisma } from "@/lib/db"
import { updateSettings } from "@/lib/actions/settings"
import { siteConfig } from "@/config/site"

async function saveSettings(formData: FormData): Promise<void> {
  "use server"
  await updateSettings(formData)
}

export default async function ConfiguracoesPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } })
  const s = settings ?? siteConfig

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ink">Configurações</h1>
        <p className="text-sm text-ink-muted">Contato, redes sociais e informações do site</p>
      </div>

      <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6 shadow-soft max-w-2xl">
        <form action={saveSettings} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nome da artesã" name="artisanName" defaultValue={s.artisanName} required />
            <Field label="Cidade" name="city" defaultValue={s.city} required />
          </div>

          <div className="border-t border-cream-200 pt-5">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-copper-600">WhatsApp</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Número (com código do país)" name="whatsappNumber" defaultValue={s.whatsappNumber} required placeholder="5584999999999" />
              <Field label="Email de contato" name="email" type="email" defaultValue={"email" in s ? s.email : ""} placeholder="contato@juartes.com" />
            </div>
            <Field label="Mensagem padrão do WhatsApp" name="whatsappMessage" as="textarea" defaultValue={s.whatsappMessage} required />
          </div>

          <div className="border-t border-cream-200 pt-5">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-copper-600">Instagram</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="@handle" name="instagram" defaultValue={s.instagram} required />
              <Field label="URL completa" name="instagramUrl" type="url" defaultValue={s.instagramUrl} required />
            </div>
          </div>

          <button type="submit" className="rounded-full bg-terracotta-500 px-8 py-2.5 text-sm font-medium text-cream-50 shadow-soft hover:bg-terracotta-600 transition-all">
            Salvar configurações
          </button>
        </form>
      </div>

      {/* Preview */}
      <div className="rounded-2xl border border-cream-300 bg-cream-50 p-6 shadow-soft max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-copper-600">Preview do link WhatsApp</p>
        <code className="block break-all rounded-xl bg-cream-100 px-4 py-3 text-xs text-ink-muted">
          {`https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(s.whatsappMessage + " ")}`}
        </code>
      </div>
    </div>
  )
}

function Field({ label, name, as, type = "text", ...props }: { label: string; name: string; as?: "textarea"; type?: string; [k: string]: unknown }) {
  const cls = "w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-200 transition-all"
  return (
    <div className="space-y-1.5">
      <label className="block text-xs uppercase tracking-[0.18em] text-ink-muted">{label}</label>
      {as === "textarea"
        ? <textarea name={name} rows={2} className={cls} {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>} />
        : <input name={name} type={type} className={cls} {...props as React.InputHTMLAttributes<HTMLInputElement>} />
      }
    </div>
  )
}
