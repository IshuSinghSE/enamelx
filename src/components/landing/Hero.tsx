import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image 
            src="/images/hero-image.jpg" 
            alt="Dental professionals using AI technology" 
            className="w-full h-full object-cover"
            loading="eager"
            width={500}
            height={500}
          />
        </div>
        
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Revolutionizing dentistry through the power of AI
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Our team of dentists and developers creates AI-driven solutions to enhance dental diagnostics. 
            With advanced technology, we&apos;re driving greater accuracy in oral healthcare for a healthier future.
          </p>
          <div className="flex space-x-4">
            <Link
            href="/dashboard" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full px-6 py-2 shadow">Get Started</Link>
            <Button variant="outline" className="border border-primary text-primary hover:bg-primary/10 font-medium rounded-full px-6 py-3">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
