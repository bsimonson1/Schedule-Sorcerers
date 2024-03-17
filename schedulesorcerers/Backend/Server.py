import psycopg2
from flask import Flask, render_template

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

@app.route('/')
def home():
   conn = get_db_connection()
   cursor = conn.cursor()

   cursor.execute('SELECT * FROM users')
   users = cursor.fetchall()

   conn.close()

if __name__ == '__main__':
   app.run()