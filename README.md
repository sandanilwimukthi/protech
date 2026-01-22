# ProTech Equipment Manual Platform

A software-driven equipment manual platform built with Next.js, TypeScript, and Tailwind CSS. This platform transforms traditional PDF manuals into an intuitive, interactive, and role-based digital system.

## Features

- **Equipment Navigation**: Hierarchical navigation through Machine → Subsystem → Component
- **Preventive Maintenance**: Schedule management with time- and usage-based PM tasks
- **Bill of Materials**: Component-level BOM with part numbers, manufacturers, and linked documentation
- **Faults & Troubleshooting**: Symptom-based fault diagnosis with root causes and troubleshooting steps
- **Work Orders**: Open work orders with date range filtering and status tracking
- **Calibration & Validation**: Equipment calibration records and validation checklists
- **User Management**: Role-based access control (Operators, Maintenance Technicians, Engineers, etc.)
- **Search**: Keyword search across equipment, components, fault codes, and tasks

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
protech-web/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── equipment/         # Equipment navigation
│   ├── maintenance/       # Preventive maintenance
│   ├── bom/               # Bill of materials
│   ├── faults/            # Faults and troubleshooting
│   ├── work-orders/       # Open work orders
│   ├── calibration/       # Calibration and validation
│   └── login/             # Authentication
├── components/            # Reusable React components
│   ├── Header.tsx        # Main navigation header
│   └── DataTable.tsx     # Reusable data table component
├── types/                # TypeScript type definitions
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Key Pages

- **Home** (`/`): Dashboard with quick access to all features
- **Equipment** (`/equipment`): Navigate equipment hierarchy
- **Preventive Maintenance** (`/maintenance`): View and manage maintenance schedules
- **Bill of Materials** (`/bom`): Browse parts and component information
- **Faults & Troubleshooting** (`/faults`): Diagnose equipment faults
- **Work Orders** (`/work-orders`): View open work orders by date range
- **Calibration & Validation** (`/calibration`): Equipment calibration records

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Next Steps

This is a Phase 1 demo version. Future enhancements include:

- Full authentication and authorization system
- Database integration for persistent data
- Offline support with data synchronization
- Mobile app (iOS/Android)
- Real-time notifications
- Video embedding for instructional content
- QR code integration
- Multi-language support
- Admin content management tools

## License

Proprietary - ProTech Electrical Controls
