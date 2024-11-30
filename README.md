# Wayfarix - AI-Powered Itinerary Planning Platform

## Overview
**Wayfarix** is an AI-powered travel planning platform designed to offer personalized and collaborative itinerary creation for travelers. The platform simplifies travel planning by understanding user preferences and delivering customized itineraries. Users can further tailor their plans by adding activities, sharing itineraries with companions, and accessing real-time recommendations.

Link to Pitch Deck: [WayFarix](https://docs.google.com/presentation/d/16Uy05rzZ-D9d3ruF4Zaq9sPKMfP_A16i/edit?usp=sharing&ouid=100396215887832693875&rtpof=true&sd=true)

## Features

1. **Personalized Itineraries**
   - Generate curated itineraries based on user preferences such as destination, trip type, season, and preferred activities.

2. **Dynamic Recommendations**
   - AI-driven activity suggestions tailored to user preferences using the **Llama 3.1** model.
   - Offers additional activities outside the primary recommendations for a diverse travel experience.

3. **Interactive Itinerary Management**
   - Add or remove activities dynamically from the itinerary.
   - Retrieve and share the final plan with travel companions.

4. **Content Integration**
   - Detailed activity data fetched using **Amadeus API**, including descriptions, images, geocodes, and booking links.

5. **Platform Accessibility**
   - Fully responsive frontend built with **React**, ensuring seamless usage across devices.
   - Scalable backend exposed via REST APIs for user and itinerary management.

6. **Secure & Scalable Deployment**
   - Hosted on **Azure**, ensuring high availability, performance, and security.

7. **Dockerized Environment**
   - Backend runs in a Dockerized setup, streamlining deployment and scalability.

## Technologies Used

### Frontend:
- **React**: For building a user-friendly, interactive interface.

### Backend:
- **FastAPI**: For creating and managing REST APIs for user preferences, recommendations, and itinerary management.
- **Llama 3.1**: For AI-powered activity recommendations tailored to user needs.

### API Integration:
- **Amadeus API**: For fetching comprehensive content related to destinations and activities.

### Deployment:
- **Azure**: For hosting and deployment, ensuring global accessibility and reliability.

### Containerization:
- **Docker**: For consistent and efficient backend environment management.

## How It Works

1. **User Interaction**: Users log in and specify their preferences (trip type, activities, dates).
2. **AI Processing**: The Llama 3.1 model processes inputs to provide tailored recommendations.
3. **Content Integration**: Amadeus API enriches the itinerary with detailed activity information.
4. **Itinerary Management**: Users can modify and finalize their itineraries, which can then be shared with others.
5. **Deployment & Accessibility**: The application, hosted on Azure, ensures accessibility and performance for users worldwide.
