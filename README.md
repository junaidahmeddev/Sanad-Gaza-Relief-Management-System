# 🌍 Sanad – Gaza Relief Management System 🇵🇸

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Deployment-success?style=for-the-badge)](https://your-vercel-deployment-link.vercel.app/)

**Sanad** is a premium full-stack humanitarian relief platform designed to support reconstruction, aid distribution, and support programs in Gaza. It enables donor transparency, live campaign management, and secure local/international transfer verification.

---

## 📸 Screenshots
![Homepage Screenshot](/placeholder-homepage.png)
*Sanad Gaza Relief Homepage displaying active campaigns and transparent donation tracking.*

![Admin Dashboard](/placeholder-dashboard.png)
*Admin Dashboard for verifying transfers and reviewing memorial stories.*

---

## 🚀 Key Features

*   **Active Campaign Management:** Specialized modules for emergency aid, orphan sponsorships, and critical medical relief.
*   **Manual Transfer Verification:** Clean submission and tracking of bank transfers, EasyPaisa, JazzCash, or agency payments to support regions without standard credit card processing gateways.
*   **Stories & MemoryLine:** An approval-based public memorial section where users can share martyr/survivor stories.
*   **Admin Control Panel:** Secured private dashboard to monitor donations, manage volunteer applications, review stories, and track blocked items.
*   **Robust JWT Security:** Token-based authentication using modern signing methods to prevent unauthorized mutations.
*   **Automatic Database Recovery:** Smart connection pooling with automatic local database failover handling.

---

## 🛠 Tech Stack

*   **Frontend:** React.js (Vite) & Tailwind CSS
*   **Backend:** Node.js, Express.js & JWT
*   **Database:** MongoDB Atlas (Cloud) with local Mongoose fallback

---

## 📂 Project Structure

```text
sanad-app/
│
├── backend/            # Express.js server & API routes
│   ├── models/         # Mongoose schemas (Donation, Story, etc.)
│   ├── routes/         # Express API endpoints
│   ├── middleware/     # JWT authentication and guards
│   └── server.js       # Main server entry point
│
├── frontend/           # React.js client application
│   ├── public/         # Static assets and images
│   ├── src/            # React components, pages, and context
│   └── vite.config.js  # Vite bundler configuration
│
└── README.md           # Project documentation
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v16.x or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance)
- *(Optional)* Stripe API keys if implementing automated credit card gateways

---

## 💻 Installation & Setup

Follow these step-by-step instructions to get the project running locally.

### 1. Clone the Repository
```bash
git clone https://github.com/junaidahmeddev/Sanad-Gaza-Relief-Management-System.git
cd Sanad-Gaza-Relief-Management-System
```

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env
```
*Edit the `backend/.env` file and insert your MongoDB URI and a secure JWT Secret.*

### 3. Frontend Setup
```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Create environment variables file (if configuring Vite API URLs)
cp .env.example .env
```

### 4. Run Locally
Start the development servers in two separate terminal windows:

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run dev
```

---

## 🤝 Contributing

Contributions make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---