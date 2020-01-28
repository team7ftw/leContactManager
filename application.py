from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse
from sqlalchemy import create_engine
from json import dumps
import urllib

import psycopg2

# import pyodbc


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
#api = Api(app)


# https://m.youtube.com/watch?v=dkgRxBw_4no
@app.route('/test', methods=['GET'])
def test():
	if request.method == 'GET':
		return jsonify({"resposne": "Get Request Called"})
		
'''
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
'''

@app.route('/Users', methods= ['GET', 'PUT', 'POST', 'DELETE'])
def userFunctions():
		if request.method == 'GET':
			usrname = request.args.get('usrname', '')
			passwd = request.args.get('passwd', '')
			
			# DATABASE CALL TO RETREVIVE
			return "Success"
		
		elif request.method == 'PUT':
			usrname = request.args.get('usrname', '')
			passwd = request.args.get('passwd', '')
			
			# DATABASE CALL TO INSERT NEW USER
			return "Sucess"
			
		elif request.method == 'POST':
			usrname = request.args.get('usrname', '')
			passwd = request.args.get('passwd', '')
			
			# DATABASE CALL TO UPDATE USER
			return "Success"
		
		elif request.method == 'DELETE':
			usrname = request.args.get('usrname', '')
			passwd = request.args.get('passwd', '')
			
			#DATABASE CALL TO REMOVE USER
			
			return "Success"
		
		else:
			return "None"
			
@app.route('/User/Contacts', methods = ['GET'])
def getUserContacts():
	if request.method == 'GET':
		user = request.args.parse('usrname', '')
		
		# DATABASE CALL TO GET ALL CONTACTS THAT BELONG TO USER
		
		return jsonify({'contact': {'No Contacts': {'phone': '(xxx)xxx-xxxx'}}})
	
	else:
		return "None"
		

@app.route('/User/Contacts/Contact', methods = ['GET', 'PUT', 'POST', 'DELETE'])
def userContact():
	usrname = request.args.get('usrname', '')
	passwd = request.args.get('passwd', '')
	contactID = request.args.get('contactID', '')
	
	if request.method == 'GET':

		"""DATABASE TO GET CONTACT DATA"""
		
		return jsonify({'contact': {'No Contacts': {'phone': '(xxx)xxx-xxxx'}}})
		
	elif request.method == 'PUT':
		phoneNum = request.args.get()
		address  = request.args.get()
		# OTHER DATA
		
		"""DATABASE CALL TO INSERT NEW CONTACT"""
		
		return "Success"
		
	elif request.method == 'POST':
		phoneNum = request.args.get()
		address  = request.args.get()
		# OTHER DATA
		
		"""DATABASE CALL TO UPDATE CONTACT"""
		
		return "Success"
		
	elif request.method == 'DELETE':
		"""DATABASE CALL TO REMOVE CONTACT"""
		return "Success"
		
	
		
		
	
		
		