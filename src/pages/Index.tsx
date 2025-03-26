
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import { ArrowRight, BarChart2, Calculator, LifeBuoy, Wind, Sun, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <div className="pt-16">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <section className="section-container">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl font-bold mb-4">Innovative Energy Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our suite of tools designed to help you understand and leverage renewable energy solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Interactive Dashboard"
              description="View real-time energy production, carbon offsets, and regional data visualizations."
              icon={BarChart2}
              delay={100}
            />
            <FeatureCard
              title="Energy Calculator"
              description="Calculate potential solar output, wind generation, and energy savings for your location."
              icon={Calculator}
              delay={200}
            />
            <FeatureCard
              title="Expert Insights"
              description="Access reports and analysis from renewable energy experts and researchers."
              icon={LifeBuoy}
              delay={300}
            />
          </div>
        </section>

        {/* Energy Solutions Section */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 reveal">
                <div className="inline-block px-3 py-1 mb-6 rounded-full bg-energy-blue/10 text-energy-blue text-sm font-medium">
                  Clean Energy Solutions
                </div>
                <h2 className="text-3xl font-bold mb-6">
                  Explore Renewable Options for Your Needs
                </h2>
                <p className="text-muted-foreground mb-6">
                  Whether you're interested in solar panels for your home, wind energy for commercial use, or improving energy efficiency, we provide the tools and data you need to make informed decisions.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Sun className="h-5 w-5 text-energy-yellow" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Solar Energy</h3>
                      <p className="text-muted-foreground">
                        Harness the power of the sun with solar panels designed for residential and commercial use.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Wind className="h-5 w-5 text-energy-blue" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Wind Power</h3>
                      <p className="text-muted-foreground">
                        Generate clean electricity from wind with turbines suitable for various locations and needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Zap className="h-5 w-5 text-energy-green" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Energy Efficiency</h3>
                      <p className="text-muted-foreground">
                        Optimize your energy usage with smart solutions that reduce consumption and costs.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/calculator" className="btn-primary inline-flex items-center">
                    Calculate Your Potential
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="order-1 lg:order-2 reveal-slow">
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden card-glass">
                    <div className="h-full w-full bg-gradient-to-br from-energy-blue/10 via-energy-green/10 to-energy-yellow/10 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="flex justify-center space-x-4 mb-6">
                          <div className="w-16 h-16 rounded-full bg-energy-yellow/20 flex items-center justify-center">
                            <Sun className="h-8 w-8 text-energy-yellow" />
                          </div>
                          <div className="w-16 h-16 rounded-full bg-energy-blue/20 flex items-center justify-center">
                            <Wind className="h-8 w-8 text-energy-blue" />
                          </div>
                          <div className="w-16 h-16 rounded-full bg-energy-green/20 flex items-center justify-center">
                            <Zap className="h-8 w-8 text-energy-green" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Integrated Energy Solutions</h3>
                        <p className="text-muted-foreground">
                          Combining multiple renewable sources for optimal results
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-energy-green/30 filter blur-xl"></div>
                  <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-energy-blue/20 filter blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-container">
          <div className="card-glass rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="reveal">
                <h2 className="text-3xl font-bold mb-4">Ready to Explore Renewable Energy?</h2>
                <p className="text-muted-foreground mb-6">
                  Start with our interactive dashboard to see real-time data or use our calculator to estimate your potential energy production and savings.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/dashboard" className="btn-primary">
                    View Dashboard
                  </Link>
                  <Link to="/calculator" className="btn-secondary">
                    Try Calculator
                  </Link>
                </div>
              </div>
              <div className="reveal-slow">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-energy-green/20 to-energy-blue/20 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <BarChart2 className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold">Interactive Data Visualizations</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
