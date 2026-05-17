"use client"

import { useFormState } from "react-dom"
import { updateSettings } from "@/lib/actions/settings"
import { FormAlert } from "@/components/admin/FormAlert"

type Settings = {
  whatsappNumber: string
  whatsappMessage: string
  instagram: string
  instagramUrl: string
  email: string
  artisanName: string
  city: string
}

export function SettingsForm({ settings }: { settings: Settings }) {
  const [state, formAction] = useFormState(updateSettings, null)

  return (
    <form action={formAction} className="space-y-5">
      <FormAlert success={state?.success} error={state?.error} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome da artesã" name="artisanName" defaultValue={settings.artisanName} required />
        <Field label="Cidade" name="city" defaultValue={settings.city} required />
      </div>

      <div className="border-t border-cream-200 pt-5">
        <p className="mb-4 text-xs uppercase tracking-[0.18em] text-copper-600">WhatsApp</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Número (com código do país)" name="whatsappNumber" defaultValue={settings.whatsappNumber} required placeholder="5584999999999" />
          <Field label="Email de contato" name="email" type="email" defaultValue={settings.email} placeholder="contato@juartes.com" />
        </div>
        <Field label="Mensagem padrão do WhatsApp" name="whatsappMessage" as="textarea" defaultValue={settings.whatsappMessage} required />
      </div>

      <div className="border-t border-cream-200 pt-5">
        <p className="mb-4 text-xs uppercase tracking-[0.18em] text-copper-600">Instagram</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="@handle" name="instagram" defaultValue={settings.instagram} required />
          <Field label="URL completa" name="instagramUrl" type="url" defaultValue={settings.instagramUrl} required />
        </div>
      </div>

      <button type="submit" className="rounded-full bg-terracotta-500 px-8 py-2.5 text-sm font-medium text-cream-50 shadow-soft hover:bg-terracotta-600 transition-all">
        Salvar configurações
      </button>
    </form>
  )
}

function Field({ label, name, as, type = "text", ...props }: {
  label: string; name: string; as?: "textarea"; type?: string; [k: string]: unknown
}) {
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
