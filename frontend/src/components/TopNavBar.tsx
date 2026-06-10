import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';

export default function TopNavBar() {
  const { setIsCartOpen, cartItems } = useCart();
  const location = useLocation();

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 w-full z-30 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 bg-surface border-b border-on-surface/10">
      <div className="flex items-center gap-8">
        <Link
          className="text-headline-md font-headline-md font-bold tracking-tighter text-on-surface hover:text-primary transition-colors"
          to="/"
        >
          BASELINE
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <Link
            className={`text-label-caps font-label-caps pb-1 pt-1 border-t-2 border-t-transparent border-b-2 transition-all duration-300 ${
              isActive('/') ? 'text-primary border-b-primary' : 'text-secondary border-b-transparent hover:text-on-surface'
            }`}
            to="/"
          >
            BLUEPRINTS
          </Link>
          <Link
            className={`text-label-caps font-label-caps pb-1 pt-1 border-t-2 border-t-transparent border-b-2 transition-all duration-300 ${
              isActive('/product/bed') || isActive('/pdp-bed.html')
                ? 'text-primary border-b-primary'
                : 'text-secondary border-b-transparent hover:text-on-surface'
            }`}
            to="/product/bed"
          >
            BED
          </Link>
          <Link
            className={`text-label-caps font-label-caps pb-1 pt-1 border-t-2 border-t-transparent border-b-2 transition-all duration-300 ${
              isActive('/product/seating')
                ? 'text-primary border-b-primary'
                : 'text-secondary border-b-transparent hover:text-on-surface'
            }`}
            to="/product/seating"
          >
            SEATING
          </Link>
          <Link
            className={`text-label-caps font-label-caps pb-1 pt-1 border-t-2 border-t-transparent border-b-2 transition-all duration-300 ${
              isActive('/product/storage')
                ? 'text-primary border-b-primary'
                : 'text-secondary border-b-transparent hover:text-on-surface'
            }`}
            to="/product/storage"
          >
            STORAGE
          </Link>
          <Link
            className={`text-label-caps font-label-caps pb-1 pt-1 border-t-2 border-t-transparent border-b-2 transition-all duration-300 ${
              isActive('/product/table') || isActive('/pdp-table.html')
                ? 'text-primary border-b-primary'
                : 'text-secondary border-b-transparent hover:text-on-surface'
            }`}
            to="/product/table"
          >
            TABLE
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="text-on-surface hover:text-primary transition-colors duration-300 active:scale-95"
          aria-label="Search"
        >
          <span className="material-symbols-outlined">search</span>
        </button>
        <button
          onClick={() => setIsCartOpen(true)}
          type="button"
          className="text-on-surface hover:text-primary transition-colors duration-300 active:scale-95 relative"
          aria-label="Shopping Cart"
        >
          <span className="material-symbols-outlined">shopping_bag</span>
          {totalCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-on-primary text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-surface">
              {totalCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
