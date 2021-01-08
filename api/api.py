import flask
from flask import request, jsonify
from flask_cors import CORS


app = flask.Flask(__name__)
CORS(app)

@app.route('/get', methods=['GET'])
def get():
   return { "title": 'React GET Request' }

@app.route('/post', methods=['GET'])
def post():
   data = request.args.get('data')
   return data['name']

