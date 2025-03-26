
# Green Energy Institute

This application showcases renewable energy solutions and provides tools for calculating energy potential for solar and wind installations.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🏠 **Home Page**: Overview of the Green Energy Institute and its mission
- 📊 **Dashboard**: Visualize energy production and usage statistics
- 🧮 **Calculator**: Tools to estimate energy potential for solar/wind installations
- 👤 **User Authentication**: Register and sign in to save your calculations and preferences
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Screenshots

| Home | Dashboard | Calculator |
|---------|---------|---------|
| ![Screenshot 2025-03-08 163605](https://github.com/user-attachments/assets/9b79423d-d1bd-4d17-9750-68ecb955b88c) | ![Screenshot 2025-03-08 163640](https://github.com/user-attachments/assets/99707e46-9a8e-4613-846c-b63e162df442) | ![Screenshot 2025-03-08 163706](https://github.com/user-attachments/assets/b3754562-8f43-4cd8-bfd9-e8b564383d90) |


## Installation


You will need to change these two files:

1. Go to src/integrations/supabase to the clients.ts file. Enter the "SUPABASE_URL" and "SUPABASE_PUBLISHABLE_KEY"
2. Go to supabase/config.toml. Enter the "project_id"

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/TTSouth/green-energy-institute.git

# Navigate to the project directory
cd green-energy-institute

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at http://localhost:8080

## Usage

### Dashboard

The dashboard provides a visual representation of energy data including:
- Solar production statistics
- Wind production statistics
- Carbon offset calculations
- Energy mix breakdown

### Energy Calculator

Use the calculator to:
1. Input your location details
2. Specify available installation area
3. View estimated energy production
4. See potential CO2 reduction
5. Calculate financial savings and ROI

### Authentication

- **Register**: Create a new account to save your calculations and preferences
- **Sign In**: Access your saved data and personalized dashboard

## Technologies

This project is built with modern web technologies:

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom theming
- **UI Components**: shadcn/ui
- **Data Visualization**: Recharts
- **Routing**: React Router
- **State Management**: React Query
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Application pages
├── utils/              # Utility functions
├── lib/                # Shared libraries and helpers
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Deployment

Build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, ready to be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact Tanya Thomas at contact@TanyaDThomas.com.
