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

    sql = "SELECT * FROM students WHERE email = " + \
        "'"+request.form["email"]+"'"
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
    user = request.form["user"]
    sql = "SELECT email, password FROM {}s WHERE email = ".format(
        user) + "'"+request.form["email"]+"'"

    mycursor = mydb.cursor()
    mycursor.execute(sql)
    myresult = mycursor.fetchone()
    print(myresult)
    response = {}
    if myresult:
        if myresult[1] == request.form["password"]:
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
    sql = "insert into students (email, name, password, status, city) VALUES (%s, %s, %s, %s, %s)"
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
    sql = "UPDATE students SET name = %s, password = %s, status = %s, city = %s WHERE email = %s"
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
    sql = "SELECT  name,rating,feedback,date FROM students INNER JOIN reviews USING (email)"
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

# ADMIN


@app.route(constants.API + '/getAdminDashboardData', methods=['POST'])
def getAdminDashboardData():
    response = {}

    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM students")
    mycursor.fetchall()
    response["usersCount"] = mycursor.rowcount

    mycursor.execute("SELECT * FROM student_test_records")
    mycursor.fetchall()
    response["testsCount"] = mycursor.rowcount

    mycursor.execute("SELECT * FROM reviews")
    mycursor.fetchall()
    response["reviewsCount"] = mycursor.rowcount

    mycursor.execute(
        "SELECT email, name, status, city FROM students limit 0,10")
    myresult = mycursor.fetchall()
    users = []
    for user in myresult:
        users.append(
            {"email": user[0], "name": user[1], "status": user[2], "city": user[3]})
    response["users"] = users

    mycursor.execute(
        "SELECT useremail, testname, testresult, testdate FROM student_test_records limit 0,10")
    myresult = mycursor.fetchall()
    tests = []
    for test in myresult:
        tests.append(
            {"email": test[0], "name": test[1], "result": test[2], "date": test[3]})
    response["tests"] = tests

    mycursor.execute(
        "SELECT  name, email, rating,feedback,date FROM students INNER JOIN reviews USING (email) limit 0,10")
    myresult = mycursor.fetchall()
    reviews = []
    for review in myresult:
        reviews.append(
            {"name": review[0], "email": review[1], "rating": review[2], "feedback": review[3], "date": review[4]})
    response["reviews"] = reviews
    return jsonify(response)


@app.route(constants.API + '/testing')
def getData():
    print("hello")
    return "hello world"


app.run()
