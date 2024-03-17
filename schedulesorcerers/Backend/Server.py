import psycopg2
from flask import Flask, request, jsonify

app = Flask(__name__)

def get_db_connection():
    try:
        conn = psycopg2.connect(
            dbname="postgres",
            user="postgres",
            password="ScheduleSorcery",
            host="localhost",
            port="5432"
        )
        return conn
    except psycopg2.Error as e:
        print("Error connecting to the database:", e)
        return None

@app.route('/login', methods=['POST'])
def login():
    # Get email and password from the request
    email = request.json.get('email')
    password = request.json.get('password')

    print("Executing SQL query:")
    print('SELECT * FROM users WHERE email = %s AND pass = %s' % (email, password))

    # Query the database to check if the credentials are valid
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE email = %s AND pass = %s', (email, password))
    user = cursor.fetchone()
    conn.close()

    # Check if user exists and password matches
    if user:
        # Return success response
        return jsonify({'message': 'Login successful', 'user': user}), 200
    else:
        # Return error response
        return jsonify({'error': 'Invalid email or password'}), 401

if __name__ == '__main__':
   app.run()