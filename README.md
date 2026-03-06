# Dynamic Printing Website

A fully dynamic Web Application for a modern Printing Business with a React frontend and an Node.js/Express backend using MongoDB.

## Features
- Dynamic Homepage (Hero, Highlights, Services, CTA, Testimonials)
- Real-time fully functional Newsletter subscription
- Admin Dashboard for CMS (manage all services, categories, menu items, hero text)
- Built-in Authentication (JWT)
- Image uploading via Multer

## Project Structure

```
Dynamic Printing Website/
├── client/                     # React Frontend
│   ├── public/                 # Static assets
│   ├── src/                    # React Source Files
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Homepage and Admin pages
│   │   ├── utils/              # API and auth helpers
│   │   ├── App.jsx             # Main Router Component
│   │   └── main.jsx            # React Entry Point
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite config
│
├── server/                     # Node.js/Express Backend
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Auth and upload middleware
│   ├── models/                 # Mongoose Data Models
│   ├── routes/                 # Express Routes (auth, admin, public)
│   ├── uploads/                # Local storage for uploaded images
│   ├── .env                    # Environment variables (secret)
│   ├── .env.example            # Environment variables template
│   ├── db.js                   # MongoDB connection logic
│   ├── index.js                # Server Entry Point
│   ├── seed.js                 # Database Seeder (for initial setup)
│   └── package.json            # Backend dependencies
│
├── README.md                   # Setup Documentation
└── printing-api-postman.json   # Postman Collection for API Docs
```

## Setup Instructions

### 1. Prerequisites
- Node.js (v18+ recommended)
- MongoDB Database (Local or MongoDB Atlas)

### 2. Backend Setup
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update `MONGO_URI` with your own MongoDB connection string.
   - Set a strong `JWT_SECRET`.
4. (Optional) Run the database seeder to populate default data and create the admin user (`admin@print.com` / `admin123`):
   ```bash
   node seed.js
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   > The backend should now be running on `http://localhost:5000`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   > The frontend should now be running on `http://localhost:5173`.

### 4. Usage
- Public View: `http://localhost:5173/`
- Admin Dashboard: `http://localhost:5173/admin` (Login using the admin credentials).

## API Documentation
An exhaustive Postman collection has been provided in the root directory: `printing-api-postman.json`. You can import this directly into Postman to easily view, test, and interact with all backend endpoints including authorization.
