import React, { useState } from "react";
import "./Itinerary.css"; // Add your styling here

const App = () => {
  // State for selected activities
  const [selectedItems, setSelectedItems] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const activities = [
    { id: 1, name: "Activity 1", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Activity 2", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Activity 3", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Activity 4", image: "https://via.placeholder.com/150" },
  ];

  const handleAddItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setIsUpdated(true);
  };

  const handleSave = () => {
    setIsUpdated(false);
    alert("Itinerary saved!");
  };

  return (
    <div className="app">
      <header>
        <h1>Your Itinerary is Ready!</h1>
        <div className="actions">
          <button className="save-btn" onClick={handleSave}>
            {isUpdated && <span className="blue-dot" />}
            Save
          </button>
        </div>
      </header>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <p>Click on the plus button to add the activity to your custom itinerary</p>
      <div className="activities">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-card">
            <img src={activity.image} alt={activity.name} />
            <p>{activity.name}</p>
            <button
              className="add-btn"
              onClick={() => handleAddItem(activity.id)}
            >
              {selectedItems.includes(activity.id) ? "✔️" : "+"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

  );
};

export default ItineraryPage;
