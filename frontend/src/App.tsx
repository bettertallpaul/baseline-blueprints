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
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BaselineGrowthBookProvider>
      </Router>
    </CartProvider>
  );
}
