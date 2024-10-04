"use client"
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
    } catch (error) {
      alert('Error submitting the form');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Marker</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lat" className="block text-sm font-medium text-gray-700">
            Latitude
          </label>
          <input
            type="text"
            id="lat"
            name="lat"
            value={formData.lat}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lng" className="block text-sm font-medium text-gray-700">
            Longitude
          </label>
          <input
            type="text"
            id="lng"
            name="lng"
            value={formData.lng}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Marker
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
