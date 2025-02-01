import { Slot } from '@radix-ui/react-slot'
import React from 'react'

import { CircleHelp } from 'lucide-react'

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
      <div className="flex h-20 w-16 flex-col items-center justify-center gap-1 z-10">
        <Comp
          className="m-0 flex h-12 w-12 items-center justify-center gap-0 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] p-0 text-xl font-normal text-muted shadow-md shadow-secondary transition-transform duration-100 ease-in-out hover:scale-105 hover:brightness-95 disabled:opacity-50 [&_svg]:size-7"
          {...props}
        >
          {icon ? icon : <CircleHelp size={128} />}
        </Comp>
        <span className="line-clamp-1 text-xs font-medium capitalize text-secondary">
          {label}
        </span>
      </div>
    )
  }
)

export default ActionButton
