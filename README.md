# 🚀 Crypto Stream - Real-Time Cryptocurrency Price Monitoring & Alerts

A full-stack application to monitor real-time cryptocurrency prices, set alert criteria, and notify users via email, toast, and voice notifications.  
This project demonstrates real-time communication, caching, and alerting systems using **Node.js, Express, MongoDB, Redis, React, and TypeScript**.

---

## 📌 Features

### 🔍 Real-Time Monitoring
- Fetch live cryptocurrency prices from **CoinGecko API** (or CoinMarketCap as fallback).
- Auto-refresh prices at intervals (with caching to avoid API rate limits).
- Frontend updates with latest crypto data.

### 🚨 Alerting System
- Users can set alerts for specific coins with conditions:
  - **Above Target Price**
  - **Below Target Price**
- Alerts trigger in **real-time** with:
  - 📧 Email notification
  - 🔔 Toast notification (UI)
  - 🗣️ Voice notification (Text-to-Speech in browser)
- Alerts are marked as **triggered** once sent.

### ⚡ Caching Mechanism
- **Redis** stores recent price updates to reduce API calls.
- Automatic refresh every minute.
- Cached data served instantly to new users.

---

## 🛠️ Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- Nodemailer (for email alerts)

**Frontend**
- React.js
- Tailwind CSS
- React Toastify (notifications)
- Web Speech API (voice alerts)

---

