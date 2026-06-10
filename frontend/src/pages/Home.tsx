import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar.tsx';
import CartDrawer from '../components/CartDrawer.tsx';
import Footer from '../components/Footer.tsx';

interface Product {
  id: string;
  name: string;
  tag: string;
  basePrice: number;
  description: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="antialiased min-h-screen flex flex-col font-sans bg-surface text-on-surface">
      <TopNavBar />
      <CartDrawer />

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full max-w-container-max mx-auto pt-20">
        {/* Hero Section */}
        <section className="w-full px-margin-desktop md:px-margin-desktop px-margin-mobile py-margin-desktop mb-8">
          <div className="max-w-4xl">
            <h1 className="font-display text-display text-on-surface mb-8 font-headline-lg">
              The BASELINE Blueprints
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              A collection of modular architectural elements designed to adapt, expand, and endure. Grounded in
              functionalist principles and crafted with precision joinery, each blueprint offers infinite configurations
              for the modern interior canvas.
            </p>
          </div>
        </section>

        {/* Product Grid / Loading / Error */}
        <section className="w-full border-t border-on-surface">
          {loading ? (
            <div className="py-24 text-center">
              <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-label-caps text-label-caps text-secondary">Loading Catalog Blueprint...</p>
            </div>
          ) : error ? (
            <div className="py-24 text-center px-4">
              <span className="material-symbols-outlined text-error text-4xl mb-4">error</span>
              <p className="font-body-md text-error mb-4">Error loading product catalog: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="font-button text-button border border-on-surface px-6 py-2 hover:bg-primary hover:text-on-primary transition-colors"
              >
                Retry Request
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              {products.map((product, index) => {
                const isEven = index % 2 === 0;
                const borderClass = isEven ? 'md:border-r md:border-on-surface' : '';

                return (
                  <div key={product.id} className={`flex flex-col group ${borderClass}`}>
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full aspect-[1.34] bg-surface-container-low overflow-hidden relative block"
                    >
                      <img
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                        src={product.image}
                      />
                      <div className="absolute top-4 left-4 bg-surface border border-on-surface px-2 py-1">
                        <span className="font-label-caps text-[10px] text-on-surface font-bold">
                          {product.tag}
                        </span>
                      </div>
                    </Link>
                    <div className="p-gutter flex flex-col justify-between flex-grow bg-surface">
                      <div>
                        <h2 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">
                          <Link to={`/product/${product.id}`} className="hover:underline">
                            {product.name}
                          </Link>
                        </h2>
                        <p className="font-body-md text-on-surface-variant mb-6">{product.description}</p>
                      </div>
                      <div className="flex items-end justify-between mt-8">
                        <span className="font-body-lg text-on-surface font-semibold">
                          From ${product.basePrice.toLocaleString()}
                        </span>
                        <Link
                          to={`/product/${product.id}`}
                          className="font-button text-button text-on-surface border border-on-surface px-6 py-2.5 hover:bg-primary hover:text-on-primary hover:border-primary transition-colors duration-300 text-center"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
