import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import Footer from '../components/Footer.tsx';

export default function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Form Fields State
  const [firstName, setFirstName] = useState('Alexander');
  const [lastName, setLastName] = useState('Wright');
  const [company, setCompany] = useState('Wright Studio');
  const [address, setAddress] = useState('Studio 4B, 1872 Industrial Parkway');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('Seattle');
  const [state, setState] = useState('WA');
  const [zipCode, setZipCode] = useState('98101');
  const [phone, setPhone] = useState('206-555-0199');

  // Payment State
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');

  // UI States
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Totals calculations
  const freight = cartItems.length > 0 ? 150 : 0;
  const tax = Math.round(subtotal * 0.085 * 100) / 100; // 8.5% tax
  const total = subtotal + freight + tax;

  if (cartItems.length === 0) {
    return (
      <div className="antialiased min-h-screen flex flex-col font-sans bg-surface text-on-surface">
        <header className="bg-surface fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 border-b border-on-surface">
          <Link className="font-display text-headline-md font-bold tracking-tighter text-on-surface" to="/">BASELINE</Link>
        </header>
        <main className="flex-grow pt-28 flex flex-col items-center justify-center p-8 bg-surface-container-low blueprint-grid">
          <div className="bg-surface border border-on-surface p-12 text-center max-w-md w-full shadow-sm">
            <span className="material-symbols-outlined text-secondary text-5xl mb-4">shopping_bag</span>
            <h2 className="text-headline-md font-bold mb-2">Cart is empty</h2>
            <p className="text-body-md text-on-surface-variant mb-6">You cannot check out with an empty cart.</p>
            <Link
              to="/"
              className="font-button text-button border border-on-surface bg-primary text-on-primary px-8 py-3 hover:bg-on-primary-fixed-variant transition-colors inline-block tracking-widest"
            >
              Browse Blueprints
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      shipping: {
        firstName,
        lastName,
        company,
        address,
        apartment,
        city,
        state,
        zipCode,
        phone,
      },
      billing: {
        firstName,
        lastName,
        company,
        address,
        apartment,
        city,
        state,
        zipCode,
        phone,
      },
      items: cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        size: item.size,
        material: item.material,
        addons: item.addons.map((a) => a.name),
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal,
      total,
    };

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Checkout API failed');
      }

      const data = await res.json();
      if (data.success) {
        clearCart();
        // Navigate to confirmation page passing order details
        navigate('/order-confirmation', { state: { order: data.order } });
      } else {
        throw new Error(data.error || 'Failed to place order');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during checkout. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col pt-20 font-sans">
      {/* Transactional TopNavBar */}
      <header className="bg-surface fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 border-b border-on-surface">
        <Link className="font-display text-headline-md font-bold tracking-tighter text-on-surface" to="/">BASELINE</Link>
        <div className="flex items-center gap-6">
          <Link
            className="text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center p-2 hover:bg-surface-container-high"
            to="/cart"
          >
            <span className="material-symbols-outlined">close</span>
          </Link>
        </div>
      </header>

      {/* Main Checkout Canvas */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-margin-desktop bg-surface-container-low blueprint-grid">
        <div className="bg-surface border border-on-surface p-6 md:p-12 relative z-10">
          <div className="mb-12 border-b border-on-surface pb-4">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold">
              Checkout
            </h1>
          </div>

          {error && (
            <div className="mb-8 p-4 border border-error bg-error-container text-error text-body-md flex items-center gap-3">
              <span className="material-symbols-outlined">error</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-gutter">
            {/* Left Column: Form Info */}
            <div className="w-full lg:w-2/3 pr-0 lg:pr-12 space-y-12">
              {/* Step 1: Shipping Address */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-label-caps text-[10px] bg-on-surface text-surface px-2 py-1 font-bold">
                    S.01
                  </span>
                  <h2 className="font-headline-md text-headline-md font-bold">Shipping Address</h2>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="font-label-caps text-[10px] mb-2 text-on-surface-variant font-bold">
                        First Name
                      </label>
                      <input
                        className="w-full h-12 px-4 border border-on-surface focus:ring-1 focus:ring-primary focus:border-primary bg-transparent"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-label-caps text-[10px] mb-2 text-on-surface-variant font-bold">
                        Last Name
                      </label>
                      <input
                        className="w-full h-12 px-4 border border-on-surface focus:ring-1 focus:ring-primary focus:border-primary bg-transparent"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label-caps text-[10px] mb-2 text-on-surface-variant font-bold">
                      Company (Optional)
                    </label>
                    <input
                      className="w-full h-12 px-4 border border-on-surface focus:ring-1 focus:ring-primary focus:border-primary bg-transparent"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label-caps text-[10px] mb-2 text-on-surface-variant font-bold">
                      Address
                    </label>
                    <input
                      className="w-full h-12 px-4 border border-on-surface focus:ring-1 focus:ring-primary focus:border-primary bg-transparent"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label-caps text-[10px] mb-2 text-on-surface-variant font-bold">
                      Apartment, Suite, etc. (Optional)
                    </label>
                    <input
                      className="w-full h-12 px-4 border border-on-surface focus:ring-1 focus:ring-primary focus:border-primary bg-transparent"
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col md:col-span-1">
                      <label className="font-label-caps text-[10px] mb-2 text-on-surface-variant font-bold">
                        City
                      </label>
                      <input
                        className="w-full h-12 px-4 border border-on-surface focus:ring-1 focus:ring-primary focus:border-primary bg-transparent"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col md:col-span-1">
                      <label className="font-label-caps text-[10px] mb-2 text-on-surface-variant font-bold">
                        State
                      </label>
                      <select
                        className="w-full h-12 px-4 border border-on-surface focus:ring-1 focus:ring-primary focus:border-primary bg-transparent"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="WA">Washington</option>
                        <option value="NY">New York</option>
                        <option value="CA">California</option>
                        <option value="TX">Texas</option>
                      </select>
                    </div>
                    <div className="flex flex-col md:col-span-1">
                      <label className="font-label-caps text-[10px] mb-2 text-on-surface-variant font-bold">
                        Zip Code
                      </label>
                      <input
                        className="w-full h-12 px-4 border border-on-surface focus:ring-1 focus:ring-primary focus:border-primary bg-transparent"
                        type="text"
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label-caps text-[10px] mb-2 text-on-surface-variant font-bold">
                      Phone
                    </label>
                    <input
                      className="w-full h-12 px-4 border border-on-surface focus:ring-1 focus:ring-primary focus:border-primary bg-transparent"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </section>

              {/* Step 2: Shipping Method */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-label-caps text-[10px] bg-on-surface text-surface px-2 py-1 font-bold">
                    S.02
                  </span>
                  <h2 className="font-headline-md text-headline-md font-bold">Shipping Method</h2>
                </div>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-on-surface cursor-pointer hover:bg-surface-variant transition-colors">
                    <div className="flex items-center gap-4">
                      <input
                        defaultChecked
                        className="text-primary focus:ring-primary border-on-surface bg-transparent"
                        name="shipping"
                        type="radio"
                      />
                      <span className="font-body-md">Standard Freight (7-14 Business Days)</span>
                    </div>
                    <span className="font-body-md font-semibold">$150.00</span>
                  </label>
                  <label className="flex items-center justify-between p-4 border border-on-surface cursor-pointer hover:bg-surface-variant transition-colors opacity-50">
                    <div className="flex items-center gap-4">
                      <input
                        disabled
                        className="text-primary focus:ring-primary border-on-surface bg-transparent"
                        name="shipping"
                        type="radio"
                      />
                      <span className="font-body-md">Expedited Freight (3-5 Business Days) - Unavailable</span>
                    </div>
                    <span className="font-body-md font-semibold">$350.00</span>
                  </label>
                </div>
              </section>

              {/* Step 3: Payment */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-label-caps text-[10px] bg-on-surface text-surface px-2 py-1 font-bold">
                    S.03
                  </span>
                  <h2 className="font-headline-md text-headline-md font-bold">Payment</h2>
                </div>
                <div className="border border-on-surface p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-on-surface pb-4 mb-4">
                    <span className="font-label-caps text-[10px] font-bold">CREDIT CARD</span>
                    <span className="material-symbols-outlined text-on-surface-variant">credit_card</span>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label-caps text-[10px] mb-2 text-on-surface-variant font-bold">
                      Card Number
                    </label>
                    <input
                      className="w-full h-12 px-4 border border-on-surface focus:ring-1 focus:ring-primary focus:border-primary bg-transparent text-body-md"
                      placeholder="0000 0000 0000 0000"
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="font-label-caps text-[10px] mb-2 text-on-surface-variant font-bold">
                        Expiration (MM/YY)
                      </label>
                      <input
                        className="w-full h-12 px-4 border border-on-surface focus:ring-1 focus:ring-primary focus:border-primary bg-transparent text-body-md"
                        placeholder="MM/YY"
                        type="text"
                        required
                        value={expiration}
                        onChange={(e) => setExpiration(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-label-caps text-[10px] mb-2 text-on-surface-variant font-bold">
                        Security Code
                      </label>
                      <input
                        className="w-full h-12 px-4 border border-on-surface focus:ring-1 focus:ring-primary focus:border-primary bg-transparent text-body-md"
                        placeholder="CVC"
                        type="text"
                        required
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label-caps text-[10px] mb-2 text-on-surface-variant font-bold">
                      Name on Card
                    </label>
                    <input
                      className="w-full h-12 px-4 border border-on-surface focus:ring-1 focus:ring-primary focus:border-primary bg-transparent text-body-md"
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Order Summary (1/3 width) */}
            <div className="w-full lg:w-1/3 mt-12 lg:mt-0">
              <div className="sticky top-28 bg-surface-container-low border border-on-surface p-6 shadow-sm">
                <h2 className="font-headline-md text-headline-md text-on-surface border-b border-on-surface pb-4 mb-6 font-bold">
                  Project Summary
                </h2>
                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.hash} className="flex gap-4">
                      <div className="w-20 h-20 bg-surface-container-low border border-on-surface overflow-hidden relative shrink-0">
                        <img
                          alt={item.name}
                          className="w-full h-full object-cover mix-blend-multiply grayscale"
                          src={item.image}
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-label-caps text-[10px] text-on-surface font-bold leading-tight max-w-[120px]">
                              {item.name}
                            </h4>
                            <span className="font-body-md text-body-md font-semibold">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                          <p className="font-label-caps text-[9px] text-on-surface-variant mt-1 font-bold">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-label-caps text-[9px] text-on-surface-variant truncate max-w-[150px] font-bold">
                          Mat: {item.material} / Dim: {item.size}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-on-surface pt-4 space-y-4 mb-8">
                  <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                    <span>Freight Estimate</span>
                    <span className="font-semibold">${freight.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                    <span>Tax (8.5% calculated)</span>
                    <span className="font-semibold">${tax.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex justify-between font-headline-md text-headline-md text-on-surface border-t border-on-surface pt-6 mb-8 font-bold">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-on-primary h-14 font-button text-button flex items-center justify-center hover:bg-on-primary-fixed-variant transition-colors border border-primary font-bold tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'PROCESSING...' : 'AUTHORIZE & PLACE ORDER'}
                </button>
                <p className="font-label-caps text-[9px] text-on-surface-variant text-center mt-4 font-bold">
                  SECURE TRANSACTION ENCRYPTED
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
