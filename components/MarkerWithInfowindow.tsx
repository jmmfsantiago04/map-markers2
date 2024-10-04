"use client"
import React, { useState } from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

const MarkerWithInfowindow = ({ markers }) => {
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);

  const handleMarkerClick = (id: number) => {
    setActiveMarkerId(id);
  };

  return (
    <div>
      {/* Map and Markers with InfoWindows */}
      {markers.map((marker) => {
        const [markerRef, markerInstance] = useAdvancedMarkerRef();
        const isActive = activeMarkerId === marker.id;

        return (
          <React.Fragment key={marker.id}>
            <AdvancedMarker
              ref={markerRef}
              onClick={() => handleMarkerClick(marker.id)}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={marker.title}
            />
            {isActive && markerInstance && (
              <InfoWindow
                anchor={markerInstance}
                maxWidth={200}
                onCloseClick={() => setActiveMarkerId(null)}
              >
                <div>
                  <h2 className="font-bold">{marker.title}</h2>
                  <p>{marker.description}</p>
                </div>
              </InfoWindow>
            )}
          </React.Fragment>
        );
      })}
      {/* Marker List */}
      <div className="mt-4">
        <h2 className="text-xl font-bold">Marker List</h2>
        <ul className="list-disc pl-5">
          {markers.map((marker) => (
            <li
              key={marker.id}
              onClick={() => handleMarkerClick(marker.id)}
              className={`cursor-pointer mt-2 ${activeMarkerId === marker.id ? 'text-blue-500' : ''}`}
            >
              <strong>{marker.title}</strong>: {marker.description}
              <br />
              Latitude: {marker.lat}, Longitude: {marker.lng}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MarkerWithInfowindow;
