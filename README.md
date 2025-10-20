# Patient Management System

A modern, responsive patient management application built with React, TypeScript, and Vite. This application allows healthcare professionals to manage patient records with features like adding, editing, deleting, and searching patients.

## Features

- **Patient Management**: Add, edit, and delete patient records
- **Real-time Search**: Filter patients by name or description
- **Image Upload**: Upload and manage patient profile images
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Form Validation**: Comprehensive error handling and validation
- **Toast Notifications**: User-friendly success and error messages

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with modern features
- **State Management**: React Context API
- **Routing**: React Router DOM
- **UI Components**: Custom components with Radix UI primitives
- **Code Quality**: ESLint + Prettier
- **Icons**: FontAwesome

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher)

You can check your versions by running:
```bash
node --version
npm --version
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/malks14/lightit-challenge.git
cd lightit-challenge
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
VITE_BASE_URL=https://63bedcf7f5cfc0949b634fc8.mockapi.io
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── PatientCard/     # Patient card component
│   ├── PatientForm/     # Patient form component
│   ├── ReusableModal/   # Modal component
│   ├── Toast/          # Toast notification component
│   ├── Navigation/      # Navigation components
│   └── UI/             # General UI components
├── pages/              # Page components
│   └── Home/           # Home page with patient list
├── store/              # Context and state management
│   └── PatientsContext.tsx
├── types/              # TypeScript type definitions
│   └── patients.ts
├── assets/             # Static assets
├── routes/             # Routing configuration
└── App.tsx            # Main application component
```

## Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint
- **`npm run lint:fix`** - Run ESLint with auto-fix
- **`npm run format`** - Format code with Prettier
- **`npm run format:check`** - Check code formatting

## Development Workflow

### Code Quality

This project uses ESLint and Prettier for code quality:

```bash

npm run lint


npm run lint:fix


npm run format


npm run format:check
```

### Recommended VS Code Extensions

- **ESLint** - For linting
- **Prettier** - For code formatting
- **TypeScript Importer** - For auto-imports
- **Auto Rename Tag** - For HTML/JSX tags

## Features Overview

### Patient Management
- **Add Patients**: Create new patient records with validation
- **Edit Patients**: Update existing patient information
- **Delete Patients**: Remove patients with confirmation modal
- **View Details**: Expandable patient cards with additional information

### Search & Filter
- **Real-time Search**: Filter patients as you type
- **Multi-field Search**: Search by name or description
- **Clear Search**: Easy search reset functionality

### Image Management
- **File Upload**: Upload patient profile images
- **Image Preview**: See uploaded images before saving
- **Fallback Images**: Automatic placeholder for missing images
- **Image Validation**: File type and size validation

## Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

**2. Module Not Found Errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

**3. TypeScript Errors**
```bash
npx tsc --noEmit
```

**4. ESLint Errors**
```bash
npm run lint:fix
```

## 🌐 API Integration

The application integrates with a mock API for patient data:

- **Base URL**: `https://63bedcf7f5cfc0949b634fc8.mockapi.io`
- **Endpoint**: `/users`
- **Methods**: GET

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


## Design Decisions & Architecture

### Layout & Navigation
- **Fixed Navigation**: The search filter is positioned at the top and remains fixed during scrolling, ensuring users can always access search functionality without scrolling back to the top. This improves user experience when dealing with large patient lists.

### Patient Cards Design
- **Minimal Information Display**: Cards show only essential information (name, basic description) to allow quick patient recognition without overwhelming the interface.
- **Progressive Disclosure**: The "View more" CTA reveals additional patient details (website, ID, creation date) when needed, maintaining a clean initial view while providing access to complete information.
- **Ellipsis Menu**: Implemented a three-dot menu in the top-right corner of each card, following established UI patterns that users are already familiar with from other applications.

### Component Architecture

#### Reusable Components
- **DropdownMenu**: Created as a reusable component that can be used across the application. Functions are passed as props, making it flexible for different use cases without code duplication.
- **ReusableModal & Backdrop**: Centralized modal management with consistent z-index handling. Changes to modal behavior only need to be made in one place, ensuring consistency across the application.
- **Unified Form Component**: Single `PatientForm` component handles both creating and editing patients since they require the same data fields. The component adapts its behavior based on whether a `patient` prop is provided.

#### Layout System
- **Flexbox over CSS Grid**: Chose Flexbox for the patient cards layout because cards are expandable. CSS Grid would force all cards in the same row to match the height of the tallest card, creating unwanted blank space when some cards are expanded and others are not.

### State Management
- **React Context API**: Implemented `PatientsContext` for centralized state management with two key benefits:
  1. **Single Source of Truth**: All patient data is managed in one place, preventing inconsistencies
  2. **Cross-Component Access**: State can be easily accessed by any component in the application without prop drilling

### UI Libraries & Tools
- **Radix UI**: Used exclusively for toast notifications (`@radix-ui/react-toast`). This choice provides accessible, well-tested toast functionality without adding unnecessary UI library dependencies.
- **Custom Components**: Built all other UI components from scratch to maintain full control over styling and behavior, ensuring they perfectly match the application's design requirements.

### Code Quality
- **TypeScript**: Provides type safety and better developer experience
- **ESLint**: Enforces coding standards and catches potential issues
- **Prettier**: Ensures consistent code formatting across the project
- **FontAwesome**: Provides consistent, professional icons throughout the application

## Author

Created as part of the LightIt challenge.

