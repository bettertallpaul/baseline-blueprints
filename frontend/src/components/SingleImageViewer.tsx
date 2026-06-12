
interface SingleImageViewerProps {
  name: string;
  image: string;
}

export default function SingleImageViewer({ name, image }: SingleImageViewerProps) {
  return (
    <div className="md:col-span-8 bg-surface-container-low border-b md:border-b-0 md:border-r border-on-surface flex items-center justify-center p-margin-mobile md:p-margin-desktop min-h-[400px] md:min-h-[600px]">
      <img
        alt={name}
        className="w-full h-auto object-contain max-h-[600px] mix-blend-multiply"
        src={image}
      />
    </div>
  );
}
