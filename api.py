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

@app.route('/login', methods=['GET'])
def login():
    data = request.args.get('data')
    data = json.loads(data) 
    sql = "SELECT * FROM users WHERE email = %s AND password = %s";
    val = (data["email"],data["password"],);

    mycursor = mydb.cursor()
    mycursor.execute(sql, val)
    myresult = mycursor.fetchall()
    return jsonify(myresult)


@app.route('/register', methods=['GET'])
def register():
   data = request.args.get('data')
   data = json.loads(data) 

   sql = "insert into users (email, name, password, status, city) VALUES (%s, %s, %s, %s, %s)"
   val = (data["email"],data["name"],data["password"],data["status"],data["city"]);

   mycursor = mydb.cursor()
   mycursor.execute(sql, val)
   mydb.commit()
   print(mycursor.rowcount, "record inserted.")
   return data

app.run()