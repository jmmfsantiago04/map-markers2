
'use client';
import React, { useState } from 'react';
import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const MarkerList = ({ markers }) => {
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);

  const handleMarkerClick = (id: number) => {
    setActiveMarkerId(id);
  };

  return (
    <APIProvider apiKey={API_KEY} libraries={['marker']}>
      <Map
        defaultZoom={3}
        defaultCenter={{ lat: 12, lng: 0 }}
        gestureHandling="greedy"
        disableDefaultUI
      >
        {markers.map((marker) => (
          <AdvancedMarker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker.id)}
            title={marker.title}
          >
            <Pin background="#22ccff" borderColor="#1e89a1" />
            {activeMarkerId === marker.id && (
              <InfoWindow
                anchor={{ lat: marker.lat, lng: marker.lng }}
                maxWidth={200}
                onCloseClick={() => setActiveMarkerId(null)}
              >
                <div>
                  <h2>{marker.title}</h2>
                  <p>{marker.description}</p>
                </div>
              </InfoWindow>
            )}
          </AdvancedMarker>
        ))}
      </Map>

      <div className="marker-list mt-4">
        <h2 className="text-xl font-bold">Marker List</h2>
        <ul className="list-disc pl-5">
          {markers.map((marker) => (
            <li
              key={marker.id}
              onClick={() => handleMarkerClick(marker.id)}
              className={`cursor-pointer mt-2 ${
                activeMarkerId === marker.id ? 'text-blue-500' : ''
              }`}
            >
              <strong>{marker.title}</strong>: {marker.description}
              <br />
              Latitude: {marker.lat}, Longitude: {marker.lng}
            </li>
          ))}
        </ul>
      </div>
    </APIProvider>
  );
};

export default MarkerList;
