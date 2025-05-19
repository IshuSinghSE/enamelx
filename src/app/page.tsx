'use client'
import AboutSection from '@/components/landing/AboutSection'
import AITechnology from '@/components/landing/AITechnology'
import CTASection from '@/components/landing/CTASection'
import Features from '@/components/landing/Features'
import Footer from '@/components/landing/Footer'
import Hero from '@/components/landing/Hero'
import Navbar from '@/components/landing/Navbar'
import PricingSection from '@/components/landing/PricingSection'
export default function Home() {
  // const router = useRouter()

  // useEffect(() => {
  //   router.push('/dashboard')
  // }, [router])

  // return null;

  return (
    // <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          {/* <main className="flex-grow"> */}
            <Hero />
            <Features />
            <AITechnology />
            <AboutSection />
            <PricingSection />
            <CTASection />
          {/* </main> */}
          <Footer />
        </div>
      </main>
    // </div>
  )
}
