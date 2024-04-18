from flask import Flask, request, jsonify, session, make_response
from flask_cors import CORS, cross_origin
from bson import ObjectId
import pymongo
from flask_bcrypt import Bcrypt
#from doqu import OrderModel

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = '*'

client = pymongo.MongoClient("mongodb+srv://ben:schedulesorcerer1@schedulesorcerery.b4wjqxl.mongodb.net/?retryWrites=true&w=majority")
db = client["UserInformation"]
login_collection = db["LoginSignupInfo"]
bcrypt = Bcrypt(app)

app.secret_key = 'your_secret_key'

# def _build_cors_preflight_response():
#     response = make_response()
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     response.headers.add("Access-Control-Allow-Headers", "*")
#     response.headers.add("Access-Control-Allow-Methods", "*")
#     return response

# def _corsify_actual_response(response):
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response

# @app.route("/api/orders", methods=["POST", "OPTIONS"])
# def api_create_order():
#     if request.method == "OPTIONS": # CORS preflight
#         return _build_cors_preflight_response()
#     elif request.method == "POST": # The actual request following the preflight
#         order = OrderModel.create(...) # Whatever.
#         return _corsify_actual_response(jsonify(order.to_dict()))
#     else:
#         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))


@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = login_collection.find_one({'email': email})
    if user and bcrypt.check_password_hash(user['password'], password):
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
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    existing_user = login_collection.find_one({'email': email})
    if existing_user:
        return jsonify({'error': 'Email already exists'}), 400

    login_collection.insert_one({'email': email, 'password': hashed_password, 'experience': 0, 'level': 0})
    return jsonify({'message': 'Signup successful'}), 200

@app.route('/grab', methods=['GET','OPTIONS'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
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

if __name__ == '__main__':
    app.run()
