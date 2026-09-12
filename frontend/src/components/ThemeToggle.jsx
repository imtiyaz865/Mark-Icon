import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className={`inline-flex min-h-10 items-center gap-[0.55rem] px-[0.4rem] py-[0.3rem] font-(--font-mono) text-[0.68rem] uppercase tracking-[0.14em] text-(--text-muted) transition-colors duration-200 hover:text-(--text) ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={`Switch to ${next} mode`}
      aria-pressed={theme === 'light'}
    >
      <span>{next}</span>
      <span className="relative h-[1.15rem] w-[2.15rem] rounded-[1px] border border-(--line-strong)" aria-hidden="true">
        <span className="absolute left-0.5 top-0.5 h-[0.7rem] w-[0.7rem] rounded-[1px] bg-(--accent) transition-transform duration-320 ease-out translate-x-[0.92rem] dark:translate-x-0" />
      </span>
    </button>
  )
}
