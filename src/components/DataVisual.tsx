
import { ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

interface DataVisualProps {
  title: string;
  value?: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string | number;
  isLoading?: boolean;
  chart?: ReactNode;
}

const DataVisual = ({ title, value, trend, trendValue, isLoading = false, chart }: DataVisualProps) => {
  return (
    <div className="card-glass rounded-xl p-6 h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          <div className="h-10 bg-muted/30 rounded-md animate-pulse w-1/2"></div>
          <div className="h-40 bg-muted/20 rounded-md animate-pulse"></div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="text-3xl font-bold">{value}</div>
            {trend && trendValue && (
              <div className={`flex items-center mt-1 text-sm ${
                trend === "up" ? "text-energy-green" : 
                trend === "down" ? "text-destructive" : 
                "text-muted-foreground"
              }`}>
                {trend === "up" && <ArrowUp className="h-4 w-4 mr-1" />}
                {trend === "down" && <ArrowDown className="h-4 w-4 mr-1" />}
                {trendValue}
              </div>
            )}
          </div>
          
          {chart && (
            <div>
              {chart}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DataVisual;
