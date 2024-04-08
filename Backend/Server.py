from flask import Flask, request, jsonify
from bson import ObjectId  # Import ObjectId from bson module
from pymongo import MongoClient
import pymongo

app = Flask(__name__)

client = pymongo.MongoClient("mongodb+srv://ben:schedulesorcerer1@schedulesorcerery.b4wjqxl.mongodb.net/?retryWrites=true&w=majority")
db = client["UserInformation"]
login_collection = db["LoginSignupInfo"]

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = login_collection.find_one({'email': email, 'password': password})

    if user:
        user['_id'] = str(user['_id'])
        return jsonify({'message': 'Login successful', 'user': user}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401
    
@app.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')

    login_collection.insert_one({'email': email, 'password': password})

    return jsonify({'message': 'Signup successful'}), 200

if __name__ == '__main__':
   app.run()
