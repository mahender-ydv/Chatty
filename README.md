# Real-Time Chatting Application

A full-stack real-time chatting application built with React, Node.js, Express, Socket.IO, and MongoDB.

---

## 📁 Project Structure

```
Chating-Application/
├── backend/               # Express & Socket.IO backend API
│   ├── controller/        # Request handlers (auth, message)
│   ├── lib/               # DB connection, Socket.IO setup, JWT utils
│   ├── middleware/        # Authentication middleware
│   ├── models/            # Mongoose schemas (User, Message)
│   ├── routes/            # Express routes
│   ├── .env.example       # Example environment variables for Backend
│   ├── package.json       # Backend dependencies and scripts
│   └── server.js          # Entry point
│
├── frontend/              # React (CRA) frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── lib/           # Axios instance & config
│   │   └── store/         # Zustand global state (Auth, Chat)
│   ├── .env.example       # Example environment variables for Frontend
│   ├── package.json       # Frontend dependencies and scripts
│   └── vercel.json        # Vercel SPA rewrite routes config
│
├── .gitignore             # Git ignore rules for node_modules and .env files
└── README.md              # Deployment and setup guide
```

---

## 🚀 Deployment Guide

### Step 1: Deploy Backend on Render

1. **Sign up / Log in** to [Render](https://render.com/).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration parameters:
   - **Name**: `chat-application-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add the **Environment Variables** in Render Dashboard:
   | Key | Description | Example Value |
   | --- | --- | --- |
   | `PORT` | Server Port | `8000` |
   | `NODE_ENV` | Environment Mode | `production` |
   | `MONGODB_URI` | MongoDB Connection String | `mongodb+srv://...` |
   | `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key` |
   | `CLIENT_URL` | Deployed Frontend Vercel URL | `https://your-app.vercel.app` |
   | `CLOUDINARY_CLOUD_NAME` | Cloudinary Name | `your_cloud_name` |
   | `CLOUDINARY_API_KEY` | Cloudinary API Key | `your_api_key` |
   | `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `your_api_secret` |
   | `GEMINI_API_KEY` | Gemini AI API Key (Optional) | `your_gemini_api_key` |

6. Click **Create Web Service**. Save your deployed Render URL (e.g., `https://chat-application-backend.onrender.com`).

---

### Step 2: Deploy Frontend on Vercel

1. **Sign up / Log in** to [Vercel](https://vercel.com/).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. Configure Project settings:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: Select `frontend`
5. Expand **Environment Variables** and add:
   | Key | Value |
   | --- | --- |
   | `REACT_APP_BACKEND_URL` | `https://chat-application-backend.onrender.com` (Your Render backend URL without trailing slash) |

6. Click **Deploy**.
7. Copy your final Vercel deployment URL (e.g. `https://your-app.vercel.app`).
8. **IMPORTANT**: Return to your Render backend dashboard and make sure `CLIENT_URL` matches your official Vercel URL (`https://your-app.vercel.app`).

---

## 🛠 Local Development Setup

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env credentials
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Set REACT_APP_BACKEND_URL=http://localhost:8000
npm start
```
