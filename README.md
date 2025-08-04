


![Platform](https://img.shields.io/badge/platform-React%20Native-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-beta-orange)


# HomeFix - Home Repair Service App

> 📖 Vietnamese: [README.vi.md](./README.vi.md)

## Overview
HomeFix is a mobile application built with React Native (Expo) and TypeScript that simulates a home repair service booking system. The project focuses on user experience, clean and scalable code architecture, and is suitable for learning, demos, or as a foundation for real-world development.


## 🔑 User Flow & Features

### 1. Role Selection & Sample Login
- On app launch, user selects a role: **Customer** or **Technician** (Admin coming soon).
- Then, pick a sample user to quickly log in (sample data provided).

### 2. Customer Flow
- Book a service via a dynamic form (auto-filled with sample user info).
- View confirmation of the newly created order.
- Manage all your orders in the "Order Management" tab (see only your own orders).
- Receive notification when a technician accepts your order.

### 3. Technician Flow
- See a list of **unassigned orders** or **orders assigned to yourself** only.
- Accept new orders (only one technician can accept each order; others will no longer see it).
- Unassign (cancel) an order (order returns to unassigned state, visible to all technicians again).
- Update order status (only for orders you have accepted).

### 4. Admin Flow (coming soon)
- Manage the whole system, view all orders, users, etc.

### 5. UI & Experience
- Modern, mobile-optimized UI.
- Multiple order statuses, role-based order detail popups.

---

## 📱 Screenshots

Welcome screen:

![Welcome Screen](./App%20Welcome.jpg)

<!-- Add more screenshots here if available -->

## 🧱 Architecture

- **Frontend**: React Native (Expo), TypeScript
- **State Management**: React Context API + AsyncStorage
- **Navigation**: React Navigation v6 (Stack + Bottom Tabs)
- **Backend**: Mock only (easily replaceable with REST/GraphQL)
- **Scalable Design**: Modular file structure, easy to extend

## 🚀 Getting Started

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd home-repair-service
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the app**
   ```bash
   npm run android   # Android
   npm run ios       # iOS (macOS)
   npm run web       # Web
   ```

## 📂 Folder Structure

```
home-repair-service/
├── components/          # Reusable components
├── screens/            # App screens
├── services/           # API services
├── Constants/          # App constants
├── types/              # TypeScript types
├── Navigation/         # Navigation setup
└── App.tsx            # Main app component
```

## 🤝 Contribution Guide

- Use TypeScript & functional components only
- Follow naming conventions (English in code, Vietnamese in UI)
- Separate business logic from UI
- Use Pull Requests for all contributions

## 💡 Expansion Ideas

- [ ] Connect to real backend (REST API, GraphQL, ...)
- [ ] Authentication (login/register)
- [ ] Push notification
- [ ] Online payment
- [ ] Real-time chat
- [ ] Service review & rating
- [ ] Location & map
- [ ] Upload problem photos

---

## 📚 Documentation

- [Troubleshooting Guide](./docs/Troubleshooting.md)

## License

MIT License

---

> 🌐 Switch to Vietnamese: [README.vi.md](./README.vi.md)