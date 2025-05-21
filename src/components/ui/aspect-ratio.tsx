
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"

interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  className?: string;
  autoSize?: boolean;
}

const AspectRatio = ({ className, autoSize, ...props }: AspectRatioProps) => {
  if (autoSize) {
    return (
      <div className={cn("relative w-full h-auto overflow-hidden", className)}>
        <div className="w-full h-auto">{props.children}</div>
      </div>
    )
  }

  return (
    <AspectRatioPrimitive.Root className={className} {...props} />
  )
}

export { AspectRatio }
