**Author:** Ishaan Gupta

## Overview

Pizza Dashboard is a responsive web app built with Next.js that allows authenticated users to view order stats, track deliveries, and monitor activity. It features a modern UI with animations and data visualizations, and supports Google OAuth login.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Google OAuth credentials (Client ID and Secret)
- A `.env.local` file with the following variables:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
````

---

### Installation

```bash
git clone https://github.com/yourusername/pizza-dashboard.git
npm install
```

---

###  Running the App Locally

```bash
npm run dev
```

For production:

```bash
npm run build
npm run start
```

---


## Third-Party Libraries Used

* `motion` – For DOM animations
* `lucide-react` – For modern, open-source SVG icons
* `radix UI`- custom components

