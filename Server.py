from flask import Flask, request, jsonify
from bson import ObjectId  # Import ObjectId from bson module
from pymongo import MongoClient
import pymongo
from bson import json_util

app = Flask(__name__)

client = pymongo.MongoClient("mongodb+srv://ben:schedulesorcerer1@schedulesorcerery.b4wjqxl.mongodb.net/?retryWrites=true&w=majority")
db = client["UserInformation"]
login_collection = db["LoginSignupInfo"]
schedule_collection = db["ScheduleInfo"]

global global_email

@app.route('/login', methods=['POST'])
def login():
    global global_email
    email = request.json.get('email')
    password = request.json.get('password')

    user = login_collection.find_one({'email': email, 'password': password})

    if user:
        user['_id'] = str(user['_id'])
        global_email = email
        return jsonify({'message': 'Login successful', 'user': user}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401
    
@app.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')

    login_collection.insert_one({'email': email, 'password': password})

    return jsonify({'message': 'Signup successful'}), 200

@app.route('/schedule_update', methods=['POST'])
def schedule_update():
    global global_email
    data = request.json
    eventName = data.get('eventName')
    priority = data.get("priority")

    schedule_collection.insert_one({"email": global_email, "eventName": eventName, "priority": priority})

    return jsonify({'message': 'Database updated'}), 200

@app.route('/get_events', methods=['GET'])
def get_events():
    global global_email
    events = list(schedule_collection.find({'email': global_email}))
    for event in events:
        event['_id'] = str(event['_id'])
    serialized_events = json_util.dumps({'events': events})
    return serialized_events, 200

if __name__ == '__main__':
   app.run()
