import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    question: "Whose your travel companion?",
    options: [
      "Family",
      "Friends",
      "Partner",
      "Solo"
    ]
  },
  {
    id: 2,
    question: "What's your idea of a perfect day on vacation?",
    options: [
      "Exploring mountain trails and nature",
      "Relaxing on a sunny beach",
      "Sampling local foods and discovering hidden cafes",
      "Visiting museums and historic landmarks"
    ]
  },
  {
    id: 3,
    question: "What's your vacation vibe?",
    options: [
      "Luxury all the way!",
      "I'm on a budget but up for fun!",
      "Just need the essentials, the adventure is what matters!"
    ]
  },
  {
    id: 4,
    question: "Are you a thrill-seeker?",
    options: [
      "Absolutely – bring on the adventure sports!",
      "Moderate – I enjoy active experiences, but nothing extreme",
      "Nope – I prefer taking it easy and relaxing"
    ]
  },
  {
    id: 5,
    question: "How comfortable are you with getting off the beaten path?",
    options: [
      "Very comfortable – I live for adventure!",
      "Somewhat comfortable – I'd like a mix of familiar and new",
      "Not very comfortable – I prefer well-known spots"
    ]
  }
];

const TravelQuestionnaire = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [travelDetails, setTravelDetails] = useState(null);

  useEffect(() => {
    const storedTravelDetails = localStorage.getItem('travelDetails');
    if (storedTravelDetails) {
      setTravelDetails(JSON.parse(storedTravelDetails));
    } else {
      // If no travel details, redirect back to home
      navigate('/');
    }
  }, [navigate]);

  const handleNext = () => {
    if (selectedOption !== null) {
      setAnswers({ ...answers, [currentQuestion]: selectedOption });
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Handle questionnaire completion
        const finalAnswers = { ...answers, [currentQuestion]: selectedOption };
        console.log('Final answers:', finalAnswers);
        console.log('Travel details:', travelDetails);
        // Here you would typically send both the answers and travel details to your backend
        
        // Clear localStorage after processing
        localStorage.removeItem('travelDetails');
        
        // You could navigate to a results page here
        // navigate('/results');
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] || null);
    }
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  return (
    <div className="min-h-screen bg-blue-900">
      {/* Navigation Bar */}
      <nav className="bg-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Check Locations</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Check Activities</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">About Us</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Contact Us</a>
          </div>
          <div className="flex space-x-4">
            <button className="text-blue-600 hover:text-blue-700">Sign Up</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Answer a few quick questions, and let our AI craft your perfect travel itinerary!
        </h1>

        <div className="bg-white rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-medium text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <label
                key={index}
                className={`block cursor-pointer ${
                  selectedOption === index 
                    ? 'bg-blue-100' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center p-4 rounded">
                  <input
                    type="radio"
                    name="option"
                    className="h-4 w-4 text-blue-600"
                    checked={selectedOption === index}
                    onChange={() => handleOptionSelect(index)}
                  />
                  <span className="ml-3 text-gray-700">{option}</span>
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            {currentQuestion > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`px-4 py-2 text-white rounded ${
                selectedOption === null
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelQuestionnaire;
