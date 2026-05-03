<div align="center">

# 🗳️ VoteX - Your Voting Platform

### Empowering Democracy Through Technology

[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

**VoteX** is a modern, full-stack voting platform designed to educate and empower citizens about the democratic process. Built with Django REST Framework and React, it provides an interactive experience for learning about voting procedures, eligibility, and important electoral information.

### Why VoteX?

- 🎓 **Educational** - Interactive quizzes and comprehensive glossary
- 📱 **Responsive** - Beautiful UI that works on all devices
- ⚡ **Fast** - Built with Vite and optimized for performance
- 🔒 **Secure** - Implements CSP and rate limiting
- 🌐 **Accessible** - Designed with accessibility in mind

---

## ✨ Features

### 🗳️ Core Features

- **User Authentication System** 🔐
  - User registration and login
  - Profile management with voting information
  - Quiz attempt tracking and statistics
  - Bookmarks for FAQs and glossary terms
  - Personal notification center
  
- **Progressive Web App (PWA)** 📱
  - Install as native app on mobile/desktop
  - Offline support with service worker
  - Fast loading with intelligent caching
  - Push notification ready
  
- **Notification System** 🔔
  - Email notifications (welcome, achievements)
  - In-app notification center
  - Deadline reminders
  - Quiz achievement alerts
  
- **Multilingual Support** 🌐
  - English and Hindi languages
  - Easy language switching
  - Persistent language preference
  - Expandable to more languages

- **Voter Eligibility Checker** - Verify voting eligibility with smart validation
- **Interactive Quiz System** - Test your knowledge with difficulty-based questions
- **Comprehensive Glossary** - Learn electoral terms and definitions
- **Important Dates Timeline** - Never miss crucial electoral events
- **FAQ System** - Get answers to common voting questions
- **Voting Guide** - Step-by-step guide for the voting process

### 🎨 UI/UX Features

- **Smooth Animations** - Powered by Framer Motion and GSAP
- **Interactive Components** - Card swaps, shape grids, and more
- **Chat Widget** - Real-time assistance
- **Confetti Celebrations** - Engaging user feedback
- **Dark Mode Ready** - Modern design system

### 🔧 Technical Features

- **RESTful API** - Well-structured Django REST Framework backend
- **Token Authentication** - Secure user authentication
- **User Profiles** - Extended user information with voting details
- **Rate Limiting** - Protect against abuse
- **CORS Support** - Secure cross-origin requests
- **Caching** - Optimized performance
- **Admin Panel** - Easy content management
- **Seed Data** - Quick setup with sample data
- **PWA Support** - Installable, offline-capable app
- **Email System** - Automated email notifications
- **Multilingual** - English and Hindi support

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite** | Build Tool & Dev Server |
| **TailwindCSS 4** | Styling |
| **Framer Motion** | Animations |
| **GSAP** | Advanced Animations |
| **React Router** | Navigation |
| **Axios** | HTTP Client |
| **SWR** | Data Fetching |
| **Lucide React** | Icons |

### Backend

| Technology | Purpose |
|------------|---------|
| **Django 5.x** | Web Framework |
| **Django REST Framework** | API Development |
| **SQLite** | Database |
| **CORS Headers** | Cross-Origin Support |
| **Python 3.x** | Programming Language |

---

## 📁 Project Structure

```
votex/
├── 📂 backend/              # Django project settings
│   ├── settings.py          # Configuration
│   ├── urls.py              # URL routing
│   └── wsgi.py              # WSGI config
│
├── 📂 api/                  # Django app
│   ├── models.py            # Database models
│   ├── serializers.py       # DRF serializers
│   ├── views.py             # API views
│   ├── urls.py              # API routes
│   ├── middleware.py        # Custom middleware
│   └── management/          # Management commands
│       └── commands/
│           └── seed_data.py # Sample data seeder
│
├── 📂 frontend/             # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CardSwap.jsx
│   │   │   ├── ShapeGrid.jsx
│   │   │   └── ChatWidget.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── EligibilityPage.jsx
│   │   │   ├── QuizPage.jsx
│   │   │   ├── GlossaryPage.jsx
│   │   │   ├── TimelinePage.jsx
│   │   │   ├── VotingGuidePage.jsx
│   │   │   └── AboutPage.jsx
│   │   ├── api.js           # API client
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── 📄 manage.py             # Django management
├── 📄 db.sqlite3            # SQLite database
├── 📄 README.md             # This file
└── 📄 LICENSE               # License file
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.8+** installed
- **Node.js 18+** and npm installed
- **Git** for version control

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/votex.git
cd votex
```

#### 2️⃣ Backend Setup

```bash
# Install Python dependencies
pip install django djangorestframework django-cors-headers

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Seed sample data
python manage.py seed_data

# Start Django server
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

#### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 🎯 Quick Start

1. **Access the application** at `http://localhost:5173`
2. **Explore features** - Navigate through different pages
3. **Try the quiz** - Test your voting knowledge
4. **Check eligibility** - Use the eligibility checker
5. **Admin panel** - Visit `http://localhost:8000/admin` (if superuser created)

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api/
```

### Endpoints

#### 📚 FAQ Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/faqs/` | Get all FAQs |
| `GET` | `/api/faqs/?category=voting` | Filter by category |
| `GET` | `/api/faqs/search/?q=register` | Search FAQs |

#### 🔐 Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register/` | Register new user |
| `POST` | `/api/auth/login/` | Login user |
| `POST` | `/api/auth/logout/` | Logout user |
| `GET` | `/api/auth/profile/` | Get user profile |
| `PUT` | `/api/auth/profile/update/` | Update profile |
| `POST` | `/api/auth/change-password/` | Change password |

#### 📊 Quiz Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/quiz/` | Get random questions |
| `POST` | `/api/quiz/attempt/` | Save quiz attempt |
| `GET` | `/api/quiz/history/` | Get quiz history & stats |

#### 🔖 Bookmark Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/bookmarks/` | Get user bookmarks |
| `POST` | `/api/bookmarks/add/` | Add bookmark |
| `DELETE` | `/api/bookmarks/<id>/remove/` | Remove bookmark |

#### 🔔 Notification Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notifications/` | Get notifications |
| `POST` | `/api/notifications/<id>/read/` | Mark as read |
| `POST` | `/api/notifications/read-all/` | Mark all as read |

#### 📖 Glossary Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/glossary/` | Get all terms |
| `GET` | `/api/glossary/?search=evm` | Search terms |

#### ❓ Quiz Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/quiz/` | Get all questions |
| `GET` | `/api/quiz/?difficulty=easy` | Filter by difficulty |

#### 📅 Timeline Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/timeline/` | Get important dates |
| `GET` | `/api/timeline/?is_active=true` | Get active events |

#### ✅ Eligibility Endpoint

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/eligibility/check/` | Check voting eligibility |

**Request Body:**
```json
{
  "age": 25,
  "citizenship": "Indian",
  "residence": "6 months"
}
```

### Rate Limits

- **Anonymous users**: 100 requests/hour
- **Authenticated users**: 1000 requests/hour
- **Specific endpoints**: 20 requests/minute

---

## 📸 Screenshots

> Add your screenshots here

```markdown
### Landing Page
![Landing Page](screenshots/landing.png)

### Quiz Interface
![Quiz](screenshots/quiz.png)

### Eligibility Checker
![Eligibility](screenshots/eligibility.png)

### Glossary
![Glossary](screenshots/glossary.png)
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint rules for JavaScript/React
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- Election Commission of India for inspiration
- Open source community for amazing tools
- All contributors who help improve this project

---

## 📞 Support

If you have any questions or need help, feel free to:

- Open an issue on GitHub
- Contact via email: your.email@example.com
- Join our community discussions

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ for Democracy

</div>
