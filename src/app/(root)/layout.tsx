import React from 'react'
import Header from '@/components/Header'
import { Toaster } from '@/components/ui/toaster'

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen h-full flex flex-col bg-secondary text-foreground">
      <Header />
      {/* <main className="">p-8 */}
        {children}
      {/* </main> */}
      <Toaster />
      {/* <footer className="w-full h-12 flex items-center justify-center bg-background text-foreground border-t border-primary">
        <p className="text-sm">&copy; {new Date().getFullYear()} Company. All rights reserved.</p>
      </footer> */}
    </div>
  )
}

export default RootLayout
