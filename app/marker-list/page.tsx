// app/marker-list/page.tsx
import React from 'react';
import { getMarkers } from '@/app/actions/getMarkers';
import MarkerList from '@/components/MarkerList';

const MarkerListPage = async () => {
  const markersData = await getMarkers();

  return <MarkerList markers={markersData} />;
};

export default MarkerListPage;
