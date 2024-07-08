from flask import Blueprint, jsonify

bp = Blueprint('main', __name__)

@bp.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Welcome to the Language Proficiency Evaluation Tool API"})