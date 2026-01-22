import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProviders from './app/providers/AppProviders';
import RootLayout from './app/layouts/RootLayout';
import GuestRoute from './features/auth/components/GuestRoute';

// Páginas públicas
import LandingPage from './pages/public/LandingPage/LandingPage';
import LoginPage from './pages/public/LoginPage/LoginPage';



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

            
            {/* 404 */}
            <Route path="*" element={<div>404 - Página no encontrada</div>} />
          </Route>
        </Routes>
      </AppProviders>
    </Router>
  );
}

export default App;