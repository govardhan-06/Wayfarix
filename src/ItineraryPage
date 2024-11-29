import React, { useState } from 'react';
import { FaPlus, FaCheck, FaCloud } from 'react-icons/fa';

const ItineraryPage = () => {
  const [savedItems, setSavedItems] = useState([]);

  const handleAddToItinerary = (item) => {
    setSavedItems([...savedItems, item]);
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Check Locations</a></li>
            <li><a href="#">Check Activities</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li>
              <a href="#" className={savedItems.length > 0 ? 'has-update' : ''}>
                <FaCloud /> Sign Up
              </a>
            </li>
            <li><a href="#">Login</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <h1>Your itinerary is Ready!</h1>

        <div className="search-container">
          <input type="text" placeholder="Search" />
        </div>

        <div className="activity-grid">
          <div className="activity-card">
            <img src="activity1.jpg" alt="Activity 1" />
            <h3>Lorem ipsum</h3>
            <button onClick={() => handleAddToItinerary('activity1')}>
              <FaPlus />
            </button>
          </div>
          <div className="activity-card">
            <img src="activity2.jpg" alt="Activity 2" />
            <h3>Lorem ipsum</h3>
            <button onClick={() => handleAddToItinerary('activity2')}>
              <FaPlus />
            </button>
          </div>
          <div className="activity-card">
            <img src="activity3.jpg" alt="Activity 3" />
            <h3>Lorem ipsum</h3>
            <button onClick={() => handleAddToItinerary('activity3')}>
              <FaPlus />
            </button>
          </div>
          <div className="activity-card">
            <img src="activity4.jpg" alt="Activity 4" />
            <h3>Lorem ipsum</h3>
            <button onClick={() => handleAddToItinerary('activity4')}>
              <FaPlus />
            </button>
          </div>
        </div>
      </main>

      <footer>
        <p>&copy; 2023 Your Itinerary. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ItineraryPage;
