from flask import Flask, request, jsonify
import pymongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CORS(app, origins='http://localhost:3000/')

client = pymongo.MongoClient("mongodb+srv://ben:schedulesorcerer1@schedulesorcerery.b4wjqxl.mongodb.net/?retryWrites=true&w=majority")
db = client["UserInformation"]
login_collection = db["LoginSignupInfo"]

global user_email
global user_password

@app.route('/login', methods=['POST'])
def login():
    global user_email
    global user_password
    email = request.json.get('email')
    password = request.json.get('password')

    user = login_collection.find_one({'email': email, 'password': password})

    if user:
        user['_id'] = str(user['_id'])
        user_email = email
        user_password = password
        exp = user.get('experience', 0)
        return jsonify({'message': 'Login successful', 'exp': exp}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401
    
@app.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')

    login_collection.insert_one({'email': email, 'password': password, 'experience': 0})

    return jsonify({'message': 'Signup successful'}), 200

@app.route('/grab_exp', methods=['POST'])
def grab_exp():
    email = request.headers.get('email')
    password = request.headers.get('password')
    
    if email and password:
        user = login_collection.find_one({'email': email, 'password': password})
        
        if user:
            experience = user.get('experience', 0)
            return jsonify({'experience': experience}), 200
        else:
            return jsonify({'error': 'User not found or invalid credentials'}), 404
    else:
        return jsonify({'error': 'Email or password not provided in headers'}), 400


@app.route('/store_exp', methods=['POST'])
def experienceStore():
    email = request.json.get('email')
    password = request.json.get('password')
    exp = request.json.get('experience')
    user = login_collection.find_one({'email': email, 'password': password})
    if user:
        user.insert_one('experience', exp)
        return jsonify({'experience': exp}), 200
    else:
        return jsonify({'error': 'User not found or invalid credentials'}), 404

if __name__ == '__main__':
   app.run()
