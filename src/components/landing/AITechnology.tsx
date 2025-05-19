import Link from "next/link";

const AITechnology = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title text-primary">Best-in-Class dental care with AI</h2>
          <p className="section-subtitle text-muted-foreground">
            Instantly analyze X-rays and intraoral scans with AI to detect dental conditions with high accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI Radiology */}
          <div className="bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-primary/20">
            <div className="bg-gradient-to-r from-primary-foreground to-secondary/10 p-8">
              <h3 className="text-2xl font-semibold text-primary mb-4">AI Radiology</h3>
              <p className="text-muted-foreground mb-4">
                Real-time, AI-driven intraoral studies for quicker, more informed dental decisions, enhancing diagnostic accuracy and improving patient outcomes.
              </p>
              <a href="#" className="text-muted-foreground font-medium hover:text-primary inline-flex items-center">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Intraoral AI */}
          <div className="bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-primary/20">
            <div className="bg-gradient-to-r from-primary-foreground to-secondary/10 p-8">
              <h3 className="text-2xl font-semibold text-primary mb-4">Intraoral AI</h3>
              <p className="text-muted-foreground mb-4">
                Real-time, AI-driven intraoral studies for quicker, more informed dental decisions, enhancing diagnostic accuracy and improving patient outcomes.
              </p>
              <Link href="#" className="text-muted-foreground font-medium hover:text-primary inline-flex items-center">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITechnology;
