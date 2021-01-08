import flask
from flask import request, jsonify
import mysql.connector
import json

from flask_cors import CORS


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="career_counsuelling"
)

app = flask.Flask(__name__)
CORS(app)

app.config["DEBUG"] = True




@app.route('/', methods=['GET'])

def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''


# A route to return all of the available entries in our catalog.
@app.route('/api/all', methods=['GET'])

def api_all():
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM users")
    myresult = mycursor.fetchall()
    return jsonify(myresult)


#for user register
@app.route('/register', methods=['POST', 'GET'])

def register():
    

    # mycursor = mydb.cursor()
    # mycursor.execute("SELECT * FROM users")
    # myresult = mycursor.fetchall()
    # name = request.args.get('name')
    # email = request.args.get('email')
    # password = request.args.get('password')
    # status = request.args.get('status')
    # city = request.args.get('city')

    print("hello world")
    return jsonify(request.args)
 

@app.route('/post', methods=['GET'])
def post():
   data = request.args.get('data')
   
   data = json.loads(data) 
   print(data["name"])
   sql = "INSERT INTO users 
VALUES (data["email"], data["name"], data["password"], data["city"])";
mycursor = mydb.cursor()
    mycursor.execute(sql)
   return data

app.run()