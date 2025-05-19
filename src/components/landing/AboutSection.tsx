import Image from "next/image";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary">About DentiSense</h2>
          <p className="text-lg text-muted-foreground">
            Instantly analyze X-rays and intraoral scans with AI to detect dental conditions with high accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-primary mb-4 uppercase">Problem Solver</h3>
              <p className="text-muted-foreground">
                From the start, we enjoyed solving problems with technology.
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-4">
                We tackled the key challenges in patient management and skillful planning when we first started, requiring several resources.
              </p>
              <p className="text-muted-foreground">
                Our team combines expertise in dentistry, artificial intelligence, and software development to create solutions that truly impact dental care quality and efficiency.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden md:p-12">
            <Image
              src="/images/dental-technology.jpg" 
              alt="Dental technology" 
              className="rounded-2xl h-full w-full object-cover"
              width={400}
              height={400}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
