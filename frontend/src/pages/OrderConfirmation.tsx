import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar.tsx';
import Footer from '../components/Footer.tsx';

interface OrderItem {
  productId: string;
  name: string;
  size: string;
  material: string;
  addons: string[];
  price: number;
  quantity: number;
}

interface Order {
  orderId: string;
  shipping: {
    firstName: string;
    lastName: string;
    company?: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  items: OrderItem[];
  subtotal: number;
  total: number;
  createdAt: string;
}

export default function OrderConfirmation() {
  const location = useLocation();
  const state = location.state as { order?: Order } | null;

  // Fallback mock order if accessed directly (to prevent page crash / empty render)
  const order: Order = state?.order || {
    orderId: "BL-8829-X-MOCK",
    shipping: {
      firstName: "Alexander",
      lastName: "Wright",
      company: "Wright Studio",
      address: "Studio 4B, 1872 Industrial Parkway",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      phone: "206-555-0199"
    },
    items: [
      {
        productId: "bed",
        name: "The Bed Blueprint",
        size: "Queen",
        material: "Natural Birch",
        addons: ["Integrated Headboard"],
        price: 1450,
        quantity: 1
      }
    ],
    subtotal: 1450,
    total: 1600,
    createdAt: new Date().toISOString()
  };

  // Calculate delivery estimate: 7 to 14 business days from createdAt
  const orderDate = new Date(order.createdAt);
  const estMin = new Date(orderDate);
  estMin.setDate(orderDate.getDate() + 7);
  const estMax = new Date(orderDate);
  estMax.setDate(orderDate.getDate() + 14);

  const formatDateRange = (d1: Date, d2: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${d1.toLocaleDateString('en-US', options)} - ${d2.toLocaleDateString('en-US', options)}`;
  };

  const deliveryRange = formatDateRange(estMin, estMax);

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans antialiased pt-20">
      <TopNavBar />

      {/* Main Content Canvas */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-margin-desktop bg-surface-container-low blueprint-grid flex flex-col items-center justify-center relative">
        {/* Transaction Container */}
        <div className="w-full max-w-4xl bg-surface border border-on-surface relative p-margin-mobile md:p-margin-desktop shadow-sm z-10">
          {/* Header Section */}
          <div className="text-center mb-16 border-b border-on-surface pb-8">
            <span
              className="material-symbols-outlined text-headline-lg text-primary mb-4 block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <h1 className="font-display text-headline-lg-mobile md:text-display text-on-surface mb-2 tracking-tight font-bold">
              Order Confirmed
            </h1>
            <p className="font-label-caps text-label-caps text-on-surface-variant flex items-center justify-center gap-2">
              Confirmation ID{' '}
              <span className="bg-surface-variant px-2.5 py-1 border border-on-surface text-on-surface font-bold">
                {order.orderId}
              </span>
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-16">
            {/* Delivery Estimate Box */}
            <div className="border border-on-surface p-6 flex flex-col justify-between">
              <div>
                <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-4 border-b border-outline-variant pb-2 font-bold">
                  Delivery Estimate
                </h2>
                <p className="font-headline-md text-headline-md text-on-surface font-bold">
                  {deliveryRange}
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Standard Freight
                </p>
              </div>
              <span className="material-symbols-outlined text-outline self-end mt-4">local_shipping</span>
            </div>

            {/* Shipping Details Box */}
            <div className="border border-on-surface p-6 flex flex-col justify-between">
              <div>
                <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-4 border-b border-outline-variant pb-2 font-bold">
                  Shipping Details
                </h2>
                <address className="not-italic font-body-md text-body-md text-on-surface space-y-1">
                  <span className="font-bold">
                    {order.shipping.firstName} {order.shipping.lastName}
                  </span>
                  {order.shipping.company && <br />}
                  {order.shipping.company}
                  <br />
                  {order.shipping.address}
                  {order.shipping.apartment && `, ${order.shipping.apartment}`}
                  <br />
                  {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                </address>
              </div>
              <span className="material-symbols-outlined text-outline self-end mt-4">location_on</span>
            </div>
          </div>

          {/* Condensed Order Receipt */}
          <div className="border border-on-surface p-6 mb-16 bg-surface-container-low">
            <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-6 border-b border-outline-variant pb-2 font-bold">
              Order Receipt
            </h2>
            <div className="flex flex-col gap-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-outline-variant pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-surface-container-low border border-on-surface flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-surface-variant">
                        {item.productId === 'bed'
                          ? 'bed'
                          : item.productId === 'table'
                          ? 'table_restaurant'
                          : item.productId === 'seating'
                          ? 'chair'
                          : 'shelves'}
                      </span>
                    </div>
                    <div>
                      <p className="font-body-md text-body-md text-on-surface font-bold">
                        {item.name} - {item.material}
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Qty: {item.quantity} / Size: {item.size}
                        {item.addons.length > 0 && ` / Add-ons: ${item.addons.join(', ')}`}
                      </p>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface font-semibold">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}

              {/* Totals */}
              <div className="flex justify-between items-center pt-2 font-body-md">
                <p className="text-on-surface-variant">Subtotal</p>
                <p className="text-on-surface font-semibold">${order.subtotal.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center font-body-md">
                <p className="text-on-surface-variant">Shipping (Freight)</p>
                <p className="text-on-surface font-semibold">
                  ${(order.total - order.subtotal - Math.round(order.subtotal * 0.085 * 100) / 100).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center font-body-md">
                <p className="text-on-surface-variant">Estimated Tax (8.5%)</p>
                <p className="text-on-surface font-semibold">
                  ${(Math.round(order.subtotal * 0.085 * 100) / 100).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center border-t border-on-surface pt-4 mt-2">
                <p className="font-headline-md text-headline-md text-on-surface font-bold">Total</p>
                <p className="font-headline-md text-headline-md text-on-surface font-bold">
                  ${order.total.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Action */}
          <div className="flex justify-center">
            <Link
              className="inline-flex items-center justify-center bg-primary text-on-primary font-button text-button h-12 px-8 hover:bg-on-primary-fixed-variant transition-colors border border-primary font-bold tracking-widest"
              to="/"
            >
              Back to Blueprints
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
