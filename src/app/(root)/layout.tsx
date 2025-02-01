import React from 'react'
import Header from '@/components/Header'

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow ">{/* p-8 */}
        {children}
      </main>
      {/* <footer className="w-full h-12 flex items-center justify-center bg-background text-foreground border-t border-primary">
        <p className="text-sm">&copy; {new Date().getFullYear()} Company. All rights reserved.</p>
      </footer> */}
    </div>
  )
}

export default RootLayout
