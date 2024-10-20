import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function TravelPlanner() {
  const [location, setLocation] = useState('');
  const [departure, setDeparture] = useState('');
  const [return_, setReturn] = useState('');

  const handleCreateItinerary = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Creating itinerary for:', { location, departure, return_ });
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url('https://in.pinterest.com/pin/914862419971235/')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Navigation */}
      <nav className="bg-white/90 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">Check Locations</a>
            <a href="#" className="hover:text-blue-600">Check Activities</a>
            <a href="#" className="hover:text-blue-600">About Us</a>
            <a href="#" className="hover:text-blue-600">Contact Us</a>
          </div>
          <div className="flex gap-4">
            <button className="text-blue-600 hover:underline">Sign Up</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-8 leading-tight">
            Plan your next trip with Us
          </h1>
          
          <form onSubmit={handleCreateItinerary} className="space-y-4">
            <input
              type="text"
              placeholder="Select Location"
              className="w-full p-3 rounded shadow"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            
            <div className="flex gap-4">
              <input
                type="date"
                placeholder="Departure"
                className="flex-1 p-3 rounded shadow"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              />
              <input
                type="date"
                placeholder="Return"
                className="flex-1 p-3 rounded shadow"
                value={return_}
                onChange={(e) => setReturn(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded flex items-center gap-2 hover:bg-blue-700"
            >
              Create Itinerary
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
