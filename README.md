
🎬 QUICKSHOW 🍿🎥

Seamless Video Discovery. Effortless Entertainment Experience.

Last Commit: JavaScript | Languages Used: JavaScript, Node.js, React, MongoDB
🧰 Built With

Frontend: React, Vite, Clerk, Stripe, Axios
Backend: Node.js, Express, MongoDB, Mongoose, Nodemon
Tools & Utilities: ESLint, JSON, NPM

🎦 LIVE DEMO 🌐

User Interface: 👉 QuickShow Live

(Deployed on Vercel)

Admin Dashboard: 👉 https://quickshow-puce-zeta.vercel.app/admin

🗂️ Table of Contents

Overview
Getting Started
Prerequisites
Installation
Usage
Testing
Features
Project Structure
API Documentation
Configuration
Contributing
License
Support
Contact

📖 Overview

QuickShow is a full-stack movie booking web application built using the MERN stack.
It allows users to explore movies, select seats, book tickets, make secure Stripe payments, and for admins to manage the entire movie ecosystem — from shows to revenue analytics.

Key Highlights

🎬 Movie Discovery: Browse and search movies
🎟️ Ticket Booking: Real-time seat selection system
💳 Payments: Integrated with Stripe for secure transactions
📱 Responsive: Optimized for all screen sizes
🔐 Authentication: Powered by Clerk for secure login/signup
👨‍💼 Admin Dashboard: Manage shows, movies, and bookings
⚡ Performance: Vite ensures blazing-fast builds

🚀 Getting Started
Prerequisites

Make sure you have:

Node.js (v16+)
npm or yarn
MongoDB (local/cloud)
Git installed

⚙️ Installation

Clone the repository:

git clone https://github.com/Yashwant176/QuickShow.git
cd QuickShow

Install Backend Dependencies
cd server
npm install

Install Frontend Dependencies
cd ../client
npm install

🔑 Environment Configuration

Create .env files in both the server and client directories.

Server (.env)
MONGODB_URI=your-mongodb-uri
CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
TMDB_API_KEY=your-tmdb-api-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

Client (.env)
VITE_CURRENCY=$
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
VITE_BASE_URL=https://quickshow-puce-zeta.vercel.app
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original

▶️ Usage
Start Development Servers

Backend:
cd server
npm run dev

Frontend:
cd client
npm run dev

Access the app:
Frontend: http://localhost:5173
Backend API: http://localhost:5000

🧪 Testing
Run tests using:
npm run test

🌟 Features

User
- Secure authentication via Clerk
- Browse and favorite movies
- Interactive seat selection
- Secure checkout with Stripe
- Manage booking history

Admin
- Dashboard with analytics
- Manage shows, movies, and users
- Handle bookings and payments

Technical
- MERN stack architecture
- RESTful APIs
- Responsive UI
- Error handling & validation


📡 API Documentation

Auth
- POST /api/users/register – Register new user
- POST /api/users/login – Login user

Movies & Shows
- GET /api/show/all – Get all shows
- GET /api/show/:id – Get single show

Bookings
- POST /api/bookings – Create a booking
- GET /api/user/bookings – Fetch user’s bookings

Payments
- POST /api/bookings/create-payment-intent – Stripe integration
- POST /api/webhook – Handle Stripe webhooks

⚙️ Configuration

| Variable | Description | Required |
|-----------|-------------|-----------|
| MONGODB_URI | MongoDB connection string | ✅ |
| CLERK_SECRET_KEY | Clerk backend key | ✅ |
| TMDB_API_KEY | TMDB movie API key | ✅ |
| STRIPE_SECRET_KEY | Stripe secret key | ✅ |
| STRIPE_WEBHOOK_SECRET | Stripe webhook signing secret | ✅ |

☁️ Deployment

Vercel Deployment:
npm i -g vercel
vercel --prod

🤝 Contributing
1. Fork the repo
2. Create a new branch (git checkout -b feature/your-feature)
3. Commit changes (git commit -m "Add new feature")
4. Push (git push origin feature/your-feature)
5. Open a Pull Request

📄 License
This project is licensed under the MIT License.
See the LICENSE file for details.

🧑‍💻 Support & Contact

For any support or queries:

👤 Yashwant Kumar
📧 Email: kumarkyashwant@gmail.com
💻 GitHub: @Yashwant176
🌐 Live: (https://quickshow-puce-zeta.vercel.app/)

Made with ❤️ by Yashwant Kumar
EOF
