import { Slot } from '@radix-ui/react-slot'
import React from 'react'

import { CircleHelp } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  label?: string
  icon?: React.ReactNode
}

const ActionButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, label, icon, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <div className={cn("flex h-20 w-16 flex-col items-center justify-center gap-1 z-10", className)}>
        <Comp
          className="m-0 flex h-12 w-12 items-center justify-center gap-0 rounded-2xl bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(var(--background))] p-0 text-xl font-normal text-muted-foreground ring-1 ring-accent hover:text-destructive-foreground shadow-md shadow-background transition-transform duration-100 ease-in-out hover:scale-110 dark:hover:brightness-105 disabled:opacity-50 [&_svg]:size-7"
          {...props}
        >
          {icon ? icon : <CircleHelp size={128} />}
        </Comp>
        <span className="select-none line-clamp-1 text-xs font-noto-sans font-medium capitalize text-muted-foreground">
          {label}
        </span>
      </div>
    )
  }
)

ActionButton.displayName = 'ActionButton'

export default ActionButton
