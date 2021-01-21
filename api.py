import flask
from flask import request, jsonify
import mysql.connector
import json
import io

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
    myresult = mycursor.fetchone()
    # mydb.close()
    return jsonify(myresult)


@app.route('/register', methods=['GET'])
def register():
   data = request.args.get('data')
   data = json.loads(data) 

   sql = "insert into users (email, name, password, status, city) VALUES (%s, %s, %s, %s, %s)"
   val = (data["email"],data["name"],data["password"],data["status"],data["city"]);
   
   try:    
        mycursor = mydb.cursor()
        mycursor.execute(sql, val)
        mydb.commit()
        # print(mycursor.rowcount, "record inserted.")
        mydb.close()
        return {"status": 200}
   except mysql.connector.Error as err:
        print(type(err))
        return {"status": 1062}


@app.route('/tests', methods=['GET'])
def getTests():
    sql = "SELECT id,name FROM tests";
    mycursor = mydb.cursor()
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    result = []
    for a, b in myresult:
        obj = { "id": a, "name": b }
        result.append(obj)
    return jsonify(result)


@app.route('/getTestData', methods=['GET'])
def getTestData():
    data = request.args.get('data')
    data = json.loads(data) 
    sql = "SELECT * FROM tests WHERE id = " + data["id"]
    mycursor = mydb.cursor()
    mycursor.execute(sql)
    myresult = mycursor.fetchone()
    response = {"id": myresult[0], "name": myresult[1], "data": json.load(io.BytesIO(myresult[2]))};
    return jsonify(response)
    











app.run()