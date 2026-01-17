# 🍽️ Restaurant Web Platform

A modern, responsive restaurant website with online table booking and powerful admin dashboard for menu & reservation management.

![Restaurant Homepage Preview](https://via.placeholder.com/1200x600?text=Restaurant+Homepage+Screenshot)  
*(Add your actual screenshot here later)*

## ✨ Features Implemented

### Guest / Public Features
- Beautiful landing page with restaurant story, highlights & specialties
- Digital menu with categories, item details, prices & images
- Google Maps embedded location + contact information
- User registration & login (for booking access)

### Customer Features
- Profile update (name, phone, address)
- Table reservation: select date, time, number of guests
- View booking history with status (Pending/Confirmed/Cancelled)
- Basic review/rating system for dishes or experience

### Admin / Staff Features
- **Admin Dashboard** – Overview (total bookings, top items, stats)
- **Menu Management** (Full CRUD)
  - Create, edit, delete categories & menu items
  - Toggle availability of dishes
- **Reservation Management**
  - View all bookings
  - Update status: Pending → Confirmed / Cancelled
- **User Management** – List of registered customers
- **Content Management** (basic) – Update banners, gallery images, announcements

**Additional Nice-to-have (if implemented):**
- Toast notifications on successful product/menu item creation
- Image upload support for menu items (using cloudinary or local)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router) + React Server Components
- **Styling**: Tailwind CSS
- **Backend API**: Express.js (separate server or Next.js API routes)
- **Data Storage**: JSON file (for simplicity) or MongoDB/Prisma (recommended for production)
- **Authentication**: NextAuth.js / Clerk / JWT (your choice)
- **UI Components**: Shadcn/ui or custom with Tailwind
- **Form Handling**: React Hook Form + Zod (recommended)
- **Notifications**: react-hot-toast (for toast messages)
- **Icons**: lucide-react or heroicons
- **Deployment**: Vercel (frontend) + Render/Railway (backend if separate)

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm / pnpm / yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/restaurant-platform.git
   cd restaurant-platform
