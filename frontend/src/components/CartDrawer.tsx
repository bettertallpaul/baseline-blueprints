import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';

export default function CartDrawer() {
  const { cartItems, subtotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 bg-on-surface/10 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-[440px] bg-surface border-l border-on-surface z-50 flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-gutter border-b border-on-surface shrink-0 bg-surface">
          <h2 className="font-headline-md text-headline-md tracking-tight text-on-surface">Your Project</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close panel"
            className="w-10 h-10 flex items-center justify-center border border-transparent hover:border-on-surface text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </header>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto bg-surface-container-low flex flex-col blueprint-grid">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface/50 text-center">
              <span className="material-symbols-outlined text-4xl mb-4 text-secondary">shopping_bag</span>
              <p className="font-body-md text-on-surface-variant">Your project cart is currently empty.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 font-button text-button border border-on-surface px-6 py-2.5 hover:bg-primary hover:text-on-primary hover:border-primary transition-colors duration-300"
              >
                Continue Exploring
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <article key={item.hash} className="flex h-[180px] border-b border-on-surface bg-surface group shrink-0">
                {/* Thumbnail */}
                <Link
                  to={`/product/${item.productId}`}
                  onClick={() => setIsCartOpen(false)}
                  className="w-[140px] h-full border-r border-on-surface shrink-0 relative bg-surface-container-low overflow-hidden block"
                >
                  <img
                    alt={item.name}
                    className="w-full h-full object-cover mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500"
                    src={item.image}
                  />
                </Link>

                {/* Details */}
                <div className="p-4 flex flex-col justify-between grow">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-body-md text-body-md font-bold tracking-wide leading-tight line-clamp-2">
                          <Link
                            to={`/product/${item.productId}`}
                            onClick={() => setIsCartOpen(false)}
                            className="hover:underline"
                          >
                            {item.name}
                          </Link>
                        </h3>
                        <span className="font-label-caps text-label-caps shrink-0">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      {/* Metadata/Specs */}
                      <div className="mt-2.5 flex flex-col gap-1">
                        <div className="flex justify-between">
                          <span className="font-label-caps text-[10px] text-on-surface-variant">Mat</span>
                          <span className="font-label-caps text-[10px] text-on-surface text-right">{item.material}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-label-caps text-[10px] text-on-surface-variant">Dim</span>
                          <span className="font-label-caps text-[10px] text-on-surface text-right">{item.size}</span>
                        </div>
                        {item.addons.length > 0 && (
                          <div className="flex justify-between">
                            <span className="font-label-caps text-[10px] text-on-surface-variant">Add-ons</span>
                            <span className="font-label-caps text-[10px] text-on-surface text-right truncate max-w-[150px]">
                              {item.addons.map(a => a.name).join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls & Remove */}
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-dotted border-on-surface/20">
                      <div className="flex items-center gap-2 border border-on-surface px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.hash, item.quantity - 1)}
                          className="text-xs font-bold hover:text-primary transition-colors"
                        >
                          -
                        </button>
                        <span className="font-label-caps text-label-caps text-on-surface px-1">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.hash, item.quantity + 1)}
                          className="text-xs font-bold hover:text-primary transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.hash)}
                        className="font-label-caps text-[10px] text-error hover:underline"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Footer / Action Area */}
        {cartItems.length > 0 && (
          <footer className="p-gutter border-t border-on-surface bg-surface shrink-0 flex flex-col">
            <div className="flex justify-between items-end mb-6">
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-on-surface-variant mb-1">Project Summary</span>
                <span className="font-body-md text-body-md font-bold tracking-wide">Subtotal</span>
              </div>
              <span className="font-headline-md text-headline-md tracking-tight">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                to="/cart"
                onClick={() => setIsCartOpen(false)}
                className="w-full h-14 border border-on-surface bg-transparent text-on-surface font-button text-button tracking-[0.1em] hover:bg-surface-container-high transition-colors flex items-center justify-center"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full h-14 bg-primary text-on-primary font-button text-button tracking-[0.1em] hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-3"
              >
                Checkout
              </Link>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}
