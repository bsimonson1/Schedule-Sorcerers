from flask import Flask, request, jsonify, session
import pymongo

global usert
global passt

def globalTest():
    global usert
    global passt
    email = "user1@example.com"
    password = "password1"
    usert = email
    passt = password

def woo():

   client = pymongo.MongoClient("mongodb+srv://ben:schedulesorcerer1@schedulesorcerery.b4wjqxl.mongodb.net/?retryWrites=true&w=majority")
   db = client["UserInformation"]
   login_collection = db["LoginSignupInfo"]
    # grab the session user email and password for datbase check
   
   globalTest()
   global usert
   global passt
   

   user = login_collection.find_one({'email': usert, 'password': passt})
    # check to see if the email and password are correct for the current session user
   print(f"{usert} " " {passt}")
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

if __name__ == '__main__':
    woo()