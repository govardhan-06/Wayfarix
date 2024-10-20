import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Calendar, FileQuestion, ListTodo } from 'lucide-react';

export default function TravelPlanner() {
  const [location, setLocation] = useState('');
  const [departure, setDeparture] = useState('');
  const [return_, setReturn] = useState('');
  const stepsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  const handleCreateItinerary = (e) => {
    e.preventDefault();
    console.log('Creating itinerary for:', { location, departure, return_ });
  };

  const steps = [
    {
      number: 1,
      title: "Select Location and Date",
      description: "Select your date and location of travel, and our ML based website would start filtering out activities available.",
      icon: Calendar
    },
    {
      number: 2,
      title: "Fill the Questionnaire",
      description: "Answer some short and simple questions to assist our model to understand you better",
      icon: FileQuestion
    },
    {
      number: 3,
      title: "Choose activities and finalize your Itinerary",
      description: "Choose the activities suitable for you, from our vast list. Add it to your itinerary, share it with friends or link it to your google calendar.",
      icon: ListTodo
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div 
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url('/api/placeholder/1920/1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Navigation */}
        <nav className="bg-white/90 p-4 fixed w-full top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Check Locations</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Check Activities</a>
              <a href="#" className="hover:text-blue-600 transition-colors">About Us</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a>
            </div>
            <div className="flex gap-4">
              <button className="text-blue-600 hover:underline transition-colors">Sign Up</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Login
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 pt-32">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-5xl font-bold text-white mb-8 leading-tight">
              Plan your next trip with Us
            </h1>
            
            <form onSubmit={handleCreateItinerary} className="space-y-4">
              <input
                type="text"
                placeholder="Select Location"
                className="w-full p-3 rounded shadow transition-transform hover:scale-[1.02]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              
              <div className="flex gap-4">
                <input
                  type="date"
                  placeholder="Departure"
                  className="flex-1 p-3 rounded shadow transition-transform hover:scale-[1.02]"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Return"
                  className="flex-1 p-3 rounded shadow transition-transform hover:scale-[1.02]"
                  value={return_}
                  onChange={(e) => setReturn(e.target.value)}
                />
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded flex items-center gap-2 hover:bg-blue-700 transition-all hover:scale-105"
              >
                Create Itinerary
                <ArrowRight className="animate-bounce" size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="min-h-screen bg-blue-900 py-16 px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Plan the Perfect Itinerary
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => (stepsRef.current[index] = el)}
              className="relative bg-white rounded-lg p-6 shadow-lg opacity-0 translate-y-10 transition-all duration-700 ease-out hover:transform hover:scale-105"
            >
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                <div className="bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold animate-pulse">
                  {step.number}
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center gap-4">
                <step.icon size={32} className="text-blue-900" />
                <h3 className="text-xl font-semibold text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
}
