
// Mock data for development (to be replaced with actual API calls)
const MOCK_DASHBOARD_DATA = {
  solarProduction: {
    value: "14,285 kWh",
    trend: "up",
    trendValue: "12% from last month",
    chartData: [890, 950, 1100, 1250, 1350, 1450, 1500, 1420, 1300, 1150, 950, 875]
  },
  windProduction: {
    value: "8,756 kWh",
    trend: "down",
    trendValue: "8% from last month",
    chartData: [720, 650, 700, 680, 720, 780, 820, 900, 850, 750, 680, 650]
  },
  carbonOffset: {
    value: "16.2 tons",
    trend: "up",
    trendValue: "5% from last month",
    chartData: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1]
  },
  energyMix: {
    solar: 42,
    wind: 28,
    hydro: 15,
    biomass: 8,
    geothermal: 5,
    other: 2
  }
};

const MOCK_CALCULATOR_RESULTS = {
  solar: {
    annualProduction: 12500,
    co2Reduction: 8.7,
    savingsEstimate: 1875,
    paybackPeriod: 8
  },
  wind: {
    annualProduction: 18700,
    co2Reduction: 13.2,
    savingsEstimate: 2805,
    paybackPeriod: 12
  },
  efficiency: {
    potentialSavings: 950,
    co2Reduction: 3.2,
    recommendations: [
      "Upgrade to energy-efficient appliances",
      "Improve insulation in attic and walls",
      "Install smart thermostats and lighting controls",
      "Replace single-pane windows with double-glazed models"
    ]
  }
};

// Dashboard data fetching
export const fetchDashboardData = async () => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DASHBOARD_DATA);
    }, 1500);
  });
};

// Calculator APIs
export const calculateSolarPotential = async (formData: any) => {
  // Simulating API call - in production, this would call NREL PVWatts API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CALCULATOR_RESULTS.solar);
    }, 2000);
  });
};

export const calculateWindPotential = async (formData: any) => {
  // Simulating API call - in production, this would call a wind energy API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CALCULATOR_RESULTS.wind);
    }, 2000);
  });
};

export const calculateEfficiencyImprovements = async (formData: any) => {
  // Simulating API call - in production, this would call a efficiency API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CALCULATOR_RESULTS.efficiency);
    }, 2000);
  });
};
