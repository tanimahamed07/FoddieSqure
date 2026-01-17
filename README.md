# 🍽️ Restaurant Web Platform

A modern, responsive restaurant website with online table booking and powerful admin dashboard for menu & reservation management.

## Live Link: 🌐 [Live Site Link](https://lonelink1.netlify.app/)

![Restaurant Homepage Preview](https://i.ibb.co.com/gbMst0K8/Screenshot-2026-01-17-at-11-19-25-AM.png)


## ✨ Features Implemented

### Guest / Public Features
- Beautiful landing page with restaurant story, highlights & specialties
- Digital menu with categories, item details, prices & images
- User registration & login (for booking access)
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
- **Data Storage**: JSON file (for simplicity) or MongoDB/Prisma (recommended for production)
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form
- **Notifications**: react-hot-toast (for toast messages)

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm / pnpm / yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/tanimahamed07/FoddieSqure.git
