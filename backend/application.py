from fastapi import FastAPI, Form, Request
from fastapi.responses import RedirectResponse, JSONResponse
import uvicorn

app=FastAPI()

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

if __name__=="__main__":
    uvicorn.run(app,host="0.0.0.0",port=8000)