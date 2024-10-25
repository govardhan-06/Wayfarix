import requests
import time
from dotenv import load_dotenv
import os

load_dotenv()

class Amadeus:
    def __init__(self):
        self.AUTH_URL = os.getenv("AMADEUS_AUTH_URL")
        self.CLIENT_ID = os.getenv("AMADEUS_CLIENT_ID")
        self.CLIENT_SECRET = os.getenv("AMADEUS_CLIENT_SECRET")

        # Global variable to store token details
        self.token_info = {
            "access_token": None,
            "expires_in": 0,
            "token_received_at": 0
        }

    def get_bearer_token(self):
        """Fetches a new token and updates the global token_info."""
        # Prepare the data for the POST request
        data = {
            "grant_type": "client_credentials",
            "client_id": self.CLIENT_ID,
            "client_secret": self.CLIENT_SECRET
        }

        try:
            # Make the POST request to get the token
            response = requests.post(self.AUTH_URL, data=data)
            response.raise_for_status()  # Raise error if the request fails

            # Parse and store the token information
            token_data = response.json()
            self.token_info["access_token"] = token_data["access_token"]
            self.token_info["expires_in"] = token_data["expires_in"]
            self.token_info["token_received_at"] = time.time()

        except requests.exceptions.RequestException as e:
            print(f"Error fetching token: {e}")
            return None

    def is_token_expired(self):
        """Checks if the token is expired."""
        current_time = time.time()
        token_age = current_time - self.token_info["token_received_at"]

        # Check if the token has expired
        if token_age >= self.token_info["expires_in"]:
            return True
        return False

    def get_valid_bearer_token(self):
        """Returns a valid token, refreshing it if necessary."""
        if self.token_info["access_token"] is None or self.is_token_expired():
            self.get_bearer_token()
        return self.token_info["access_token"]

    def get_activities(self,latitude, longitude, radius):
        """Fetches activities from Amadeus API based on the location."""
        token = self.get_valid_bearer_token()
        if token is None:
            return None  # In case we failed to get a token

        # Define the API URL with query parameters
        api_url = f"https://test.api.amadeus.com/v1/shopping/activities?latitude={latitude}&longitude={longitude}&radius={radius}"

        # Make the API request with the Bearer token
        headers = {
            "Authorization": f"Bearer {token}"
        }

        try:
            response = requests.get(api_url, headers=headers)
            response.raise_for_status()  # Raise error if the request fails
            return response.json()  # Return the response data
        except requests.exceptions.RequestException as e:
            print(f"API call failed: {e}")
            return None

if __name__=="__main__":
    latitude = 12.971505
    longitude = 77.572367
    radius = 20  # In kilometers

    ama=Amadeus()
    activities = ama.get_activities(latitude, longitude, radius)
    if activities:
        print(activities)
