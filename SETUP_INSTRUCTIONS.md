# AI Dashboard Frontend - Setup Instructions

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- FastAPI backend running on `http://127.0.0.1:8000`

### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Or use the batch file on Windows:
   ```bash
   start.bat
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── api/
│   └── metrics.js          # Backend API integration
├── components/
│   ├── Navbar.jsx          # Top navigation
│   ├── Loader.jsx          # Animated loading spinner
│   ├── ResultCard.jsx      # Result display component
│   └── DomainSelector.jsx  # Domain selection UI
├── pages/
│   ├── LandingPage.jsx     # Hero landing page
│   ├── DashboardPage.jsx   # Main analysis dashboard
│   └── AboutPage.jsx       # Features and info
├── App.jsx                 # Main app with routing
├── main.jsx               # React entry point
└── index.css              # Global styles
```

## 🎨 Features Implemented

### ✅ Landing Page
- Animated hero section with glowing logo
- Feature showcase with smooth animations
- Call-to-action button to dashboard
- Modern gradient backgrounds

### ✅ Dashboard Page
- Domain selection (AI, GEO, Health, Analysis)
- Text prompt input with validation
- Real-time API integration
- Animated loader during processing
- Result display with error handling
- Quick start examples

### ✅ Navigation
- Responsive top navbar
- Active page highlighting
- Smooth transitions

### ✅ Styling & Animations
- Dark blue theme with cyan accents
- Framer Motion animations throughout
- Glowing interactive buttons
- Smooth hover effects
- Responsive design

## 🔧 API Integration

The frontend is configured to communicate with your FastAPI backend:

- **Base URL**: `http://127.0.0.1:8000`
- **Proxy**: Vite dev server proxies `/api/*` to backend
- **Endpoints**:
  - `GET /api/health` - Health check
  - `POST /api/metrics` - Submit analysis
  - `POST /api/ai` - AI analysis
  - `POST /api/geo` - Geographic analysis
  - `POST /api/analysis` - General analysis

## 🎯 Usage

1. **Start Analysis**: Click "Start Analysis" on landing page
2. **Select Domain**: Choose from AI, GEO, Health, or Analysis
3. **Enter Prompt**: Type your analysis request
4. **Submit**: Click "Analyze" to process
5. **View Results**: See animated results with metadata

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Customization
- **Colors**: Edit `tailwind.config.js`
- **Animations**: Modify Framer Motion configs
- **API URL**: Change in `src/api/metrics.js`

## 🚀 Production Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Serve the `dist` folder** with any static file server

3. **Ensure backend CORS** allows your frontend domain

## 🎨 Theme Colors

- **Background**: Navy blue gradients (#1e1b4b to #312e81)
- **Accent**: Cyan highlights (#22d3ee to #06b6d4)
- **Cards**: Semi-transparent navy with cyan borders
- **Text**: White with cyan accents

## ✨ Animations

- Smooth page transitions
- Floating background elements
- Glowing button effects
- Loading spinners
- Hover animations
- Scale effects on interaction

The frontend is now ready to use with your FastAPI backend! 🎉
