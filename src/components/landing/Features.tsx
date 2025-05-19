import { Stethoscope, Users, Globe } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Features</h2>
          <p className="section-subtitle">
            Instantly analyze X-rays and intraoral scans with AI to detect dental conditions with high accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="feature-card text-center border-2 border-primary/10 ">
            <div className="feature-icon mx-auto">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">AI-Powered Diagnosis</h3>
            <p className="text-muted-foreground">
              Instantly analyze X-rays and intraoral scans with AI to detect dental conditions with high accuracy.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card text-center border-2 border-primary/10 ">
            <div className="feature-icon mx-auto">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Patient Management</h3>
            <p className="text-muted-foreground">
              Easily store, organize, and retrieve patient records and their diagnostic history.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card text-center border-2 border-primary/10 ">
            <div className="feature-icon mx-auto">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Web-Based</h3>
            <p className="text-muted-foreground">
              Access from any device—desktop, laptop, tablet, or mobile—and utilize the software anywhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
