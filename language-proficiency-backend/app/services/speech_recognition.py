# app/services/speech_recognition.py
import openai
import os

def transcribe_audio(audio_file):
    openai.api_key = os.environ.get('OPENAI_API_KEY')
    
    try:
        with open(audio_file, "rb") as file:
            transcript = openai.Audio.transcribe("whisper-1", file)
        return transcript['text']
    except Exception as e:
        print(f"An error occurred during transcription: {str(e)}")
        return None