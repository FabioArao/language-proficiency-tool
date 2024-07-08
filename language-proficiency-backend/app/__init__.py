from flask import Flask
from flask_cors import CORS
from .routes import assessment

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})  # Allow all origins for testing
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB limit
    app.register_blueprint(assessment.bp)
    return app