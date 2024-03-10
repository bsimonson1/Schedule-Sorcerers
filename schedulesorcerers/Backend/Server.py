from flask import Flask, render_template
import os

#app = Flask(__name__, template_folder='Frontend')
app = Flask(__name__)
# @app.route("/")
# def run_front():
#     # APP_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#     # TEMPLATE_PATH = os.path.join(APP_PATH, 'templates/')
#     return render_template("index.html")

@app.route('/')
def home():
   return render_template('index.html')
if __name__ == '__main__':
   app.run()