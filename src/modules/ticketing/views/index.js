import React from 'react';
import RouteSwitch from 'src/components/RouteSwitch';

export default function index({ routes }) {
  return (
    <div>
      Ticketing Component
      <RouteSwitch routes={routes} />
    </div>
  );
}
