export function FooterDock() {
  return (
    <footer className="fixed bottom-0 left-0 z-30 hidden w-full px-4 pb-4 md:block">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl">
          <a
            href="https://github.com/MarcoDevCwb"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.18em] text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            GitHub
          </a>

          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.18em] text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}