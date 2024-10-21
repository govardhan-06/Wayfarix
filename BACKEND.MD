# Wayfarix API Documentation

**Base URL**: `http://localhost:8000/`

## **Authentication**

No Authentication

### **Endpoints**

---

### **1. Get User Preferences**

#### **GET /users/preference**

This endpoint allows users to submit their travel preferences, which will be used to generate a personalized itinerary.

### Request Body

The request body must be sent as form data and should contain the following fields:

| Parameter              | Type     | Description                                                              | Example                |
| ---------------------- | -------- | ------------------------------------------------------------------------ | ---------------------- |
| `destination`          | `string` | The destination city or location the user plans to visit.                | `Paris`                |
| `start_date`           | `string` | The trip start date in `YYYY-MM-DD` format.                              | `2024-12-01`           |
| `end_date`             | `string` | The trip end date in `YYYY-MM-DD` format.                                | `2024-12-07`           |
| `season`               | `string` | The season the user plans to visit (e.g., Spring, Summer, Fall, Winter). | `Summer`               |
| `trip_type`            | `string` | The type of trip (e.g., solo, family, couple, friends).                  | `Family`               |
| `activity_preferences` | `string` | A comma-separated list of activity preferences (e.g., hiking, museums).  | `hiking,museums,cafes` |
| `time_preference`      | `string` | The preferred time for activities (e.g., daytime, nighttime).            | `Daytime`              |

### Response

On a successful submission, the response will be in JSON format, structured as follows:

#### Success Response

**Status Code**: `200 OK`

```json
{
  "message": "Preferences received",
  "data": {
    "destination": "Paris",
    "start_date": "2024-12-01",
    "end_date": "2024-12-07",
    "season": "Summer",
    "trip_type": "Family",
    "activity_preferences": ["hiking", "museums", "cafes"],
    "time_preference": "Daytime"
  }
}
```

### Error Response

In case of validation errors or missing fields, the response will return a `422 Bad Request` status with a message indicating the issue.

**Example Error Response**:

**Status Code**: `422 Bad Request`

```json
{
  "detail": "Field 'destination' is required."
}
```

---
