from flask import Blueprint, request, jsonify
from ..services import speech_recognition
import tempfile
import os

bp = Blueprint('assessment', __name__, url_prefix='/api/assessment')

@bp.route('/speech-to-text', methods=['POST'])
def speech_to_text():
    print("Received request for speech-to-text")  # Debug print
    if 'audio' not in request.files:
        print("No audio file in request")  # Debug print
        return jsonify({'error': 'No audio file provided'}), 400
    
    audio_file = request.files['audio']
    print(f"Received audio file: {audio_file.filename}")  # Debug print
    
    # Save the file temporarily
    temp_dir = tempfile.mkdtemp()
    temp_path = os.path.join(temp_dir, 'audio.webm')
    audio_file.save(temp_path)
    
    try:
        print(f"Transcribing audio file: {temp_path}")  # Debug print
        text = speech_recognition.transcribe_audio(temp_path)
        if text is None:
            print("Transcription failed")  # Debug print
            return jsonify({'error': 'Transcription failed'}), 500
        print(f"Transcription result: {text}")  # Debug print
        return jsonify({'transcription': text})
    except Exception as e:
        print(f"Error during transcription: {str(e)}")  # Debug print
        return jsonify({'error': str(e)}), 500
    finally:
        # Clean up the temporary file
        os.remove(temp_path)
        os.rmdir(temp_dir)