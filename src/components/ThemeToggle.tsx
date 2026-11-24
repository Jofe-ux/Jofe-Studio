import { Moon, Sun } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import { useTheme } from '@/theme/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { t } = useI18n()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? t.a11y.toLight : t.a11y.toDark}
      title={dark ? t.a11y.toLight : t.a11y.toDark}
      className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-fg-2 transition-colors hover:border-accent hover:text-fg"
    >
      {dark ? <Sun className="size-[1.1rem]" aria-hidden="true" /> : <Moon className="size-[1.1rem]" aria-hidden="true" />}
    </button>
  )
}
