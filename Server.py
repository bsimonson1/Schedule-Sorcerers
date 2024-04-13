from flask import Flask, request, jsonify
import pymongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CORS(app, origins='http://localhost:3000/home')

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
        return jsonify({'message': 'Login successful', 'user': user}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401
    
@app.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')

    login_collection.insert_one({'email': email, 'password': password, 'experience': 0})

    return jsonify({'message': 'Signup successful'}), 200

@app.route('/grab_exp', methods=['GET'])
def grab_exp():
    # grab the session user email and password for datbase check
    global user_email
    global user_password
    user = login_collection.find_one({'email': user_email, 'password': user_password})
    # check to see if the email and password are correct for the current session user
    print({user_email} + " " + {user_password})
    if user:
        experience = user.get('experience', 0)
        return jsonify({'experience': experience}), 200
    else:
        return jsonify({'error': 'User not found or invalid credentials'}), 404

@app.route('/store_exp', methods=['POST'])
def experienceStore():
    global user_email
    global user_password
    exp = request.json.get('experience')
    user = login_collection.find_one({'email': user_email, 'password': user_password})
    if user:
        user.insert_one('experience', exp)
        return jsonify({'experience': exp}), 200
    else:
        return jsonify({'error': 'User not found or invalid credentials'}), 404

if __name__ == '__main__':
   app.run()
