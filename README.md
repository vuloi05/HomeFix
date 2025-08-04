


![Platform](https://img.shields.io/badge/platform-React%20Native-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-beta-orange)

# HomeFix - Home Repair Service App

## Overview
HomeFix is a mobile application built with React Native (Expo) and TypeScript that simulates a home repair service booking system. The project focuses on user experience, clean and scalable code architecture, and is suitable for learning, demos, or as a foundation for real-world development.

## 🔑 Features

| Role        | Functionality                                                                 |
|-------------|-------------------------------------------------------------------------------|
| Customer    | - Book services via dynamic form <br> - View booking confirmation <br> - Manage orders via "Order Management" tab <br> - Modern, mobile-optimized UI |
| Technician  | - View, filter, and update order statuses <br> - View order details           |
| Admin       | - (Coming soon) Full system management                                        |

## 📱 Screenshots

![App Screenshot](https://via.placeholder.com/200x400)

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