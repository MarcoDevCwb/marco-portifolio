type FooterDockProps = {
  isMenuOpen?: boolean
}

const socialItems = [
  {
    href: "https://github.com/MarcoDevCwb",
    label: "GitHub",
    kind: "github" as const,
  },
  {
    href: "https://www.linkedin.com/in/marco-vinicius-9637b7a5/",
    label: "LinkedIn",
    kind: "linkedin" as const,
  },
]

export function FooterDock({ isMenuOpen = false }: FooterDockProps) {
  return (
    <footer
      className={[
        "footer-dock fixed bottom-0 left-0 z-[70] w-full px-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:px-4 sm:pb-4",
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isMenuOpen
          ? "pointer-events-none translate-y-6 opacity-0 blur-[2px]"
          : "translate-y-0 opacity-100 blur-0",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className={[
            "footer-dock__shell relative overflow-hidden rounded-full",
            "border border-white/10 bg-black/75 backdrop-blur-2xl",
            "px-3 py-2.5 sm:px-4 sm:py-3",
            "shadow-[0_10px_40px_rgba(0,0,0,0.35)]",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_50%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.12),transparent_30%)]" />

            <div className="footer-dock__glow absolute left-1/2 top-1/2 h-20 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-3xl motion-ambient-pulse" />

            <div className="footer-dock__line-top absolute left-1/2 top-0 h-px w-36 -translate-x-1/2 overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-fuchsia-400/80 to-transparent motion-led-flow" />
            </div>

            <div className="footer-dock__line-bottom absolute bottom-0 left-1/2 h-px w-44 -translate-x-1/2 overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-violet-400/60 to-transparent motion-led-flow" />
            </div>

            <div className="absolute inset-y-0 left-[-20%] w-24 bg-white/10 blur-xl opacity-0 motion-glass-sweep" />
          </div>

          <div className="footer-dock__content relative flex items-center justify-center gap-3 sm:gap-4">
            {socialItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                title={item.label}
                className={[
                  "footer-dock__button group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full",
                  "border border-white/10 bg-white/5 text-white/80",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white",
                  "active:scale-95",
                ].join(" ")}
              >
                <span className="pointer-events-none absolute inset-x-2 top-0 h-px overflow-hidden opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="block h-full w-full bg-gradient-to-r from-transparent via-fuchsia-400/90 to-transparent motion-led-flow" />
                </span>

                <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_70%)] opacity-0 transition duration-300 group-hover:opacity-100" />

                {item.kind === "github" ? (
                  <img
                    src="/icons/github.svg"
                    alt="GitHub"
                    className="footer-dock__icon relative h-5 w-5 invert opacity-75 transition duration-300 group-hover:opacity-100"
                  />
                ) : (
                  <span className="footer-dock__linkedin relative text-[15px] font-extrabold tracking-[-0.08em] text-white/80 transition duration-300 group-hover:text-white">
                    in
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}