'use client';

import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { GoogleMap, Marker, InfoWindow } from @visgl/react-google-maps;

type MarkerData = {
  id: number;
  lat: number;
  lng: number;
  title: string;
  curiosity: string;
};

type MapProps = {
  markers: MarkerData[];
  onMarkerClick?: (id: number) => void;
};

const Map = forwardRef(({ markers, onMarkerClick }: MapProps, ref) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const [selectedMarker, setSelectedMarker] = React.useState<MarkerData | null>(null);

  useImperativeHandle(ref, () => ({
    focusMarker: (id: number) => {
      const markerData = markers.find((m) => m.id === id);
      if (markerData && mapRef.current) {
        mapRef.current.setCenter({ lat: markerData.lat, lng: markerData.lng });
        mapRef.current.setZoom(10);
        setSelectedMarker(markerData); // Open info window for the clicked marker
      }
    },
  }));

  return (
    <GoogleMap
      mapContainerStyle={{ height: '400px', width: '100%' }}
      center={{ lat: 0, lng: 0 }}
      zoom={2}
      onLoad={(map) => (mapRef.current = map)} // Save map instance
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => {
            setSelectedMarker(marker);
            if (onMarkerClick) onMarkerClick(marker.id);
          }}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <h3>{selectedMarker.title}</h3>
            <p>{selectedMarker.curiosity}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
});

Map.displayName = 'Map';

export default Map;
