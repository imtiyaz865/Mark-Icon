export default function GridBackground() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none opacity-80 bg-[linear-gradient(var(--grid)_1px,transparent_1px),linear-gradient(90deg,var(--grid)_1px,transparent_1px)] bg-size-[72px_72px] max-[720px]:bg-size-[48px_48px]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,var(--bg)_92%)]" />
    </div>
  )
}
