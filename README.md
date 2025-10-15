# AI Dashboard Frontend

A modern, responsive React frontend for the AI Dashboard application built with Vite, Tailwind CSS, and Framer Motion.

## Features

- 🚀 **Modern React 18** with Vite for fast development
- 🎨 **Tailwind CSS** with custom dark blue theme
- ✨ **Framer Motion** for smooth animations
- 🧠 **AI Analysis Dashboard** with multiple domain support
- 📱 **Responsive Design** for all screen sizes
- 🔄 **Real-time API Integration** with FastAPI backend
- 🎯 **Interactive UI** with glowing effects and smooth transitions

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Backend Integration**: FastAPI (http://127.0.0.1:8000)

## Project Structure

```
src/
├── api/
│   └── metrics.js          # API service for backend communication
├── components/
│   ├── Navbar.jsx          # Top navigation bar
│   ├── Loader.jsx          # Animated loading component
│   ├── ResultCard.jsx      # Result display component
│   └── DomainSelector.jsx  # Domain selection component
├── pages/
│   ├── LandingPage.jsx     # Landing page with hero section
│   ├── DashboardPage.jsx   # Main dashboard for analysis
│   └── AboutPage.jsx       # About page with features
├── App.jsx                 # Main app component with routing
├── main.jsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- FastAPI backend running on http://127.0.0.1:8000

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

The frontend is configured to communicate with the FastAPI backend at `http://127.0.0.1:8000`. The Vite configuration includes a proxy setup for seamless API calls.

### Available Endpoints

- `GET /api/health` - Health check
- `POST /api/metrics` - Submit analysis metrics
- `POST /api/ai` - AI-powered analysis
- `POST /api/geo` - Geographic data analysis
- `POST /api/analysis` - General data analysis

## Features Overview

### Landing Page
- Hero section with animated logo and call-to-action
- Feature showcase with smooth animations
- Modern gradient backgrounds and glowing effects

### Dashboard
- Domain selection (AI, GEO, Health, Analysis)
- Text prompt input with validation
- Real-time analysis with animated loader
- Result display with error handling
- Quick start examples

### About Page
- Technology stack information
- Feature descriptions
- API endpoint documentation
- Statistics and metrics

## Styling

The application uses a custom dark blue theme with:
- **Primary Colors**: Navy blue backgrounds (#1e1b4b to #312e81)
- **Accent Colors**: Cyan highlights (#22d3ee to #06b6d4)
- **Interactive Elements**: Glowing buttons and hover effects
- **Animations**: Smooth transitions and floating elements

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Customization

- **Colors**: Modify `tailwind.config.js` for theme customization
- **Animations**: Update Framer Motion configurations in components
- **API**: Change backend URL in `src/api/metrics.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the WebMind Innovation Hackathon Track 1.