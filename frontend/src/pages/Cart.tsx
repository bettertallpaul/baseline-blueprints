import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import TopNavBar from '../components/TopNavBar.tsx';
import CartDrawer from '../components/CartDrawer.tsx';
import Footer from '../components/Footer.tsx';

export default function Cart() {
  const { cartItems, subtotal, updateQuantity, removeFromCart } = useCart();

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="antialiased min-h-screen flex flex-col font-sans bg-surface text-on-surface">
      <TopNavBar />
      <CartDrawer />

      {/* Main Canvas */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-margin-desktop bg-surface-container-low blueprint-grid pt-28">
        <div className="bg-surface border border-on-surface p-6 md:p-12 relative z-10">
          <div className="mb-16">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight font-bold">
              Cart ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="py-24 text-center border-t border-on-surface">
              <span className="material-symbols-outlined text-secondary text-5xl mb-4">shopping_bag</span>
              <h2 className="text-headline-md font-bold mb-2">Your cart is empty</h2>
              <p className="text-body-md text-on-surface-variant mb-8">
                You haven't added any architectural blueprints to your project.
              </p>
              <Link
                to="/"
                className="font-button text-button border border-on-surface bg-primary text-on-primary px-8 py-3.5 hover:bg-on-primary-fixed-variant hover:border-primary transition-colors inline-block tracking-widest"
              >
                BROWSE BLUEPRINTS
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
              {/* Left Column: Cart Items (8 cols) */}
              <div className="md:col-span-8 flex flex-col border-t border-on-surface">
                {cartItems.map((item) => (
                  <div key={item.hash} className="flex flex-col sm:flex-row py-8 border-b border-on-surface gap-8">
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.productId}`}
                      className="w-full sm:w-48 h-48 sm:h-auto aspect-square border border-on-surface overflow-hidden bg-surface-container-low flex-shrink-0 relative block"
                    >
                      <img
                        alt={item.name}
                        className="w-full h-full object-cover mix-blend-multiply grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                        src={item.image}
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                            <Link to={`/product/${item.productId}`} className="hover:underline">
                              {item.name}
                            </Link>
                          </h2>
                          <span className="font-body-lg text-body-lg text-on-surface font-semibold">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 mb-6">
                          <span className="font-body-md text-body-md text-on-surface-variant">
                            Size: <span className="text-on-surface font-semibold">{item.size}</span>
                          </span>
                          <span className="font-body-md text-body-md text-on-surface-variant">
                            Material: <span className="text-on-surface font-semibold">{item.material}</span>
                          </span>
                          {item.addons.length > 0 && (
                            <span className="font-body-md text-body-md text-on-surface-variant">
                              Add-ons:{' '}
                              <span className="text-on-surface font-semibold">
                                {item.addons.map((a) => a.name).join(', ')}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-between items-end">
                        {/* Quantity Selector */}
                        <div className="flex border border-on-surface w-32 h-10">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.hash, item.quantity - 1)}
                            className="w-10 h-full flex items-center justify-center border-r border-on-surface hover:bg-surface-variant text-on-surface transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val)) updateQuantity(item.hash, val);
                            }}
                            className="w-full h-full text-center border-none focus:ring-0 font-body-md text-body-md text-on-surface bg-transparent p-0 m-0 appearance-none"
                            min="1"
                          />
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.hash, item.quantity + 1)}
                            className="w-10 h-full flex items-center justify-center border-l border-on-surface hover:bg-surface-variant text-on-surface transition-colors"
                            aria-label="Increase quantity"
                          >
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.hash)}
                          className="font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface hover:underline transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Order Summary (4 cols) */}
              <div className="md:col-span-4 sticky top-28 bg-surface-container-low border border-on-surface p-8 relative">
                <div className="relative z-10">
                  <h2 className="font-headline-md text-headline-md text-on-surface border-b border-on-surface pb-4 mb-6 font-bold">
                    Project Summary
                  </h2>
                  <div className="flex flex-col gap-4 mb-8">
                    <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                      <span>Subtotal</span>
                      <span className="text-on-surface font-semibold">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                      <span>Shipping</span>
                      <span className="text-on-surface text-right">Calculated at next step</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-headline-md text-headline-md text-on-surface border-t border-on-surface pt-6 mb-8 font-bold">
                    <span>Total</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <Link
                    to="/checkout"
                    className="w-full h-14 bg-primary text-on-primary font-button text-button tracking-widest hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center border border-primary font-semibold"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
