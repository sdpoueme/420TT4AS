import './App.css';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Contact from './components/Contact';
import Products from './components/Products';
import NotFound from './components/NotFound'; 
import ProductDetail from './components/ProductDetail';
import Navigation from './components/Navigation';
import About from './components/About';
import Cart from './components/Cart';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';
import UserSettings from './components/UserSettings';
import Dashboard from './components/Dashboard';

function App() {

  const ProtectedRoute = () => {
    const isAuthenticated = true; // Replace with your actual auth logic
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
   
   <div>
  
   <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<UserSettings />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
         {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/ancienne" element={<Navigate to="/nouvelle"/>} />
         
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      
     
    </div>   
  );
}

function Layout()
{
  return(
    <div>
      <Navigation />
      <main>
        HOME PAGE
        <Dashboard />
        <Outlet />
      </main>
    </div>
  );
}

export default App;
