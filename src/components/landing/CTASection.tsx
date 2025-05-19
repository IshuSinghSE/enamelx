import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary/100 to-primary/70 rounded-2xl p-8 md:p-12 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Transform Your Dental Practice with AI!
            </h2>
            <p className="text-muted mb-6">
              Enhance diagnostics, streamline workflows, and improve patient care
              with cutting-edge AI technology
            </p>
            <Link href="/dashboard" className="bg-primary-foreground text-primary hover:bg-secondary font-medium rounded-full px-8 py-3">
              Get Started
            </Link>
          </div>
          <div className="hidden md:block">
            {/* Decorative illustration or image could go here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
