import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import Products from './components/Products';
import NotFound from './components/NotFound'; 
import ProductDetail from './components/ProductDetail';
import Navigation from './components/Navigation';
import About from './components/About';

function App() {
  return (
   
    <div>
  
    <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>    
  );
}



export default App;
