'use client'
import React, { useState } from 'react';
import { addMarker } from '../actions/addMarker';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lat: '',
    lng: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('lat', formData.lat);
    data.append('lng', formData.lng);

    try {
      const result = await addMarker(data);
      if (result.success) {
        alert('Marker added successfully!');
        setFormData({ title: '', description: '', lat: '', lng: '' });
      } else {
        alert('Failed to add marker');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('Error submitting the form');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add New Marker</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter marker title"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter marker description"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="lat" className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <input
                type="text"
                id="lat"
                name="lat"
                value={formData.lat}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Latitude"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lng" className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <input
                type="text"
                id="lng"
                name="lng"
                value={formData.lng}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Longitude"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Marker
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
