import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import DataVisual from "@/components/DataVisual";
import { fetchDashboardData } from "@/utils/api";
import { BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface EnergyMixEntry {
  name: string;
  value: number;
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const getSolarChartData = () => {
    if (!dashboardData?.solarProduction?.chartData) return [];
    
    return dashboardData.solarProduction.chartData.map((value: number, index: number) => ({
      name: monthNames[index],
      value,
    }));
  };

  const getWindChartData = () => {
    if (!dashboardData?.windProduction?.chartData) return [];
    
    return dashboardData.windProduction.chartData.map((value: number, index: number) => ({
      name: monthNames[index],
      value,
    }));
  };

  const getCarbonOffsetData = () => {
    if (!dashboardData?.carbonOffset?.chartData) return [];
    
    return dashboardData.carbonOffset.chartData.map((value: number, index: number) => ({
      name: monthNames[index],
      value,
    }));
  };

  const getEnergyMixData = (): EnergyMixEntry[] => {
    if (!dashboardData?.energyMix) return [];
    
    return Object.entries(dashboardData.energyMix).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: value as number,
    }));
  };

  const ENERGY_MIX_COLORS = [
    "#10B981", // Green - Solar
    "#0EA5E9", // Blue - Wind
    "#06B6D4", // Cyan - Hydro
    "#84CC16", // Lime - Biomass
    "#EAB308", // Yellow - Geothermal
    "#94A3B8", // Gray - Other
  ];

  return (
    <Layout>
      <div className="pt-20 pb-16">
        <div className="section-container">
          <div className="mb-8 reveal">
            <h1 className="text-3xl font-bold mb-2">Renewable Energy Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time data on renewable energy production and carbon offset metrics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="reveal animate-delay-100">
              <DataVisual
                title="Solar Energy Production"
                value={dashboardData?.solarProduction?.value}
                trend={dashboardData?.solarProduction?.trend}
                trendValue={dashboardData?.solarProduction?.trendValue}
                isLoading={isLoading}
                chart={
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={getSolarChartData()}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "0.5rem",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                        }}
                      />
                      <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                }
              />
            </div>

            <div className="reveal animate-delay-200">
              <DataVisual
                title="Wind Energy Production"
                value={dashboardData?.windProduction?.value}
                trend={dashboardData?.windProduction?.trend}
                trendValue={dashboardData?.windProduction?.trendValue}
                isLoading={isLoading}
                chart={
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={getWindChartData()}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "0.5rem",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                        }} 
                      />
                      <Bar dataKey="value" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                }
              />
            </div>

            <div className="reveal animate-delay-300">
              <DataVisual
                title="Carbon Offset"
                value={dashboardData?.carbonOffset?.value}
                trend={dashboardData?.carbonOffset?.trend}
                trendValue={dashboardData?.carbonOffset?.trendValue}
                isLoading={isLoading}
                chart={
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={getCarbonOffsetData()}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "0.5rem",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                        }} 
                      />
                      <Bar dataKey="value" fill="#84CC16" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                }
              />
            </div>
          </div>

          <div className="mb-8 reveal">
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Renewable Energy Mix</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <div>
                  {isLoading ? (
                    <div className="h-72 bg-muted/20 rounded-md animate-pulse"></div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={getEnergyMixData()}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {getEnergyMixData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={ENERGY_MIX_COLORS[index % ENERGY_MIX_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, "Percentage"]}
                          contentStyle={{ 
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "0.5rem",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                          }} 
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">Energy Source Distribution</h3>
                  <p className="text-muted-foreground mb-4">
                    The chart shows the distribution of different renewable energy sources in the current energy production mix.
                  </p>
                  
                  {isLoading ? (
                    <div className="space-y-2">
                      <div className="h-6 bg-muted/30 rounded-md animate-pulse"></div>
                      <div className="h-6 bg-muted/30 rounded-md animate-pulse w-3/4"></div>
                      <div className="h-6 bg-muted/30 rounded-md animate-pulse w-1/2"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {getEnergyMixData().map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: ENERGY_MIX_COLORS[index] }}
                          ></div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">{item.name}</span>
                              <span className="text-sm font-medium">{item.value}%</span>
                            </div>
                            <div className="w-full bg-muted/30 rounded-full h-1.5">
                              <div 
                                className="h-1.5 rounded-full" 
                                style={{ 
                                  width: `${item.value}%`, 
                                  backgroundColor: ENERGY_MIX_COLORS[index] 
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 reveal">
            <div className="card-glass rounded-xl p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl font-semibold mb-2 sm:mb-0">Regional Energy Data</h2>
                <div className="flex space-x-2">
                  <select className="input-field text-xs h-8 px-2">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>Last Year</option>
                  </select>
                  <select className="input-field text-xs h-8 px-2">
                    <option>All Regions</option>
                    <option>North</option>
                    <option>South</option>
                    <option>East</option>
                    <option>West</option>
                  </select>
                </div>
              </div>
              
              {isLoading ? (
                <div className="h-80 bg-muted/20 rounded-md animate-pulse"></div>
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={[
                      { name: "North", solar: 45, wind: 32, hydro: 18 },
                      { name: "South", solar: 53, wind: 24, hydro: 12 },
                      { name: "East", solar: 39, wind: 36, hydro: 22 },
                      { name: "West", solar: 47, wind: 29, hydro: 19 },
                      { name: "Central", solar: 42, wind: 31, hydro: 25 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "0.5rem",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="solar" fill="#10B981" name="Solar" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="wind" fill="#0EA5E9" name="Wind" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="hydro" fill="#06B6D4" name="Hydro" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="reveal">
            <div className="card-glass rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Data Sources</h2>
              <p className="text-muted-foreground mb-4">
                This dashboard integrates data from the following trusted sources:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-energy-green/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-medium text-energy-green">1</span>
                  </div>
                  <div>
                    <span className="font-medium">US Energy Information Administration (EIA) API</span>
                    <p className="text-sm text-muted-foreground">Real-time and historical energy production data</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-energy-blue/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-medium text-energy-blue">2</span>
                  </div>
                  <div>
                    <span className="font-medium">National Renewable Energy Laboratory (NREL) API</span>
                    <p className="text-sm text-muted-foreground">Solar energy and PV system performance data</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-energy-yellow/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-medium text-energy-yellow">3</span>
                  </div>
                  <div>
                    <span className="font-medium">Climatiq API</span>
                    <p className="text-sm text-muted-foreground">Carbon offset calculations and environmental impact data</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-medium">4</span>
                  </div>
                  <div>
                    <span className="font-medium">OpenWeatherMap Solar Panel Energy API</span>
                    <p className="text-sm text-muted-foreground">Weather conditions affecting renewable energy production</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
