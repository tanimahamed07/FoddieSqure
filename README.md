# 🍽️ Restaurant Web Platform

A modern, responsive restaurant website with online table booking and powerful admin dashboard for menu & reservation management.

## Live Link: 🌐 [Live Site Link](http://foodiesquare.vercel.app/)

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

   ## 🎟️ Ready-to-use Test Accounts

<table align="center">
  <tr>
    <th colspan="4" style="text-align:center; background:#10b981; color:white; padding:12px; font-size:1.2em;">
      🚀 Live Demo Credentials – Try it now!
    </th>
  </tr>
  <tr style="background:#f3f4f6;">
    <td><strong>👤 Customer</strong></td>
    <td><code>user@gmail.com</code></td>
    <td><code>userrr</code></td>
    <td>Book tables • See bookings • Write reviews • Update profile</td>
  </tr>
  <tr style="background:#fef3c7;">
    <td><strong>🛡️ Admin</strong></td>
    <td><code>admin@gmail.com</code></td>
    <td><code>adminn</code></td>
    <td>Manage menu • Confirm bookings • User list • Dashboard stats • Edit content</td>
  </tr>
</table>

<p align="center">
  <a href="http://foodiesquare.vercel.app/login">
    <img src="https://img.shields.io/badge/LOGIN_NOW-10b981?style=for-the-badge&logo=login&logoColor=white" alt="Login Now">
  </a>
</p>

<p align="center">
  <strong>Pro tip:</strong> Admin dashboard has beautiful overview cards, charts & full CRUD controls — check it out! 🍽️✨
</p>

