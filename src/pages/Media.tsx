import React from 'react';
import { MediaHeader } from '../components/Media/MediaHeader';
import { MediaFilters } from '../components/Media/Filters/MediaFilters';
import { MediaGrid } from '../components/Media/MediaGrid';

export function Media() {
  return (
    <div className="p-8">
      <MediaHeader />
      <MediaFilters />
      <MediaGrid />
    </div>
  );
}