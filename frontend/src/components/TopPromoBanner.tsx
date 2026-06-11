import { useFeatureIsOn } from '@growthbook/growthbook-react';

export default function TopPromoBanner() {
  const showBanner = useFeatureIsOn('top-promo-banner');
  const bannerText = 'Flash Sale: 20% Off All Blueprints. Limited Time Only.';

  if (!showBanner) return null;

  return (
    <div
      id="top-promo-banner"
      className="h-12 flex items-center justify-center bg-on-background text-on-primary tracking-wide text-sm font-medium select-none"
    >
      {bannerText}
    </div>
  );
}
