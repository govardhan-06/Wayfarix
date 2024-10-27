import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TravelPlanner from './TravelPlanner';
import TravelQuestionnaire from './TravelQuestionnaire';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TravelPlanner />} />
        <Route path="/questionnaire" element={<TravelQuestionnaire />} />
      </Routes>
    </Router>
  );
};

export default App;

// TravelPlanner.jsx
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TravelPlanner = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleCreateItinerary = () => {
    const travelDetails = {
      selectedLocation,
      departureDate,
      returnDate
    };
    localStorage.setItem('travelDetails', JSON.stringify(travelDetails));
    navigate('/questionnaire');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative h-screen">
        <nav className="absolute top-0 w-full bg-transparent z-10 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex space-x-6 text-white">
              <a href="/" className="hover:text-gray-300">Home</a>
              <a href="#" className="hover:text-gray-300">Check Locations</a>
              <a href="#" className="hover:text-gray-300">Check Activities</a>
              <a href="#" className="hover:text-gray-300">About Us</a>
              <a href="#" className="hover:text-gray-300">Contact Us</a>
            </div>
            <div className="flex space-x-4">
              <button className="text-blue-600 hover:text-blue-700">Sign Up</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Login
              </button>
            </div>
          </div>
        </nav>

        <div className="absolute inset-0">
          <img 
            src="/api/placeholder/1920/1080"
            alt="Mountain landscape with lake reflection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <div className="max-w-4xl mx-auto w-full text-white">
            <h1 className="text-5xl font-bold mb-12">Plan your next trip with Us</h1>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Select Location"
                className="w-full p-4 rounded bg-white text-gray-800"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              />
              
              <div className="text-gray-800">
                <p className="text-white mb-2">Select Date</p>
                <div className="flex gap-4">
                  <input
                    type="date"
                    placeholder="Departure"
                    className="p-4 rounded bg-white flex-1"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                  <input
                    type="date"
                    placeholder="Return"
                    className="p-4 rounded bg-white flex-1"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                  <button
                    onClick={handleCreateItinerary}
                    className="bg-blue-600 text-white px-6 py-4 rounded flex items-center gap-2 hover:bg-blue-700"
                  >
                    Create Itinerary
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Steps Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold mb-12">Plan the Perfect Itinerary</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white text-gray-800 p-8 rounded-lg relative">
              <h3 className="text-xl font-semibold mb-4">Select Location and Date</h3>
              <p className="text-gray-600">
                Select your date and location of travel, and our ML based website would 
                start filtering out activities available.
              </p>
              <div className="absolute -bottom-4 right-8 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold">
                1
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white text-gray-800 p-8 rounded-lg relative">
              <h3 className="text-xl font-semibold mb-4">Fill the Questionnaire</h3>
              <p className="text-gray-600">
                Answer some short and simple questions to assist our model to understand 
                you better
              </p>
              <div className="absolute -bottom-4 right-8 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold">
                2
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white text-gray-800 p-8 rounded-lg relative">
              <h3 className="text-xl font-semibold mb-4">
                Choose activities and finalize your Itinerary
              </h3>
              <p className="text-gray-600">
                Choose the activities suitable for you, from our vast list, Add it to your 
                itinerary, share it with friends or link it to your google calendar.
              </p>
              <div className="absolute -bottom-4 right-8 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold">
                3
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TravelPlanner;

