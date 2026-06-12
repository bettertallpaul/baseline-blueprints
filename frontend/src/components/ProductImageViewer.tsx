import { useFeatureIsOn } from '@growthbook/growthbook-react';
import SingleImageViewer from './SingleImageViewer.tsx';
import ThumbnailImageViewer from './ThumbnailImageViewer.tsx';

interface DetailImage {
  src: string;
  label: string;
}

interface ProductImageViewerProps {
  name: string;
  image: string;
  detailImages: DetailImage[];
}

export default function ProductImageViewer({ name, image, detailImages }: ProductImageViewerProps) {
  const isAltGallery = useFeatureIsOn('pdp-image-viewer-layout');

  if (isAltGallery) {
    return <ThumbnailImageViewer name={name} image={image} detailImages={detailImages} />;
  }

  return <SingleImageViewer name={name} image={image} />;
}
