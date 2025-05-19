import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="bg-gradient-to-r from-primary/10 to-secondary/80 px-16 py-20 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="section-title">Subscription Plans</h2>
          <p className="section-subtitle">
            Choose a plan that suits your needs, be it access to advanced dental
            analysis, secure patient management, or detailed reports.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">

          {/* Monthly Plan */}
          <div className="min-w-[280px] overflow-hidden rounded-2xl bg-background p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="mb-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-primary">Monthly</h3>
              <div className="mb-4 flex items-baseline justify-center">
                <span className="text-4xl font-bold text-primary">₹100</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
            </div>
            <div className="px-4">
              <ul className="mb-8 space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Full access</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">AI analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    Patient management
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Secure storage</span>
                </li>
              </ul>

              <div className="text-center">
                <Button className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow hover:bg-primary/90">
                  Get Now
                </Button>
              </div>
            </div>
          </div>

          {/* Yearly Plan */}
          <div className="min-w-[280px] overflow-hidden rounded-2xl border-2 border-primary/30 bg-background p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="absolute right-4 top-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Best Value
              </span>
            </div>

            <div className="mb-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-primary">Yearly</h3>
              <div className="mb-4 flex items-baseline justify-center">
                <span className="text-4xl font-bold text-primary">₹800</span>
                <span className="ml-1 text-muted-foreground">/year</span>
              </div>
            </div>
            <div className="px-4">
              <ul className="mb-8 space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Save ₹400!</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    All monthly features
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    Priority support
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    Exclusive updates
                  </span>
                </li>
              </ul>

              <div className="text-center">
                <Button className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow hover:bg-primary/90">
                  Get Now
                </Button>
              </div>
            </div>
          </div>

          {/* Add more plans here if needed */}
          {/* enterprise plan */}
          <div className="min-w-[280px] overflow-hidden rounded-2xl bg-background p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="mb-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-primary">
                Enterprise
              </h3>
              <div className="mb-4 flex items-baseline justify-center">
                <span className="text-4xl font-bold text-primary">
                  Contact Us
                </span>
              </div>
            </div>
            <div className="px-4">
              <ul className="mb-8 space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    Custom solutions
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    Dedicated support
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    Scalable options
                  </span>
                </li>
              </ul>

              <div className="text-center">
                <Button className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow hover:bg-primary/90">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
