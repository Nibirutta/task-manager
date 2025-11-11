
import { lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './router/ProtectedRoute';
import Layout from './layout/Layout';
import Spinner from './components/Spinner/Spinner';

// Lazy-loading dos componentes de página
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));
const UserSettingsPage = lazy(() => import('./pages/UserSettingsPage/UserSettingsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));


function App() {
  return (
    <Suspense fallback={<Spinner color='#0d1b2a' />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rotas Públicas */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />}
          />
          <Route path="reset-password" element={<ResetPasswordPage />} 
          />

          {/* Rotas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="settings" element={<UserSettingsPage />} />
          </Route>

          {/* Rota de fallback para 404 */}
          <Route path="*" element={ <NotFoundPage /> } />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App;
