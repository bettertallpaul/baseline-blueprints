import { useState, useMemo } from 'react';

interface DetailImage {
  src: string;
  label: string;
}

interface ThumbnailImageViewerProps {
  name: string;
  image: string;
  detailImages: DetailImage[];
}

export default function ThumbnailImageViewer({ name, image, detailImages }: ThumbnailImageViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const allImages = useMemo(() => {
    return [{ src: image, label: 'Main View' }, ...detailImages];
  }, [image, detailImages]);


  return (
    <div className="md:col-span-8 bg-surface-container-low border-b md:border-b-0 md:border-r border-on-surface p-margin-mobile md:p-margin-desktop min-h-[400px] md:min-h-[600px] flex flex-col md:flex-row gap-6">
      {/* Desktop Vertical Thumbnails */}
      <div className="hidden md:flex flex-col gap-3 shrink-0 self-center overflow-y-auto max-h-[600px] pr-1">
        {allImages.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`w-16 h-16 flex-shrink-0 border-2 transition-colors duration-200 bg-white overflow-hidden ${
              activeIndex === idx
                ? 'border-primary'
                : 'border-surface-container-low hover:border-primary/50'
            }`}
            aria-label={`View image ${idx + 1}`}
          >
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Viewport and Mobile Thumbnails */}
      <div className="flex-grow flex flex-col justify-center">
        {/* Main Viewport */}
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
          <img
            src={allImages[activeIndex]?.src}
            alt={allImages[activeIndex]?.label || name}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Mobile Horizontal Scrolling Thumbnails */}
        <div className="md:hidden flex overflow-x-auto pb-2 gap-2 mt-4">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`w-16 h-16 flex-shrink-0 border-2 transition-colors duration-200 bg-white overflow-hidden ${
                activeIndex === idx
                  ? 'border-primary'
                  : 'border-surface-container-low hover:border-primary/50'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
