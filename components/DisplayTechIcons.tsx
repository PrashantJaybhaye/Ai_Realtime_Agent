import { cn, getTechLogos } from "@/lib/utils"
import Image from "next/image"

interface TechIconProps {
  techStack: string[]
  maxVisible?: number
  size?: "sm" | "md" | "lg"
}

const DisplayTechIcons = async ({ techStack, maxVisible = 3 }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack)

  return (
    <div className="flex flex-row items-center">
      {techIcons.slice(0, maxVisible).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-gradient-to-br from-muted to-muted/50 rounded-full p-2.5 flex items-center justify-center border border-border/30 shadow-sm transition-all duration-200",
            "hover:shadow-md hover:scale-105 hover:z-30", // Added hover:z-30 to bring hovered icon to front
            index > 0 && "-ml-2",
          )}
        >
          {/* Tooltip */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-40 border border-border">
            {tech}
          </div>

          <Image
            src={url || "/placeholder.svg"}
            alt={tech}
            width={20}
            height={20}
            className="size-5 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-200"
          />
        </div>
      ))}

      {techStack.length > maxVisible && (
        <div className="relative group bg-gradient-to-br from-primary/20 to-primary/10 rounded-full p-2.5 flex items-center justify-center border border-primary/30 shadow-sm -ml-2 hover:z-30">
          {/* Tooltip for extra count */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-40 border border-border">
            +{techStack.length - maxVisible} more: {techStack.slice(maxVisible).join(", ")}
          </div>

          <span className="text-xs font-semibold text-primary">+{techStack.length - maxVisible}</span>
        </div>
      )}
    </div>
  )
}

export default DisplayTechIcons
