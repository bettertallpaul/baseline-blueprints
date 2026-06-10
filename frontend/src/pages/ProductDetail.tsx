import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar.tsx';
import CartDrawer from '../components/CartDrawer.tsx';
import Footer from '../components/Footer.tsx';
import { useCart } from '../context/CartContext.tsx';

interface SizeOption {
  id: string;
  name: string;
  priceModifier: number;
}

interface MaterialOption {
  id: string;
  name: string;
  color: string;
  priceModifier: number;
}

interface AddonOption {
  id: string;
  name: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  tag: string;
  basePrice: number;
  description: string;
  detailedDescription: string;
  image: string;
  specImage: string;
  detailImages: { src: string; label: string }[];
  options: {
    sizes: SizeOption[];
    materials: MaterialOption[];
  };
  addons: AddonOption[];
  specs: {
    materials: string[];
    dimensions: string[];
    performance: string[];
  };
}

interface ProductDetailProps {
  id?: string;
}

export default function ProductDetail({ id: propId }: ProductDetailProps) {
  const { id: routeId } = useParams<{ id: string }>();
  const id = propId || routeId;

  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Configuration State
  const [selectedSizeId, setSelectedSizeId] = useState<string>('');
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Product not found');
        }
        return res.json();
      })
      .then((data: Product) => {
        setProduct(data);
        // Set default configurations
        if (data.options.sizes.length > 0) {
          // Default to Queen (index 1) for bed, 8-seater (index 1) for table, or first index
          const defaultSize = data.options.sizes[1] || data.options.sizes[0];
          setSelectedSizeId(defaultSize.id);
        }
        if (data.options.materials.length > 0) {
          // Default to Birch (index 0) for bed, Oak (index 1) for table, or first index
          const defaultMat = id === 'table' ? (data.options.materials[1] || data.options.materials[0]) : data.options.materials[0];
          setSelectedMaterialId(defaultMat.id);
        }
        setSelectedAddonIds([]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="antialiased min-h-screen flex flex-col font-sans bg-surface text-on-surface">
        <TopNavBar />
        <main className="flex-grow pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-label-caps text-label-caps text-secondary">Loading Blueprint specs...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="antialiased min-h-screen flex flex-col font-sans bg-surface text-on-surface">
        <TopNavBar />
        <main className="flex-grow pt-20 flex flex-col items-center justify-center p-8">
          <span className="material-symbols-outlined text-error text-4xl mb-4">error</span>
          <h1 className="text-headline-md font-bold mb-2">Error Loading Product</h1>
          <p className="text-body-md text-on-surface-variant mb-6">{error || 'Product not found'}</p>
          <Link
            to="/"
            className="font-button text-button border border-on-surface px-6 py-2.5 hover:bg-primary hover:text-on-primary transition-colors"
          >
            Back to Blueprints
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Find active configurations
  const activeSize = product.options.sizes.find((s) => s.id === selectedSizeId) || product.options.sizes[0];
  const activeMaterial = product.options.materials.find((m) => m.id === selectedMaterialId) || product.options.materials[0];
  const activeAddons = product.addons.filter((a) => selectedAddonIds.includes(a.id));

  // Compute total price
  const totalPrice =
    product.basePrice +
    (activeSize?.priceModifier || 0) +
    (activeMaterial?.priceModifier || 0) +
    activeAddons.reduce((acc, a) => acc + a.price, 0);

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((i) => i !== addonId) : [...prev, addonId]
    );
  };

  const handleAddToProject = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      size: activeSize?.name || '',
      sizeId: selectedSizeId,
      material: activeMaterial?.name || '',
      materialId: selectedMaterialId,
      addons: activeAddons,
      price: totalPrice,
      quantity: 1,
    });
  };

  // Format technical drawing ID (e.g. A01 for Bed, A04 for Table)
  const technicalDrawingId = product.tag.replace('BLUEPRINT ', 'A');

  return (
    <div className="antialiased min-h-screen flex flex-col font-sans bg-surface text-on-surface">
      <TopNavBar />
      <CartDrawer />

      <main className="flex-grow pt-20">
        {/* Product Configurator Section */}
        <section className="max-w-container-max mx-auto border-b border-on-surface">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Image Area */}
            <div className="md:col-span-8 bg-surface-container-low border-b md:border-b-0 md:border-r border-on-surface flex items-center justify-center p-margin-mobile md:p-margin-desktop min-h-[400px] md:min-h-[600px]">
              <img
                alt={product.name}
                className="w-full h-auto object-contain max-h-[600px] mix-blend-multiply"
                src={product.image}
              />
            </div>

            {/* Configurator Panel */}
            <div className="md:col-span-4 bg-surface p-margin-mobile md:p-margin-desktop flex flex-col justify-center">
              <div className="mb-12">
                <span className="font-label-caps text-label-caps text-primary block mb-2">{product.tag}</span>
                <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg mb-2 font-bold">
                  {product.name}
                </h1>
                <p className="text-body-lg text-secondary font-medium">
                  Starting at ${product.basePrice.toLocaleString()}
                </p>
              </div>

              <form className="space-y-8">
                {/* Sizes option */}
                {product.options.sizes.length > 0 && (
                  <div className="border-t border-on-surface pt-4">
                    <label className="block text-label-caps font-label-caps text-secondary mb-4">
                      Size
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {product.options.sizes.map((size) => (
                        <label key={size.id} className="cursor-pointer">
                          <input
                            type="radio"
                            name="size"
                            value={size.id}
                            checked={selectedSizeId === size.id}
                            onChange={() => setSelectedSizeId(size.id)}
                            className="peer sr-only"
                          />
                          <div className="text-center py-3 border border-on-surface peer-checked:bg-on-surface peer-checked:text-surface transition-colors">
                            <span className="text-button font-button">{size.name}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Materials option */}
                {product.options.materials.length > 0 && (
                  <div className="border-t border-on-surface pt-4">
                    <label className="block text-label-caps font-label-caps text-secondary mb-4">
                      Material
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {product.options.materials.map((mat) => (
                        <label key={mat.id} className="cursor-pointer">
                          <input
                            type="radio"
                            name="material"
                            value={mat.id}
                            checked={selectedMaterialId === mat.id}
                            onChange={() => setSelectedMaterialId(mat.id)}
                            className="peer sr-only"
                          />
                          <div className="text-center py-3 border border-on-surface peer-checked:bg-on-surface peer-checked:text-surface transition-colors flex items-center justify-center gap-2">
                            <div
                              className="w-4 h-4 border border-on-surface"
                              style={{ backgroundColor: mat.color }}
                            />
                            <span className="text-button font-button">{mat.name}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add-ons option */}
                {product.addons.length > 0 && (
                  <div className="border-t border-b border-on-surface py-4">
                    <label className="block text-label-caps font-label-caps text-secondary mb-4">
                      Modular Blueprint Add-ons
                    </label>
                    <div className="space-y-2">
                      {product.addons.map((addon) => (
                        <label key={addon.id} className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selectedAddonIds.includes(addon.id)}
                              onChange={() => handleToggleAddon(addon.id)}
                              className="w-5 h-5 border-on-surface text-on-surface focus:ring-0 rounded-none bg-transparent"
                            />
                            <span className="text-body-md group-hover:text-primary transition-colors">
                              {addon.name}
                            </span>
                          </div>
                          <span className="text-body-md text-secondary">+${addon.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action / Price Box */}
                <div className="pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-body-lg font-bold">Total</span>
                    <span className="text-headline-md font-headline-md font-bold">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={handleAddToProject}
                    className="w-full bg-primary text-on-primary py-4 text-button font-button hover:bg-on-primary-fixed-variant transition-colors tracking-widest"
                    type="button"
                  >
                    Add to Project
                  </button>
                  <p className="text-label-caps font-label-caps text-secondary text-center mt-4">
                    Ships in 4-6 weeks
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Technical Specifications Section */}
        <section className="max-w-container-max mx-auto py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low blueprint-grid border-b border-on-surface">
          <div className="text-center max-w-2xl mx-auto mb-16 relative z-10 bg-surface-container-low p-4">
            <h2 className="text-label-caps font-label-caps text-secondary mb-4">Architectural Utility</h2>
            <h3 className="text-headline-md font-headline-md mb-6 font-bold">Designed for adaptability.</h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              The {product.name.toLowerCase()} scales to your spatial requirements. Add or remove modular components
              as your environment evolves.
            </p>
          </div>

          <div className="border border-on-surface bg-white overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch gap-0">
              {/* Left Column: Specs List */}
              <div className="md:col-span-5 flex flex-col justify-between p-8 md:p-12 border-b md:border-b-0 md:border-r border-on-surface">
                <div>
                  <div className="inline-block border border-on-surface px-2.5 py-1 mb-6 bg-surface">
                    <span className="text-label-caps font-bold text-[10px] tracking-widest">
                      {technicalDrawingId} / TECHNICAL SPECS
                    </span>
                  </div>
                  <h2 className="text-headline-md font-bold mb-6 text-on-surface">
                    Technical Specifications
                  </h2>
                  <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    {product.detailedDescription}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Materials */}
                  <div className="border-t border-on-surface pt-4">
                    <h4 className="text-label-caps text-on-surface mb-2 font-bold">Materials</h4>
                    <ul className="text-body-md text-secondary space-y-1 list-none p-0 m-0">
                      {product.specs.materials.map((m, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Dimensions */}
                  <div className="border-t border-on-surface pt-4">
                    <h4 className="text-label-caps text-on-surface mb-2 font-bold">Dimensions ({activeSize?.name})</h4>
                    <ul className="text-body-md text-secondary space-y-1 list-none p-0 m-0">
                      {product.specs.dimensions.map((d, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Performance */}
                  <div className="border-t border-on-surface pt-4">
                    <h4 className="text-label-caps text-on-surface mb-2 font-bold">Performance</h4>
                    <ul className="text-body-md text-secondary space-y-1 list-none p-0 m-0">
                      {product.specs.performance.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Technical Drawing Image */}
              <div className="md:col-span-7 flex items-center justify-center bg-white p-8 md:p-12 min-h-[300px]">
                <img
                  alt="Technical diagram assembly"
                  className="w-full h-auto object-contain mix-blend-multiply max-h-[500px]"
                  src={product.specImage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Grid Section */}
        {product.detailImages.length > 0 && (
          <section className="max-w-container-max mx-auto py-section-gap px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Left Column: Primary Detail Image */}
              {product.detailImages[0] && (
                <div className="md:col-span-7 relative border border-on-surface bg-surface overflow-hidden aspect-[4/5] md:aspect-auto md:h-[600px] group">
                  <img
                    src={product.detailImages[0].src}
                    alt={product.detailImages[0].label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white border border-on-surface px-3 py-1.5">
                    <span className="font-label-caps text-on-surface tracking-wider font-bold">
                      {product.detailImages[0].label}
                    </span>
                  </div>
                </div>
              )}

              {/* Right Column: Secondary Detail Images */}
              <div className="md:col-span-5 flex flex-col gap-4">
                {product.detailImages[1] && (
                  <div className="relative border border-on-surface bg-surface overflow-hidden h-[292px] group">
                    <img
                      src={product.detailImages[1].src}
                      alt={product.detailImages[1].label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white border border-on-surface px-3 py-1.5">
                      <span className="font-label-caps text-on-surface tracking-wider font-bold">
                        {product.detailImages[1].label}
                      </span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 h-[292px]">
                  {product.detailImages[2] && (
                    <div className="relative border border-on-surface bg-surface overflow-hidden group">
                      <img
                        src={product.detailImages[2].src}
                        alt={product.detailImages[2].label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white border border-on-surface px-3 py-1.5">
                        <span className="font-label-caps text-on-surface tracking-wider font-bold truncate max-w-[120px] block">
                          {product.detailImages[2].label}
                        </span>
                      </div>
                    </div>
                  )}
                  {product.detailImages[3] && (
                    <div className="relative border border-on-surface bg-surface overflow-hidden group">
                      <img
                        src={product.detailImages[3].src}
                        alt={product.detailImages[3].label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white border border-on-surface px-3 py-1.5">
                        <span className="font-label-caps text-on-surface tracking-wider font-bold truncate max-w-[120px] block">
                          {product.detailImages[3].label}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
