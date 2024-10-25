# Wayfarix Backend API Documentation

## Overview

This API is designed to serve as a backend for a travel planning application, providing endpoints for user preferences, activity recommendations, and itinerary management. The backend is exposed as a Docker container running on port `8000`.

### Base URL

```
http://localhost:8000
```

### Redirect Endpoint

- **GET /**  
  Redirects to the API documentation page.
  - **Response:** 302 Redirect to `/docs`

## User Preferences Endpoint

- **POST /user/preferences**  
  Collects user preferences for travel planning.

### Parameters

| Parameter              | Type   | Description                                                             |
| ---------------------- | ------ | ----------------------------------------------------------------------- |
| `destination`          | string | The destination city or location (e.g., Paris).                         |
| `start_date`           | string | Trip start date in `YYYY-MM-DD` format.                                 |
| `end_date`             | string | Trip end date in `YYYY-MM-DD` format.                                   |
| `season`               | string | Season they are planning to visit (e.g., Spring).                       |
| `trip_type`            | string | Type of trip (e.g., solo, family, couple, friends).                     |
| `activity_preferences` | string | Comma-separated string of activity preferences (e.g., hiking, museums). |
| `time_preference`      | string | Daytime or nighttime activity preference.                               |

### Response

- **Status Code:** 200 OK
- **Content:**

```json
{
  "message": "Preferences received",
  "data": {
    "destination": "Paris",
    "start_date": "2024-06-01",
    "end_date": "2024-06-10",
    "season": "Summer",
    "trip_type": "family",
    "activity_preferences": "hiking,museums",
    "time_preference": "daytime"
  }
}
```

## Recommendation Endpoint

- **GET /user/recommend**  
  Recommends activities based on the user preferences collected.

### Response

- **Status Code:** 200 OK
- **Content:**

```json
{
    "message": "Recommendations received",
    "data": [
        {
            "activity_id": 1,
            "name": "Eiffel Tower Tour",
            "description": "A tour of the iconic Eiffel Tower.",
            "geoCode": {...},
            "pictures": [...],
            "bookingLink": "http://example.com/book/eiffel",
            "minimumDuration": "2 hours"
        },
        ...
    ]
}
```

## Extra Activities Endpoint

- **GET /user/extra-activities**  
  Provides additional activities that are available but not recommended by the model.

### Response

- **Status Code:** 200 OK
- **Content:**

```json
{
    "message": "Extra Activities",
    "data": [
        {
            "activity_id": 2,
            "name": "Seine River Cruise",
            "description": "Enjoy a scenic cruise on the Seine River.",
            "geoCode": {...},
            "pictures": [...],
            "bookingLink": "http://example.com/book/seine",
            "minimumDuration": "1 hour"
        },
        ...
    ]
}
```

## Add Activity Endpoint

- **POST /user/add-activity**  
  Adds extra activities to the prepared itinerary.

### Request Body

```json
{
  "activity_ids": [1, 2, 3]
}
```

### Response

- **Status Code:** 200 OK
- **Content:**

```json
{
  "message": "Activities added to the itinerary",
  "status_code": 200
}
```

## Itinerary Retrieval Endpoint

- **GET /user/get-itenary**  
  Retrieves the prepared itinerary.

### Response

- **Status Code:** 200 OK
- **Content:**

```json
{
    "message": "Itinerary received",
    "data": [
        {
            "activity_id": 1,
            "name": "Eiffel Tower Tour",
            "description": "A tour of the iconic Eiffel Tower.",
            "geoCode": {...},
            "pictures": [...],
            "bookingLink": "http://example.com/book/eiffel",
            "minimumDuration": "2 hours"
        },
        ...
    ]
}
```

## Running the Application

To run the application, ensure you have Docker installed, and use the following command to start the server:

```bash
docker run -p 8000:8000 <govardhan06/wayfarix:latest>
```
