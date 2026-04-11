📚 E-Learning Platform (Client)

A modern E-Learning web application built with Next.js, React, and a powerful UI + backend integration stack. It supports authentication, payments, real-time features, dashboards, and scalable state management.

🚀 Tech Stack
Framework: Next.js 13
UI Library: Material UI (MUI), Emotion
State Management: Redux Toolkit
Authentication: NextAuth.js
Forms & Validation: Formik + Yup
Charts & Analytics: Recharts
Payments: Stripe
Real-time: Socket.io Client
Styling: Tailwind CSS + MUI
Notifications: React Hot Toast
API Calls: Axios
📦 Installation
# 1. Clone the repository
git clone https://github.com/your-username/e-learning-platform.git

# 2. Move into project directory
cd client

# 3. Install dependencies
npm install
▶️ Running the Project
Development Mode
npm run dev

App runs at:

http://localhost:3000
Production Build
npm run build
npm run start
📁 Project Features
🔐 Authentication (NextAuth)
👨‍🎓 Student Dashboard
👨‍🏫 Instructor Dashboard
📊 Analytics with Charts
💳 Stripe Payment Integration
💬 Real-time communication (Socket.io)
🎨 Modern responsive UI (MUI + Tailwind)
📂 Course management system
⭐ Reviews & ratings system
🧠 Folder Structure (Suggested)
client/
│── components/
│── pages/
│── redux/
│── hooks/
│── services/
│── styles/
│── utils/
│── public/
⚙️ Environment Variables

Create a .env.local file:

NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_API_URL=http://localhost:5000

STRIPE_PUBLIC_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
💳 Stripe Setup
Add Stripe keys in .env.local
Configure checkout API routes in /pages/api
📡 Real-time Features

Socket.io is used for:

Live chat
Notifications
Real-time course updates
🛠 Scripts
Command	Description
npm run dev	Start development server
npm run build	Build production app
npm run start	Run production server
npm run lint	Run ESLint
📌 Future Improvements
AI-based course recommendations 🤖
Video streaming integration 🎥
Mobile app (React Native)
Advanced admin analytics
📄 License

This project is licensed under the MIT License.
