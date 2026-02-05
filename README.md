# EduPlay

EduPlay is a modern web application focused on user management and educational experience, built with a scalable **feature-based architecture** and a clear separation of responsibilities. The project uses **Supabase** as the main backend for authentication and user management, and applies best practices for project organization, global context handling, and protected routes.

Currently, the project focuses on authentication, profile management, global configuration (theme and language), and a private dashboard.

---

## Main Features

- Complete authentication flow with Supabase:
  - User registration
  - Login and logout
  - Password recovery and update
  - Email change
- User and profile management
- Protected public and private routes
- Global authentication context
- Light and dark theme support
- Internationalization (i18n):
  - Spanish
  - English
- Modular, domain-driven architecture (features)
- Reusable UI through shared components

---

## Technologies Used

- React
- Supabase (Auth and Backend)
- React Context API
- React Router
- i18next
- CSS
- Google reCAPTCHA
- Tailwind CSS

---

## Project Structure

The project follows a **feature-based architecture**, where each business domain is independent and self-contained.

```
src/
├── api/
│   └── supabase.js
│
├── components/
│   ├── ui/
│   └── shared/
│
├── config/
│   └── i18n/
│
├── context/
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   └── LanguageContext.jsx
│
├── hooks/
│
├── layouts/
│   └── Layout.jsx
│
├── features/
│   ├── auth/
│   ├── users/
│   ├── dashboard/
│   └── home/
│
├── routes/
│   └── routes.jsx
│
├── utils/
├── styles/
│   └── globals.css
│
├── App.jsx
└── main.jsx
```

## Application Routes
- Public routes:
  - /login
  - /register
  - /forgot_password
  - /reset_password
  - /home
- Private routes (authentication required):
  - /dashboard
  - /profile

Private routes are protected through the AuthContext, ensuring that only authenticated users can access them.

## Global State Management
The project uses React Context as a Single Source of Truth for:
- User authentication and session
- Application theme (light / dark)
- Language selection and preference persistenc
  
## Authentication with Supabase
Supabase is responsible for:
- User account creation
- Login and logout
- Password recovery and update
- Email change
- User session management

All authentication logic is encapsulated within the auth feature, following the principle of separation of concerns.

## Project Status
The project is under active development.

The authentication foundation, project structure, and global configuration are already implemented, and the application is ready to scale with new educational features.

## Environment Variables (.env)

The project relies on environment variables to configure Supabase and Google reCAPTCHA.
When using Vite, all public variables must be prefixed with VITE_.

```
# Supabase
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key

# Google reCAPTCHA
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```