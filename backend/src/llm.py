from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage
from langchain_core.prompts import HumanMessagePromptTemplate, ChatPromptTemplate
import os, json, re
from dotenv import load_dotenv

load_dotenv()

class LLM:
    def __init__(self):
        api_key=os.getenv("GROQ_API_KEY")
        self.llm=ChatGroq(temperature=0,model="mixtral-8x7b-32768",api_key=api_key)

    def filter_activities(self,data):
        '''
        This function filters out unnecessary fields from the activities data.
        '''
        print(data)
        filtered_data = []
        for activity in data['data']:
            filtered_activity = {
                'id': activity['id'],
                'name': activity['name'],
                'description': activity['description'],
                'geoCode': activity['geoCode'],
                'price': activity['price']
            }
            filtered_data.append(filtered_activity)
        return filtered_data

    def get_curated_activities(self,input_data, available_activities):
        # Extract activity IDs from input
        activity_ids = input_data.get('activityIds', [])

        print(input_data)
        # Check if activity_ids is not empty
        if not activity_ids:
            return {'error': 'No activity IDs provided'}
        
        curated_activities = []
        remaining_activities = []

        available_activities = available_activities['data']  # Extract the 'data' list from available activities

        # Loop through each available activity and check if it is curated or not
        for activity in available_activities:
            activity_id = activity['id']  # Extract activity ID
            
            if activity_id in activity_ids:  # If the activity is curated
                curated_activities.append({
                    'activity_id': activity_id,
                    'name': activity['name'],  
                    'description': activity['description'],
                    'geoCode': activity['geoCode'],
                    'pictures': activity['pictures'],
                    'bookingLink' : activity['bookingLink'],
                    'minimumDuration' : activity['minimumDuration']
                })
            else:  # If the activity is not curated, add to remaining list
                remaining_activities.append({
                    'activity_id': activity_id,
                    'name': activity['name'],  
                    'description': activity['description'],
                    'geoCode': activity['geoCode'],
                    'pictures': activity['pictures'],
                    'bookingLink' : activity['bookingLink'],
                    'minimumDuration' : activity['minimumDuration']
                })

        # Return both curated and remaining activities
        return curated_activities, remaining_activities
    
    def recommend(self,activities,user_data):
        '''
        This function generates a recommendation based on the user's preferences.
        '''
        context=self.filter_activities(activities)
        chat_template = ChatPromptTemplate.from_messages(
        [
            SystemMessage(
                content=(
                    "You are an intelligent travel assistant." 
                    "You will be provided with a list of available activities, the user's trip type, and their activity preferences. "
                    "Your task is to review the activities and select the ones that match the user's trip type and preferences. "
                    "Return the selected activities in a JSON format, including only their activity IDs."
                    "Be sure to consider factors such as the user's trip type (e.g., solo, family, couple, friends) and their preferences" 
                    "(e.g., daytime or nighttime activities, specific types of activities). Output only the activity IDs as a json"
                    "No need of any explaination, just the JSON with the activity IDs"
                    f" Available activities: {context}"
                )
            ),
            HumanMessagePromptTemplate.from_template("User details: {text}"),
        ]
        )
        chain_suggest = chat_template | self.llm
        llmOutput = chain_suggest.invoke({"text": user_data})
        json_match = re.search(r'\{.*\}', llmOutput.content, re.DOTALL)

        if json_match:
            json_str = json_match.group(0)
            try:
                # Parse the JSON string
                activity_json = json.loads(json_str)
            except json.JSONDecodeError:
                print("Error decoding JSON")
        else:
            print("No JSON found in the text")
        
        curated_activites, remaining_activites=self.get_curated_activities(activity_json,activities)
        return curated_activites, remaining_activites

    def location(self,destination):
        chat_template = ChatPromptTemplate.from_messages(
        [
            SystemMessage(
                content=(
                    "You are a geocoding assistant. Given a place name, "
                    "return its latitude and longitude in JSON format with 'latitude' and 'longitude' keys only."
                )
            ),
            HumanMessagePromptTemplate.from_template("Place: {text}"),
        ]
        )
        chain_suggest = chat_template | self.llm
        llmOutput = chain_suggest.invoke({"text": destination})
        llmOutput = llmOutput.content
        json_match = re.search(r'\{.*\}', llmOutput, re.DOTALL)
        
        if json_match:
            json_str = json_match.group(0)
            try:
                # Parse the JSON string
                lat_long_json = json.loads(json_str)
                return lat_long_json
            except json.JSONDecodeError:
                print("Error decoding JSON")
                return None
        else:
            print("No JSON found in the text")
            return None

if __name__=="__main__":
    loc="New York"
    lllm=LLM()
    lat_long=lllm.location(loc)
    print(lat_long)