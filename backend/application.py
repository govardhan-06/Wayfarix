from fastapi import FastAPI
from fastapi.responses import RedirectResponse
import uvicorn

app=FastAPI()

@app.get('/')
async def home():
    return RedirectResponse(url="/docs")

if __name__=="__main__":
    uvicorn.run(app,host="0.0.0.0",port=8000)