import { useState } from "react";
import Layout from "@/components/Layout";
import CalculatorForm from "@/components/CalculatorForm";
import { calculateSolarPotential, calculateWindPotential, calculateEfficiencyImprovements } from "@/utils/api";
import { saveCalculationHistory } from "@/utils/calculatorHistory";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, CheckCircle, Sun, Wind, Lightbulb, Calculator as CalculatorIcon } from "lucide-react";

const Calculator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [calculationResults, setCalculationResults] = useState<any>(null);
  const [calculatorType, setCalculatorType] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCalculate = async (formData: any) => {
    try {
      setIsLoading(true);
      setCalculatorType(formData.calculatorType);
      
      let results;
      switch (formData.calculatorType) {
        case "solar":
          results = await calculateSolarPotential(formData);
          break;
        case "wind":
          results = await calculateWindPotential(formData);
          break;
        case "efficiency":
          results = await calculateEfficiencyImprovements(formData);
          break;
        default:
          throw new Error("Invalid calculator type");
      }
      
      setCalculationResults(results);
      
      const saved = await saveCalculationHistory(formData.calculatorType, formData, results);
      if (saved) {
        toast({
          title: "Calculation saved",
          description: "This result has been saved to your history",
        });
      }
    } catch (error) {
      console.error("Calculation error:", error);
      toast({
        title: "Calculation error",
        description: "There was an error processing your request",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatEnergyProduction = (value: number) => {
    return `${value.toLocaleString()} kWh`;
  };

  const formatCO2Reduction = (value: number) => {
    return `${value.toLocaleString()} tons`;
  };

  const formatMoney = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <Layout>
      <div className="pt-20 pb-16">
        <div className="section-container">
          <div className="mb-8 reveal">
            <h1 className="text-3xl font-bold mb-2">Green Energy Calculator</h1>
            <p className="text-muted-foreground max-w-2xl">
              Estimate the potential energy production, cost savings, and environmental impact of different renewable energy solutions for your specific location.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="reveal">
              <CalculatorForm onCalculate={handleCalculate} isLoading={isLoading} />
            </div>

            <div className="reveal-slow">
              {calculationResults ? (
                <div className="card-glass rounded-xl p-6 h-full">
                  <div className="mb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                      <CheckCircle className="h-4 w-4 mr-1.5" />
                      Results
                    </div>
                    <h2 className="text-2xl font-bold mb-1">
                      {calculatorType === "solar" && "Solar Energy Potential"}
                      {calculatorType === "wind" && "Wind Energy Potential"}
                      {calculatorType === "efficiency" && "Energy Efficiency Analysis"}
                    </h2>
                    <p className="text-muted-foreground">
                      {calculatorType === "solar" && "Estimated production and benefits from solar panels"}
                      {calculatorType === "wind" && "Estimated production and benefits from wind turbines"}
                      {calculatorType === "efficiency" && "Potential energy savings and efficiency improvements"}
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-primary/5 rounded-lg p-5 border border-primary/10">
                      <div className="flex items-start">
                        <div className="rounded-full p-2 bg-primary/10 mr-4">
                          {calculatorType === "solar" && <Sun className="h-6 w-6 text-primary" />}
                          {calculatorType === "wind" && <Wind className="h-6 w-6 text-primary" />}
                          {calculatorType === "efficiency" && <Lightbulb className="h-6 w-6 text-primary" />}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {calculatorType === "solar" && "Annual Energy Production"}
                            {calculatorType === "wind" && "Annual Energy Production"}
                            {calculatorType === "efficiency" && "Potential Annual Savings"}
                          </p>
                          <div className="text-3xl font-bold">
                            {calculatorType === "solar" && formatEnergyProduction(calculationResults.annualProduction)}
                            {calculatorType === "wind" && formatEnergyProduction(calculationResults.annualProduction)}
                            {calculatorType === "efficiency" && formatMoney(calculationResults.potentialSavings)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-muted/20 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">CO₂ Reduction</p>
                        <div className="text-xl font-semibold">
                          {formatCO2Reduction(calculationResults.co2Reduction)}
                        </div>
                      </div>

                      {(calculatorType === "solar" || calculatorType === "wind") && (
                        <div className="bg-muted/20 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground mb-1">Annual Savings</p>
                          <div className="text-xl font-semibold">
                            {formatMoney(calculationResults.savingsEstimate)}
                          </div>
                        </div>
                      )}

                      {(calculatorType === "solar" || calculatorType === "wind") && (
                        <div className="bg-muted/20 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground mb-1">Payback Period</p>
                          <div className="text-xl font-semibold">
                            {calculationResults.paybackPeriod} years
                          </div>
                        </div>
                      )}

                      {calculatorType === "efficiency" && calculationResults.recommendations && (
                        <div className="bg-muted/20 rounded-lg p-4 sm:col-span-2">
                          <p className="text-sm text-muted-foreground mb-2">Recommendations</p>
                          <ul className="space-y-1">
                            {calculationResults.recommendations.map((rec: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-energy-green mr-2 mt-0.5 flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="pt-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#" className="btn-primary inline-flex items-center justify-center">
                          Get Detailed Report
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                        <a href="#" className="btn-secondary inline-flex items-center justify-center">
                          Connect with Expert
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card-glass rounded-xl p-6 h-full flex flex-col justify-center items-center text-center">
                  <div className="max-w-md">
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mx-auto">
                        <CalculatorIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ready to Calculate</h3>
                    <p className="text-muted-foreground mb-6">
                      Fill out the form to calculate your renewable energy potential and discover how much you could save.
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-energy-green/20 flex items-center justify-center mb-2">
                          <Sun className="h-5 w-5 text-energy-green" />
                        </div>
                        <span className="text-sm">Solar</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-energy-blue/20 flex items-center justify-center mb-2">
                          <Wind className="h-5 w-5 text-energy-blue" />
                        </div>
                        <span className="text-sm">Wind</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-energy-yellow/20 flex items-center justify-center mb-2">
                          <Lightbulb className="h-5 w-5 text-energy-yellow" />
                        </div>
                        <span className="text-sm">Efficiency</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Our calculator uses data from NREL, OpenWeatherMap, and other reliable sources to provide accurate estimates.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-16 reveal">
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Calculation Methodology</h2>
              <p className="text-muted-foreground mb-6">
                Our green energy calculator uses advanced algorithms and real-world data to provide accurate estimates. Here's how we calculate each type of renewable energy potential:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-muted/10 rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-energy-green/20 flex items-center justify-center mr-3">
                      <Sun className="h-5 w-5 text-energy-green" />
                    </div>
                    <h3 className="text-lg font-semibold">Solar Energy</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-energy-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Uses NREL PVWatts API to calculate solar potential based on location</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-energy-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Accounts for roof area, panel efficiency, and local solar irradiance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-energy-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Estimates CO₂ reduction based on local grid carbon intensity</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-muted/10 rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-energy-blue/20 flex items-center justify-center mr-3">
                      <Wind className="h-5 w-5 text-energy-blue" />
                    </div>
                    <h3 className="text-lg font-semibold">Wind Energy</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-energy-blue mr-2 mt-0.5 flex-shrink-0" />
                      <span>Analyzes local wind patterns using weather data APIs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-energy-blue mr-2 mt-0.5 flex-shrink-0" />
                      <span>Considers turbine height, type, and local terrain factors</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-energy-blue mr-2 mt-0.5 flex-shrink-0" />
                      <span>Calculates payback period based on installation costs and energy savings</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-muted/10 rounded-lg p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-energy-yellow/20 flex items-center justify-center mr-3">
                      <Lightbulb className="h-5 w-5 text-energy-yellow" />
                    </div>
                    <h3 className="text-lg font-semibold">Energy Efficiency</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-energy-yellow mr-2 mt-0.5 flex-shrink-0" />
                      <span>Evaluates current energy consumption patterns</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-energy-yellow mr-2 mt-0.5 flex-shrink-0" />
                      <span>Identifies potential areas for improvement based on regional data</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-energy-yellow mr-2 mt-0.5 flex-shrink-0" />
                      <span>Provides tailored recommendations for reducing energy usage</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>
                  Note: All calculations are estimates based on available data and industry standards. Actual results may vary based on specific local conditions, equipment quality, and installation practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
