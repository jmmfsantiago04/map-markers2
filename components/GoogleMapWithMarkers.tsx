'use client';
import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

interface MarkerData {
  id: number;
  lat: number;
  lng: number;
  title: string;
  description: string;
}

interface GoogleMapWithMarkersProps {
  markers: MarkerData[];
}

const GoogleMapWithMarkers: React.FC<GoogleMapWithMarkersProps> = ({ markers }) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);


  const onListClick = (marker: MarkerData) => {
    if (mapRef.current) {
      const { lat, lng } = marker;
      mapRef.current.panTo({ lat: lat, lng: lng });
      mapRef.current.setZoom(5);
 
      setSelectedMarker(marker);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">

      <div className="md:w-2/3 w-full h-1/2 md:h-full">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={{ lat: 37.437041393899676, lng: -4.191635586788259 }}
            zoom={10}
            onLoad={(map) => { mapRef.current = map }}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => setSelectedMarker(marker)}
              />
            ))}

            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="p-2">
                  <h2 className="font-bold text-lg text-blue-600">{selectedMarker.title}</h2>
                  <p className="text-sm text-gray-600">{selectedMarker.description}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="md:w-1/3 w-full h-1/2 md:h-full overflow-y-auto bg-white shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 sticky top-0 bg-white z-10 p-4 border-b border-gray-300">
          Marker List
        </h3>
        <ul className="space-y-6">
          {markers.map((marker) => (
            <li
              key={marker.id}
              className="p-6 bg-gray-100 rounded-lg shadow hover:bg-blue-50 transition duration-200 ease-in-out cursor-pointer"
              onClick={() => onListClick(marker)}
            >
              <h4 className="font-bold text-lg text-gray-900">{marker.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{marker.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GoogleMapWithMarkers;
