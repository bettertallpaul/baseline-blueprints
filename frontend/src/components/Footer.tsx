import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full mt-auto">
      <div className="flex flex-col gap-4 px-margin-desktop py-16 max-w-container-max mx-auto md:px-margin-desktop px-margin-mobile">
        <span className="font-display text-headline-md font-bold text-on-surface">BASELINE</span>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-4 gap-x-8">
          <p className="font-label-caps text-label-caps text-secondary">
            © {new Date().getFullYear()} BASELINE ARCHITECTURAL BLUEPRINTS
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 font-label-caps text-label-caps">
            <Link className="text-secondary hover:text-on-surface underline transition-all duration-300" to="#">
              Materials
            </Link>
            <Link className="text-secondary hover:text-on-surface underline transition-all duration-300" to="#">
              Sustainability
            </Link>
            <Link className="text-secondary hover:text-on-surface underline transition-all duration-300" to="#">
              Terms
            </Link>
            <Link className="text-secondary hover:text-on-surface underline transition-all duration-300" to="#">
              Stockists
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
