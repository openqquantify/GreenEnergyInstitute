
import { useState } from "react";
import { Check } from "lucide-react";

interface CalculatorFormProps {
  onCalculate: (data: any) => void;
  isLoading: boolean;
}

const CalculatorForm = ({ onCalculate, isLoading }: CalculatorFormProps) => {
  const [calculatorType, setCalculatorType] = useState<"solar" | "wind" | "efficiency">("solar");
  const [formData, setFormData] = useState({
    address: "",
    roofArea: "100",
    efficiency: "20",
    consumption: "500",
    turbineHeight: "20",
    turbineModel: "residential",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({ ...formData, calculatorType });
  };

  return (
    <div className="card-glass rounded-xl p-6">
      <div className="mb-6">
        <div className="flex space-x-2 mb-4">
          <button
            type="button"
            onClick={() => setCalculatorType("solar")}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
              calculatorType === "solar"
                ? "bg-primary text-white"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Solar Energy
          </button>
          <button
            type="button"
            onClick={() => setCalculatorType("wind")}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
              calculatorType === "wind"
                ? "bg-primary text-white"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Wind Energy
          </button>
          <button
            type="button"
            onClick={() => setCalculatorType("efficiency")}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
              calculatorType === "efficiency"
                ? "bg-primary text-white"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Efficiency
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Location
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address or city"
              className="input-field w-full"
              required
            />
          </div>

          {calculatorType === "solar" && (
            <>
              <div>
                <label htmlFor="roofArea" className="block text-sm font-medium mb-1">
                  Roof Area (m²)
                </label>
                <input
                  id="roofArea"
                  name="roofArea"
                  type="number"
                  value={formData.roofArea}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  min="1"
                  required
                />
              </div>
              <div>
                <label htmlFor="efficiency" className="block text-sm font-medium mb-1">
                  Panel Efficiency (%)
                </label>
                <input
                  id="efficiency"
                  name="efficiency"
                  type="number"
                  value={formData.efficiency}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  min="1"
                  max="30"
                  required
                />
              </div>
            </>
          )}

          {calculatorType === "wind" && (
            <>
              <div>
                <label htmlFor="turbineHeight" className="block text-sm font-medium mb-1">
                  Turbine Height (m)
                </label>
                <input
                  id="turbineHeight"
                  name="turbineHeight"
                  type="number"
                  value={formData.turbineHeight}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  min="5"
                  required
                />
              </div>
              <div>
                <label htmlFor="turbineModel" className="block text-sm font-medium mb-1">
                  Turbine Type
                </label>
                <select
                  id="turbineModel"
                  name="turbineModel"
                  value={formData.turbineModel}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  required
                >
                  <option value="residential">Residential (small)</option>
                  <option value="commercial">Commercial (medium)</option>
                  <option value="industrial">Industrial (large)</option>
                </select>
              </div>
            </>
          )}

          {calculatorType === "efficiency" && (
            <div>
              <label htmlFor="consumption" className="block text-sm font-medium mb-1">
                Monthly Energy Consumption (kWh)
              </label>
              <input
                id="consumption"
                name="consumption"
                type="number"
                value={formData.consumption}
                onChange={handleInputChange}
                className="input-field w-full"
                min="1"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full py-3 mt-2 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" /> Calculate Results
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm;
