from flask import Flask, request, jsonify, session
import pymongo



if __name__ == '__main__':

   client = pymongo.MongoClient("mongodb+srv://ben:schedulesorcerer1@schedulesorcerery.b4wjqxl.mongodb.net/?retryWrites=true&w=majority")
   db = client["UserInformation"]
   login_collection = db["LoginSignupInfo"]
    # grab the session user email and password for datbase check
   email = "user1@example.com"
   password = "password1"
   user = login_collection.find_one({'email': email, 'password': password})
    # check to see if the email and password are correct for the current session user
   print(f"{email} " " {password}")
   print(user)
   if user:
        # maybe this is meant to be find not get
        # exp = user.find({'email': email, 'password': password})
        # exp = ([document["experience"] for document in user])
        experience = user.get('experience', 0)
        # return jsonify({'experience': exp}), 200
        print(experience)
   else:
        # return jsonify({'error': 'User not found or invalid credentials'}), 404
        print("error")
