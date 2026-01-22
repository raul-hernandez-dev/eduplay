import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProviders from './app/providers/AppProviders';
import RootLayout from './app/layouts/RootLayout';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import GuestRoute from './features/auth/components/GuestRoute';

// Páginas públicas
import LandingPage from './pages/public/LandingPage/LandingPage';
import LoginPage from './pages/public/LoginPage/LoginPage';
import RegisterPage from './pages/public/RegisterPage/RegisterPage';

// Páginas protegidas
import DashboardPage from './pages/protected/DashboardPage/DashboardPage';

function App() {
  return (
    <Router>
      <AppProviders>
        <Routes>
          {/* Ruta raíz con layout público */}
          <Route element={<RootLayout />}>
            {/* Rutas públicas */}
            <Route path="/" element={
              <GuestRoute>
                <LandingPage />
              </GuestRoute>
            } />
            
            <Route path="/login" element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            } />
            
            <Route path="/register" element={
              <GuestRoute>
                <RegisterPage />
              </GuestRoute>
            } />
            
            {/* Rutas protegidas */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            
            {/* 404 */}
            <Route path="*" element={<div>404 - Página no encontrada</div>} />
          </Route>
        </Routes>
      </AppProviders>
    </Router>
  );
}

export default App;