from flask import Flask, request, jsonify, session
from flask_cors import CORS
from bson import ObjectId
import pymongo
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://10.20.94.122:3000'])

client = pymongo.MongoClient("mongodb+srv://ben:schedulesorcerer1@schedulesorcerery.b4wjqxl.mongodb.net/?retryWrites=true&w=majority")
db = client["UserInformation"]
login_collection = db["LoginSignupInfo"]
bcrypt = Bcrypt(app)

app.secret_key = 'your_secret_key'

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = login_collection.find_one({'email': email})
    if user and bcrypt.check_password_hash(user['password'], password):
        session['user_id'] = str(user['_id'])
        exp = user.get('experience', 0)
        return jsonify({'message': 'Login successful', 'exp': exp}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@app.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    existing_user = login_collection.find_one({'email': email})
    if existing_user:
        return jsonify({'error': 'Email already exists'}), 400

    login_collection.insert_one({'email': email, 'password': hashed_password, 'experience': 0})
    return jsonify({'message': 'Signup successful'}), 200

@app.route('/grab', methods=['GET'])
def grab_exp():
    user_id = session.get('user_id')
    if user_id:
        user = login_collection.find_one({'_id': ObjectId(user_id)})
        if user:
            return jsonify({'experience': user.get('experience', 0)}), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    else:
        return jsonify({'error': 'User not authenticated'}), 403

@app.route('/store', methods=['POST'])
def store_exp():
    user_id = session.get('user_id')
    if user_id:
        exp = request.json.get('experience')
        result = login_collection.update_one({'_id': ObjectId(user_id)}, {'$set': {'experience': exp}})
        if result.modified_count == 1:
            return jsonify({'message': 'Experience stored successfully'}), 200
        else:
            return jsonify({'error': 'Failed to store experience'}), 500
    else:
        return jsonify({'error': 'User not authenticated'}), 403

if __name__ == '__main__':
    app.run()
