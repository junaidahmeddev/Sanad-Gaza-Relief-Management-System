# 🌍 Sanad – Gaza Relief Management System 🇵🇸

**Sanad** is a premium full-stack humanitarian relief platform designed to support reconstruction, aid distribution, and support programs in Gaza. It enables donor transparency, live campaign management, and secure local/international transfer verification.

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

## 💻 Quick Start & Installation

### 1. Clone & Install Dependencies
Run dependency setups inside both major workspaces:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables (`backend/.env`)
Create a `.env` file inside the `backend/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_uri
JWT_SECRET=your_secure_signing_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin_password
```

### 3. Run Locally
Start the development servers:

**Backend:**
```bash
cd backend
node server.js
```

**Frontend:**
```bash
cd frontend
npm run dev
```