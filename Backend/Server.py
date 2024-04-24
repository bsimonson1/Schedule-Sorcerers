from flask import Flask, request, jsonify, session, redirect, url_for, render_template
from flask_cors import CORS, cross_origin
from bson import ObjectId
import pymongo
from flask_bcrypt import Bcrypt
import os
from twilio.rest import Client as TwilioClient
import datetime
import random
from twilio.base.exceptions import TwilioRestException
from twilio.rest import Client
import pyotp
import qrcode
import io
import base64

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = '*'

client = pymongo.MongoClient("mongodb+srv://ben:schedulesorcerer1@schedulesorcerery.b4wjqxl.mongodb.net/?retryWrites=true&w=majority")
db = client["UserInformation"]
login_collection = db["LoginSignupInfo"]
# bcrypt = Bcrypt(app)

app.secret_key = 'your_secret_key'
# insert Shounak's SID and AUTH TOKEN and make sure to change system settings instead of directly inputting SID and token into command
account_sid = 'AC00a2774157fb4177fdb3ec186ed36dce' # SID: AC00a2774157fb4177fdb3ec186ed36dce
auth_token = '4f5eae63ef51d4da9d0e205745e52ffb' # TOKEN: 4f5eae63ef51d4da9d0e205745e52ffb
twilio_client = Client(account_sid, auth_token)

def generate_random_verification_code():
    return str(random.randint(1000, 9999))


@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = login_collection.find_one({'email': email, 'password': password})

    if user:
        if user.get('two_factor_enabled', False):
            phone_number = user.get('phone_number')
            if phone_number:
                verification_code = generate_random_verification_code()
                try:
                    message = twilio_client.messages.create(
                        body=f"Your verification code is: {verification_code}",
                        from_='5617101363',
                        to=phone_number
                    )
                    session['verification_code'] = verification_code
                    session['verification_code_expiry'] = datetime.datetime.utcnow() + datetime.timedelta(minutes=5)
                    return jsonify({'message': 'Verification required', 'two_factor_required': True}), 200
                except TwilioRestException as e:
                    print(f"Error sending verification code: {e}")
                    return jsonify({'error': 'Failed to send verification code'}), 500
            else:
                return jsonify({'error': 'No phone number associated with account'}), 400
        else:
            session['user_id'] = str(user['_id'])
            exp = user.get('experience', 0)
            level = user.get('level', 0)
            return jsonify({'message': 'Login successful', 'exp': exp, 'level': level}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401


@app.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')

    existing_user = login_collection.find_one({'email': email})
    if existing_user:
        return jsonify({'error': 'Email already exists'}), 400

    login_collection.insert_one({'email': email, 'password': password, 'experience': 0, 'level': 0})
    return jsonify({'message': 'Signup successful'}), 200


@app.route('/grab', methods=['GET', 'OPTIONS'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def grab():
    email = request.args.get('email')
    if email:
        user = login_collection.find_one({'email': email})
        if user:
            return jsonify({'experience': user.get('experience', 0)}), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    else:
        return jsonify({'error': 'Email parameter not provided'}), 400


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


@app.route('/store-level', methods=['POST'])
def store_level():
    user_id = session.get('user_id')
    if user_id:
        level = request.json.get('level')
        result = login_collection.update_one({'_id': ObjectId(user_id)}, {'$set': {'level': level}})
        if result.modified_count == 1:
            return jsonify({'message': 'Level stored successfully'}), 200
        else:
            return jsonify({'error': 'Failed to store level'}), 500
    else:
        return jsonify({'error': 'User not authenticated'}), 403


@app.route('/totp-secret', methods=['POST'])
def totp_secret():
    secret = pyotp.random_base32()
    totp = pyotp.TOTP(secret)
    uri = totp.provisioning_uri(name=request.json.get('email'), issuer_name='YourApp')
    img = qrcode.make(uri)
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    return jsonify(secret=secret, qrCode=f"data:image/png;base64,{img_str}")

@app.route('/verify', methods=['POST'])
def verify():
    secret = request.json['secret']
    token = request.json['token']
    totp = pyotp.TOTP(secret)
    verified = totp.verify(token)
    return jsonify(verified=verified)


if __name__ == '__main__':
    app.run()
