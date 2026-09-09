import React from 'react';

export function SkeletonCard() {
  return (
    <div className="product-card skeleton-card">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton skeleton-text short"></div>
      <div className="skeleton skeleton-text medium"></div>
      <div className="skeleton skeleton-text short"></div>
      <div className="skeleton skeleton-text price"></div>
      <div className="skeleton skeleton-button"></div>
    </div>
  );
}