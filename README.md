# JustClaw

**JustClaw** is a modern, high-performance web interface for managing and deploying automated trading bots ("Clawbots"). Built with a focus on aesthetics, security, and ease of use, it features a "New Skeuomorphism" design language with deep ambient lighting and glassmorphism effects.

## Features

- **One-Click Deployment**: Deploy trading bots instantly without configuration files.
- **Visual Dashboard**: Monitor bot status, storage, and CPU usage in real-time.
- **Secure Management**: Enterprise-grade security for your API keys and data.
- **Crypto Payments**: Integrated "Add Funds" flow with multi-chain support (mock).
- **Responsive Design**: Fully responsive interface that works on desktop and mobile.

## Tech Stack

- **Frontend Framework**: [React](https://react.dev/) (via [Vite](https://vitejs.dev/))
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/justclaw.git
    cd justclaw
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components
│   └── ui/          # Core primitives (Button, Card, Input)
├── layouts/         # Page layouts (DashboardLayout)
├── pages/           # Route components
│   ├── dashboard/   # Dashboard sub-pages (Profile, Bots)
│   ├── Home.jsx     # Landing page
│   └── Login.jsx    # Authentication page
├── index.css        # Global styles & Tailwind theme
├── main.jsx         # Application entry point
└── utils.js         # Helper functions (cn)
```

## Customization

### Theme Colors

The color palette is defined in `src/index.css` under the `@theme` directive. The primary colors are extracted from the `logo.png` asset.

- `--color-claw-500`: Primary Indigo (#3939c9)
- `--color-claw-300`: Accent Purple (#bc95fb)
- `--color-claw-900`: Background Navy (#04074a)

## Deployment

To build the project for production:

```bash
npm run build
```

The output will be in the `dist/` folder, ready to be served by any static file host (Vercel, Netlify, Nginx, etc.).
