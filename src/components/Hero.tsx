
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Renewable Energy Solutions
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Powering a Sustainable <span className="bg-clip-text text-transparent bg-gradient-to-r from-energy-green to-energy-blue">Future</span> with Green Energy
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Explore renewable energy data, calculate your energy potential, and discover sustainable solutions for a greener tomorrow.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard" className="btn-primary">
                Explore Dashboard
              </Link>
              <Link to="/calculator" className="btn-secondary">
                Try Our Calculator
              </Link>
            </div>
          </div>
          <div className="reveal-slow lg:pl-10">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden card-glass">
                <div className="h-full w-full bg-gradient-to-br from-energy-blue/20 via-energy-green/20 to-energy-yellow/20 flex items-center justify-center">
                  <div className="text-center p-6">
                    <h2 className="text-2xl font-bold mb-4">Green Energy Institute</h2>
                    <p className="text-muted-foreground">
                      Committed to advancing renewable energy through research, data, and tools
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-energy-green/30 filter blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-energy-blue/20 filter blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
