import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Header: React.FC = () => {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-border bg-primary-foreground px-8 py-4 text-foreground">
      <div className="font-sora text-2xl font-bold">Logo</div>
      <nav className="flex gap-4 text-lg font-normal"></nav>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  )
}

export default Header
