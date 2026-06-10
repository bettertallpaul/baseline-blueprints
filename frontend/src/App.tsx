import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import Cart from './pages/Cart.tsx';
import Checkout from './pages/Checkout.tsx';
import OrderConfirmation from './pages/OrderConfirmation.tsx';

import { CartProvider } from './context/CartContext.tsx';
import { BaselineGrowthBookProvider } from './providers/BaselineGrowthBookProvider.tsx';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <BaselineGrowthBookProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home.html" element={<Navigate to="/" replace />} />
            
            {/* Support both legacy direct html path names and REST dynamic ids */}
            <Route path="/pdp-bed.html" element={<ProductDetail id="bed" />} />
            <Route path="/pdp-table.html" element={<ProductDetail id="table" />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart.html" element={<Navigate to="/cart" replace />} />
            
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout.html" element={<Navigate to="/checkout" replace />} />
            
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order-confirmation.html" element={<Navigate to="/order-confirmation" replace />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BaselineGrowthBookProvider>
      </Router>
    </CartProvider>
  );
}
