from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse
from sqlalchemy import create_engine
from json import dumps
import urllib

import psycopg2


"""
Helpful Gubs:
	https://kite.com/blog/python/flask-restful-api-tutorial/
	
"""

server = 'team7ftw.database.windows.net'
database = 'ContactManager'
username = 'admins'
password = '#cop4331'
driver = '{ODBC Driver 17 for SQL Server}'

#conn = psycopg2.connect(database=database, user=username, password=password, host=server, port="1433")
#cursor = conn.cursor()

'''
db_connect = pyodbc.connect('DRIVER='+driver+
				';SERVER='+server+
				';PORT=1433;DATABASE='+database+
				';UID='+username+
				';PWD='+ password
				)
'''
app = Flask(__name__)
api = Api(app)


# https://m.youtube.com/watch?v=dkgRxBw_4no
@app.route('/test', methods=['GET'])
def test():
	if request.method == 'GET':
		return jsonify({"resposne": "Get Request Called"})
		
@app.route('/CMApi/UserID', methods =['GET', 'PUT', 'POST', 'DELETE'])
def userFunctionId(id):
	if request.method == 'GET':
		return get_user()
		
	elif request.method == 'PUT':
		usrname = request.args.get('usrname', '')
		passwd = request.args.get('passwd', '')
		return updateUser(id, usrname, passwd)
	
	elif request.method == 'DELETE':
		return deleteUser(id)
		
		
if __name__ ==  '__main__':
	app.run()
