import type { ReactNode } from "react"

type SectionContainerProps = {
  children: ReactNode
  className?: string
  contentClassName?: string
}

export function SectionContainer({
  children,
  className = "",
  contentClassName = "",
}: SectionContainerProps) {
  return (
    <section
      className={[
        "h-full min-h-0 w-full",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "relative h-full min-h-0 overflow-hidden rounded-[32px] border border-white/10 bg-black/70 backdrop-blur-xl",
          "px-5 py-6",
          "sm:px-6 sm:py-7",
          "md:px-8 md:py-8",
          contentClassName,
        ].join(" ")}
      >
        {children}
      </div>
    </section>
  )
}