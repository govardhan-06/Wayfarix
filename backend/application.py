from fastapi import FastAPI, Form, Request
from fastapi.responses import RedirectResponse, JSONResponse
import uvicorn
from src.llm import LLM
from src.amadeus import Amadeus
from pydantic import BaseModel
from typing import List
from src.utils.logger import logging

app=FastAPI()

user_data={}
curated,remaining=[],[]
activities=[]

# Pydantic model to validate activity IDs passed in the request
class ActivityIDs(BaseModel):
    activity_ids: List[int]

@app.get('/')
async def home():
    return RedirectResponse(url="/docs")

@app.post("/user/preferences")
async def submit_preferences(
    destination: str = Form(...),
    start_date: str = Form(...),
    end_date: str = Form(...),
    season: str = Form(...),                # Season they are planning to visit (e.g., Spring, Summer)
    trip_type: str = Form(...),             # Type of trip (e.g., solo, family, couple, friends)
    activity_preferences: str = Form(...),   # Comma-separated string of activity preferences (e.g., hiking, museums)
    time_preference: str = Form(...)         # Daytime or nighttime activity preference
):
    """
    Endpoint to collect user preferences from a form.
    
    Parameters:
    - destination: Destination city or location (e.g., Paris).
    - start_date: Trip start date in YYYY-MM-DD format.
    - end_date: Trip end date in YYYY-MM-DD format.
    - season: Season they are planning to visit (e.g., Spring, Summer).
    - trip_type: The type of trip (e.g., solo, family, couple, friends).
    - activity_preferences: A comma-separated string of activity preferences (e.g., hiking, museums).
    - time_preference: Daytime or nighttime activity preference.
    """
    
    user_data = {
        "destination": destination,
        "start_date": start_date,
        "end_date": end_date,
        "season": season,
        "trip_type": trip_type,
        "activity_preferences": activity_preferences,
        "time_preference": time_preference
    }
    
    return JSONResponse(content={"message": "Preferences received", "data": user_data})

@app.get('/user/recommend')
async def recommend_user_preferences():
    '''
    Endpoint to recommend user preferences based on the data collected from the form.
    Will take some time
    '''
    global curated
    global remaining
    latitude=12.971505
    longitude=77.594568
    radius=20
    ama=Amadeus()
    activities = ama.get_activities(latitude, longitude, radius)
    logging.info("Activities received from Amadeus API")
    llm=LLM()
    curated, remaining=llm.recommend(activities, user_data)
    return JSONResponse(content={"message": "Recommendations received", "data": curated})

@app.get('/user/extra-activities')
async def extra_activities():
    '''
    Endpoint to provide extra activities available but not recommended by model.
    '''
    return JSONResponse(content={"message": "Extra Activites", "data": remaining})

@app.post('/user/add-activity')
async def add_activity(activity_ids: ActivityIDs):
    '''
    Endpoint to add extra activities to the prepared itinerary.
    '''
    global curated
    global remaining
    activity_ids_list = list(activity_ids.activity_ids) if hasattr(activity_ids, 'activity_ids') else list(activity_ids)
    for activity in remaining:
        activity_id = int(activity['activity_id'])  # Extract activity ID
        print("\n")
        print(activity_ids_list)
        print(activity_id)
        print(activity_id in activity_ids_list)
        print("\n")
        if activity_id in activity_ids_list:  # If the activity is curated
            curated.append({
                'activity_id': activity_id,
                'name': activity['name'],  
                'description': activity['description'],
                'geoCode': activity['geoCode'],
                'pictures': activity['pictures'],
                'bookingLink' : activity['bookingLink'],
                'minimumDuration' : activity['minimumDuration']
            })

    return JSONResponse(content={"message": "Activities added to the itenary", "status_code":200})

@app.get('/user/get-itenary')
async def get_itenary():
    '''
    Endpoint to retrieve the prepared itenary.
    '''
    return JSONResponse(content={"message": "Itinerary received", "data": curated})

if __name__=="__main__":
    uvicorn.run(app,host="0.0.0.0",port=8000)