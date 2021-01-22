import flask
from flask import request, jsonify
import mysql.connector
import json
import io

import constants

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


# @app.route('/', methods=['GET'])
# def home():
#     return '''<h1>Distant Reading Archive</h1>
# <p>A prototype API for distant reading of science fiction novels.</p>'''


# # A route to return all of the available entries in our catalog.
# @app.route('/api/all', methods=['GET'])
# def api_all():
#     mycursor = mydb.cursor()
#     mycursor.execute("SELECT * FROM users")
#     myresult = mycursor.fetchall()
#     return jsonify(myresult)


@app.route(constants.API + '/getUserProfileData', methods=['POST'])
def getProfileData():

    sql = "SELECT * FROM users WHERE email = " + request.form["email"]
    mycursor = mydb.cursor()
    mycursor.execute(sql)
    myresult = mycursor.fetchone()

    # SELECT * FROM users INNER JOIN user_tests ON users.email = user_tests.useremail WHERE users.email = 'usman@test.com'

    # mycursor = mydb.cursor()
    # mycursor.execute(sql, val)
    # myresult = mycursor.fetchone()
    response1 = {"email": myresult[0], "name": myresult[1],
                 "password": myresult[2], "status": myresult[3], "city": myresult[4]}

    sql = "SELECT * FROM user_tests WHERE useremail = " + request.form["email"]
    mycursor.execute(sql, val)
    myresult = mycursor.fetchall()
    response2 = []
    for test in myresult:
        response2.append({"useremail": test[1], "testname": test[2],
                          "testdata": test[3], "testresult": test[4], "testdate": test[5], })

    # return jsonify(response)
    return {}


@app.route(constants.API + '/login', methods=['POST'])
def login():

    sql = "SELECT * FROM users WHERE email = %s AND password = %s"
    val = (request.form["email"], request.form["password"],)

    mycursor = mydb.cursor()
    mycursor.execute(sql, val)
    myresult = mycursor.fetchone()
    response = {"email": myresult[0], "name": myresult[1],
                "password": myresult[2], "status": myresult[3], "city": myresult[4]}
    # mydb.close()
    return jsonify(response)


@app.route(constants.API + '/register', methods=['POST'])
def register():
    sql = "insert into users (email, name, password, status, city) VALUES (%s, %s, %s, %s, %s)"
    val = (request.form["email"], request.form["name"],
           request.form["password"], request.form["status"], request.form["city"])

    try:
        mycursor = mydb.cursor()
        mycursor.execute(sql, val)
        mydb.commit()
        return {"status": 200}
    except mysql.connector.Error as err:
        return {"status": 1062}


@app.route(constants.API + '/tests', methods=['GET'])
def getTests():
    sql = "SELECT id,name FROM tests"
    mycursor = mydb.cursor()
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    result = []
    for a, b in myresult:
        obj = {"id": a, "name": b}
        result.append(obj)
    return jsonify(result)


@app.route(constants.API + '/getTestData', methods=['POST'])
def getTestData():
    sql = "SELECT * FROM tests WHERE id = " + request.form["id"]
    mycursor = mydb.cursor()
    mycursor.execute(sql)
    myresult = mycursor.fetchone()
    response = {"id": myresult[0], "name": myresult[1],
                "data": json.load(io.BytesIO(myresult[2]))}
    return jsonify(response)


@app.route(constants.API + '/saveUserTestData', methods=['POST'])
def saveTestData():
    sql = "INSERT INTO user_tests (useremail, testname, testdata, testresult, testdate) VALUES (%s, %s, %s, %s, %s)"

    val = (request.form["useremail"], request.form["testname"],
           request.form["testdata"], request.form["testresult"], request.form["testdate"])

    try:
        mycursor = mydb.cursor()
        mycursor.execute(sql, val)
        mydb.commit()
        print("Recored Added")
        return {"status": 200}
    except mysql.connector.Error as err:
        print(err)
        return {"status": 1062}


@app.route(constants.API + '/testing')
def getData():
    print("hello")
    # print(
    #     type(json.dumps({"label": 'Mobile Software Development', "value": 0})))
    return "hello world"


app.run()
