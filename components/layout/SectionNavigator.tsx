import { AboutSection } from "@/components/sections/about/AboutSection"
import { AudioSection } from "@/components/sections/AudioSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { HeroRoot } from "@/components/sections/hero/HeroRoot"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { StackSection } from "@/components/sections/StackSection"
import type { SectionKey } from "@/lib/types/navigation"

type SectionNavigatorProps = {
  activeSection: SectionKey
}

export function SectionNavigator({
  activeSection,
}: SectionNavigatorProps) {
  switch (activeSection) {
    case "about":
      return <AboutSection />
    case "stack":
      return <StackSection />
    case "projects":
      return <ProjectsSection />
    case "audio":
      return <AudioSection />
    case "contact":
      return <ContactSection />
    case "home":
    default:
      return <HeroRoot />
  }
}