import Link from 'next/link'
import React from 'react'
import { ProfileDropDown } from './ProfileDropDown'
import { SupportModal } from './SupportModal'
import Image from 'next/image'

const Header: React.FC = () => {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-border bg-primary-foreground px-4 py-4 text-foreground">
      <Link href="/" className="flex gap-1">
        <Image
          src="/images/logo.png"
          alt="Enamelx Logo"
          className="h-10 w-auto"
          width={40}
          height={40}
        />
        <div className="py-1 font-sora text-2xl font-bold">EnamelX</div>
      </Link>

      <nav className="flex gap-4 text-lg font-normal"></nav>

      <div className="flex items-center gap-2">
        <SupportModal />
        <ProfileDropDown />
      </div>
    </header>
  )
}

export default Header
