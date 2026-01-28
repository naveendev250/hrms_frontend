# HRMS Lite - Frontend

Frontend application for HRMS Lite (Human Resource Management System) built with React and Vite.

## Tech Stack

- Framework: React 19
- Build Tool: Vite 7
- Styling: Chakra UI
- HTTP Client: Fetch API

## Project Structure

```
hrms_ui/
├── src/
│   ├── components/      - Reusable UI components
│   ├── pages/           - Page components (Dashboard, Employees, Attendance)
│   ├── services/        - API service layer
│   ├── App.jsx          - Main app component
│   ├── main.jsx         - Entry point
│   └── index.css        - Global styles
├── public/
├── index.html
├── vite.config.js
└── package.json
```

## Features

### Dashboard
- Overview statistics
- Total employees count
- Total attendance records
- Today's present/absent count

### Employee Management
- View all employees
- Add new employee
- Delete employee
- Clean table layout with department badges

### Attendance Management
- Mark attendance (Present/Absent)
- View all attendance records
- Filter by employee
- Filter attendance records by date
- View individual employee attendance details
- Track total present/absent days per employee

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a .env file in the root directory:

```env
VITE_API_URL=https://hrms-backend-1-gd3i.onrender.com or http://localhost:8000
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at: http://localhost:5173 or :5174

### 4. Build for Production

```bash
npm run build
```

The production build will be created in the dist directory.

### 5. Preview Production Build

```bash
npm run preview
```

## UI Components

### Reusable Components
- Navbar: Navigation with page switching
- Loading: Loading spinner with message
- EmptyState: Empty state placeholder
- ErrorMessage: Error display with retry option
- Modal: Modal dialog for forms

### Pages
- Dashboard: Overview and statistics
- Employees: Employee CRUD operations
- Attendance: Attendance marking and viewing

## Design Features

- Responsive Design: Works on desktop, tablet, and mobile
- Professional UI: Clean, modern interface
- Consistent Styling: With chakra ui
- Smooth Animations: Fade-in effects and transitions
- Loading States: Shows loading spinners during API calls
- Error Handling: User-friendly error messages
- Empty States: Informative placeholders when no data

## API Integration

The frontend connects to the backend API through the service layer (src/services/api.js):

- employeeAPI: Employee operations
- attendanceAPI: Attendance operations

All API calls include proper error handling and loading states.

## Deployment on Vercel

### Option 1: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Import your repository on Vercel
3. Configure build settings:
   - Framework Preset: Vite
   - Build Command: npm run build
   - Output Directory: dist
4. Add environment variable:
   - VITE_API_URL: backend API URL

## Environment Variables

- VITE_API_URL: Backend API base URL (default: http://localhost:8000)


