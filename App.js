import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Pages publiques
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';

// Pages protégées
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Routes protégées (authentification requise) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Routes avec rôles requis */}
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <UserManagement />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <Settings />
              </ProtectedRoute>
            } 
          />
          
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
