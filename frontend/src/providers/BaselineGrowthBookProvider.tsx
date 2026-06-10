import React, { useEffect } from 'react';
import { GrowthBook, GrowthBookProvider, BrowserCookieStickyBucketService } from '@growthbook/growthbook-react';
import { autoAttributesPlugin } from '@growthbook/growthbook/plugins';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Delegate navigate calls to React Router's navigate function inside the provider
let reactRouterNavigate: ((url: string) => void) | null = null;

const gb = new GrowthBook({
  apiHost: import.meta.env.VITE_GROWTHBOOK_API_HOST || 'http://growthbook.orb.local:3100',
  clientKey: import.meta.env.VITE_GROWTHBOOK_CLIENT_KEY || 'sdk-local-default',
  enableDevMode: import.meta.env.DEV,
  stickyBucketService: new BrowserCookieStickyBucketService({
    jsCookie: Cookies,
  }),
  plugins: [
    autoAttributesPlugin(),
  ],
  navigate: (url) => {
    if (reactRouterNavigate) {
      reactRouterNavigate(url);
    } else {
      window.location.replace(url);
    }
  },
  navigateDelay: 0,
  trackingCallback: (experiment, result) => {
    console.log('GrowthBook Experiment Viewed:', {
      experimentId: experiment.key,
      variationId: result.key,
      value: result.value,
    });
  },
  onFeatureUsage: (featureKey, result) => {
    console.log('GrowthBook Feature Evaluated:', {
      featureKey,
      value: result.value,
      source: result.source,
    });
  },
});

export const BaselineGrowthBookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, subtotal } = useCart();

  // Bind navigation helper
  useEffect(() => {
    reactRouterNavigate = navigate;
    return () => {
      reactRouterNavigate = null;
    };
  }, [navigate]);

  // Keep GrowthBook URL in sync with React Router's location
  useEffect(() => {
    gb.setURL(window.location.href);
  }, [location]);

  // Synchronize custom cart attributes reactively
  useEffect(() => {
    const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const productNamesInCart = cartItems.map((item) => item.name);

    gb.setAttributes({
      ...gb.getAttributes(),
      cartTotal: subtotal,
      cartItemCount,
      productNamesInCart,
    });
  }, [cartItems, subtotal]);

  // Initialize SDK client and start listening for feature updates
  useEffect(() => {
    gb.init({ streaming: true });
  }, []);

  return (
    <GrowthBookProvider growthbook={gb}>
      {children}
    </GrowthBookProvider>
  );
};
