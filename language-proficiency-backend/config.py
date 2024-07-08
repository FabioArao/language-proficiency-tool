# app/config.py
import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'