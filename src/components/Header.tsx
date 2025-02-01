import Link from 'next/link'
import React from 'react'

const Header:React.FC = () => {
  return (
    <header className="w-full h-12 flex justify-between items-center py-4 px-8 bg-background text-foreground border-b border-primary">
      <div className="text-2xl font-bold font-sora">Logo</div>
      <nav className="flex gap-4 text-lg font-normal">
        
      </nav>
    </header>
  )
}

export default Header
