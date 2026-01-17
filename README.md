<p align="center">
  <img src="https://i.ibb.co.com/gbMst0K8/Screenshot-2026-01-17-at-11-19-25-AM.png" alt="FoodieSquare - Restaurant Web Platform" width="800"/>
  <br><br>
  <a href="https://foodiesquare.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Demo-10b981?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo">
  </a>
  <a href="https://github.com/tanimahamed07/FoddieSqure">
    <img src="https://img.shields.io/github/stars/tanimahamed07/FoddieSqure?style=for-the-badge&color=10b981" alt="GitHub Stars">
  </a>
</p>

<h1 align="center">🍽️ FoodieSquare – Restaurant Web Platform</h1>

<p align="center">
  A modern, responsive restaurant website with <strong>online table booking</strong> and a powerful <strong>admin dashboard</strong> for menu and reservation management.<br>
  Built with Next.js 15, Tailwind CSS, and NextAuth.js.
</p>

<p align="center">
  <strong>Live Site →</strong> <a href="https://foodiesquare.vercel.app">foodiesquare.vercel.app</a><br>
  <strong>Admin Dashboard:</strong> Log in with <code>admin@gmail.com</code> / <code>adminn</code>
</p>

<hr>

## ✨ Key Features

### 👤 Guest / Customer Features
- Elegant landing page with restaurant story, highlights & specialties
- Digital menu – categorized items with images, descriptions & prices
- User registration & secure login
- Profile management (name, phone, address)
- Table reservation system (select date, time, number of guests)
- Booking history with real-time status (Pending / Confirmed / Cancelled)
- Basic dish / experience review & rating system

### 🛡️ Admin / Staff Features
- **Dashboard Overview** – stats cards, total bookings, popular items, simple charts
- **Full Menu CRUD** – create / edit / delete categories & items, toggle availability
- **Reservation Management** – view all bookings, update status (Confirm / Cancel)
- **User Management** – list of registered customers
- **Basic Content Management** – update banners, gallery images, announcements

### Nice-to-have (partially / fully implemented)
- Toast notifications (success/error) using react-hot-toast
- Image upload support for menu items (Cloudinary or local)

## 🛠️ Tech Stack

| Layer            | Technology                          |
|------------------|-------------------------------------|
| Framework        | Next.js 15 (App Router + RSC)       |
| Styling          | Tailwind CSS                        |
| Authentication   | NextAuth.js / Auth.js               |
| Form Handling    | React Hook Form                     |
| Notifications    | react-hot-toast                     |
| Data (demo)      | JSON files                          |
| Data (prod)      | MongoDB + Prisma (recommended)      |
| Deployment       | Vercel                              |

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- pnpm / npm / yarn

### Installation & Run

```bash
# Clone the repo
git clone https://github.com/tanimahamed07/FoddieSqure.git
cd FoddieSqure

# Install dependencies
pnpm install
# or npm install
# or yarn install

# Copy example env file (if exists)
cp .env.example .env.local   # ← important!

# Start dev server
pnpm dev
# or
npm run dev
# or
yarn dev
