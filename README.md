# X-Clone 🐦✨  

A modern **social media web application** inspired by X (formerly Twitter), built with the **MERN stack** and featuring **real-time chat**, secure authentication, and a responsive UI.  

🔗 **Live Demo:** [x-clone on Vercel](https://x-app-khaki.vercel.app/)  
💻 **Source Code:** [GitHub – X-Clone](https://github.com/Ahmedyyassen/X-APP)  

---

## 🚀 Tech Stack  

### Frontend  
- ⚛️ **React (TypeScript)** – Strongly typed, component-driven UI.  
- 📦 **TanStack React Query** – API data fetching, caching & synchronization.  
- 🧠 **Redux Toolkit** – Local state & global app logic management.  
- 🎨 **Tailwind CSS + Shadcn/ui** – Clean, responsive, and modern styling.  
- 🌐 **React Router DOM** – Smooth and dynamic client-side navigation.  

### Backend  
- 🚀 **Express.js (TypeScript)** – Scalable and structured REST API.  
- 💬 **Socket.IO** – Real-time chat and WebSocket communication.  
- 🖼️ **Multer + Cloudinary** – Image uploading and cloud-based storage.  
- 🔐 **JWT + Cookie Parser** – Authentication and session management.  
- 🔑 **bcrypt** – Password hashing for enhanced security.  

### Database  
- 🍃 **MongoDB + Mongoose** – Schema-based data modeling for users, posts, and chats.  

---

## ✨ Features  

- 🔑 **Authentication & Authorization** – Secure login, register, and session handling.  
- 📝 **Post Creation** – Share posts with image upload support.  
- 💬 **Real-Time Chat** – Messaging powered by WebSockets.  
- 📱 **Responsive UI** – Works seamlessly across devices.  
- ⚡ **Optimized API Handling** – Efficient state synchronization with React Query.  

---

## 📂 Project Structure  

```bash
X-APP/
├── client/          # Frontend (React + TS + Redux + React Query)
├── server/          # Backend (Express + TS + Socket.IO)
├── models/          # Mongoose schemas
├── controllers/     # API controllers
├── routes/          # API routes
└── README.md
