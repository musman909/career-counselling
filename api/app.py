import flask
from flask import request, jsonify, session
import mysql.connector
import json
import io
import os

import constants

from flask_cors import CORS


mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="career_counsuelling"
)

app = flask.Flask(__name__)
app.secret_key = os.urandom(24)
CORS(app)

app.config["DEBUG"] = True


@app.route(constants.API + '/sessionCheck', methods=['POST'])
def sessionCheck():
    if 'user_email' in session:
        return {"email": session['user_email']}

    return {}


@app.route(constants.API + '/getUserProfileData', methods=['POST'])
def getProfileData():

    sql = "SELECT * FROM users WHERE email = " + "'"+request.form["email"]+"'"
    mycursor = mydb.cursor()
    mycursor.execute(sql)
    myresult = mycursor.fetchone()

    profileResponse = {"email": myresult[0], "name": myresult[1],
                       "password": myresult[2], "status": myresult[3], "city": myresult[4]}

    sql = "SELECT * FROM user_tests WHERE useremail = " + \
        "'"+request.form["email"]+"'"
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    testsResponse = []
    for test in myresult:
        testsResponse.append({"name": test[2],
                              "data": json.load(io.BytesIO(test[3])), "result": test[4], "date": test[5], })

    response = {
        "profile": profileResponse,
        "tests": testsResponse
    }
    return response


@app.route(constants.API + '/login', methods=['POST'])
def login():

    sql = "SELECT * FROM users WHERE email = " + "'"+request.form["email"]+"'"

    mycursor = mydb.cursor()
    mycursor.execute(sql)
    myresult = mycursor.fetchone()
    response = {}
    if myresult:
        if myresult[2] == request.form["password"]:
            response = {"email": myresult[0]}
            session['user_email'] = myresult[0]
        else:
            response = {"error": True, "input": "password",
                        "message": "Password is incorrect!"}

    else:
        response = {"error": True, "input": "email",
                    "message": "Email does not exists!"}
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
        return {}
    except mysql.connector.Error as err:
        error = str(err)
        return jsonify({"error": error})


@app.route(constants.API + '/editUserProfile', methods=['POST'])
def editProfile():
    sql = "UPDATE users SET name = %s, password = %s, status = %s, city = %s WHERE email = %s"
    val = (request.form["name"], request.form["password"],
           request.form["status"], request.form["city"], request.form["email"])

    try:
        mycursor = mydb.cursor()
        mycursor.execute(sql, val)
        mydb.commit()
        return {}
    except mysql.connector.Error as err:
        error = str(err)
        return jsonify({"error": error})


@app.route(constants.API + '/tests', methods=['POST'])
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


@app.route(constants.API + '/saveFeedback', methods=['POST'])
def saveFeedback():
    sql = "INSERT INTO reviews (email, rating, feedback, date) VALUES (%s, %s, %s, %s)"

    val = (request.form["email"],
           request.form["rating"], request.form["feedback"], request.form["date"])

    mycursor = mydb.cursor()
    mycursor.execute(sql, val)
    mydb.commit()
    return {}


@app.route(constants.API + '/updateFeedback', methods=['POST'])
def updateFeedback():
    sql = "UPDATE reviews SET rating = %s, feedback = %s, date = %s WHERE email = %s"

    val = (request.form["rating"],
           request.form["feedback"], request.form["date"], request.form["email"])

    mycursor = mydb.cursor()
    mycursor.execute(sql, val)
    mydb.commit()
    return {}


@app.route(constants.API + '/getFeedback', methods=['POST'])
def getFeedback():
    sql = "SELECT rating, feedback FROM reviews WHERE email = " + \
        "'"+request.form["email"]+"'"
    mycursor = mydb.cursor()
    mycursor.execute(sql)
    myresult = mycursor.fetchone()

    if myresult == None:
        return {}
    else:
        response = {"rating": myresult[0], "feedback": myresult[1]}
        return jsonify(response)


@app.route(constants.API + '/getUsersReviews', methods=['POST'])
def getReviews():
    sql = "SELECT  name,rating,feedback,date FROM users INNER JOIN reviews USING (email)"
    mycursor = mydb.cursor()
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    print(myresult)
    reviews = []
    for review in myresult:
        reviews.append(
            {"name": review[0], "rating": review[1], "feedback": review[2], "date": review[3]})

    return jsonify(reviews)


@app.route(constants.API + '/logout', methods=['POST'])
def logout():
    session.pop('user_email')
    return {}


@app.route(constants.API + '/testing')
def getData():
    print("hello")
    # print(
    #     type(json.dumps({"label": 'Mobile Software Development', "value": 0})))
    return "hello world"


app.run()
