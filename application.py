from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse
from sqlalchemy import create_engine
from json import dumps
import urllib
import traceback

import mysql.connector
from mysql.connector import errorcode

#conn = psycopg2.connect(database=database, user=username, password=password, host=server, port="1433")
#cursor = conn.cursor()

	
app = Flask(__name__)
#api = Api(app)


# https://m.youtube.com/watch?v=dkgRxBw_4no
@app.route('/test', methods=['GET'])
def test():
	if request.method == 'GET':
		return jsonify({"resposne": "Get Request Called"})
		
@app.route('/newtable', methods=['GET'])
def newTable():
	retString = "\n"
	try:
		connection = connect()
		cursor = connection.cursor()

		cursor.execute("USE ContactManagerDB;")
		cursor.execute("DROP TABLE IF EXISTS users;")
		retString += "Finished dropping table (if existed)\n"
		cursor.execute("CREATE TABLE users (id serial PRIMARY KEY AUTO_INCREMENT, login_un VARCHAR(50), login_pw VARCHAR(50));")
		retString += "Finished creating table.\n"

		cleanup(connection, cursor)
		retString += "Done.\n"
		return retString

	except Exception as e:
		tb = traceback.format_exc()
		return "Return string:" + retString + "Exception:\n" + tb

@app.route('/addtotable', methods=['GET'])
def addToTable():
	retString = "\n"
	try:
		connection = connect()
		cursor = connection.cursor()

		usrname = request.args.get('usrname', '')
		passwd = request.args.get('passwd', '')
		cursor.execute("USE ContactManagerDB")
		cursor.execute("INSERT INTO users (login_un, login_pw) VALUES (%s, %s);", (usrname, passwd))
		retString += "Inserted a new row: (" + usrname + ", " + passwd + ")\n"

		cleanup(connection, cursor)
		retString += "Done.\n"
		return retString

	except Exception as e:
		tb = traceback.format_exc()
		return "Return string:" + retString + "Exception:\n" + tb

@app.route('/readtable', methods=['GET'])
def readTable():
	retString = "\n"
	try:
		connection = connect()
		cursor = connection.cursor()
		
		usrname = request.args.get('usrname', '')
		passwd = request.args.get('passwd', '')
		cursor.execute("USE ContactManagerDB")
		cursor.execute("SELECT * FROM users;")
		rows = cursor.fetchall()

		retString += "Read " + str(cursor.rowcount) + " row(s) of data.\n"
		# Print all rows
		for row in rows:
			retString += "row = " + str(row[0]) + ": " +  str(row[1]) + " " + str(row[2]) + "\n"

		
		cleanup(connection, cursor)
		retString += "Done.\n"
		return retString

	except Exception as e:
		tb = traceback.format_exc()
		return "Return string:" + retString + "Exception:\n" + tb
	

@app.route('/Users', methods= ['GET', 'PUT', 'POST', 'DELETE'])
def userFunctions():
	
		try:
			connection = connect()
			cursor = connection.cursor()
			
			cursor.execute("USE ContactManagerDB")

			if request.method == 'GET':
				usrname = request.args.get('usrname', '')
				passwd = request.args.get('passwd', '')
				
				#cursor.execute("USE ContactManagerDB INSERT INTO users (username, password) VALUES (%s, %s);", (usrname, passwd))
				
				# DATABASE CALL TO RETREVIVE
				query = "SELECT * FROM users WHERE login_un='{}' AND login_pw='{}';".format(usrname, passwd)
				cursor.execute(query)
				all = cursor.fetchall()				
				return jsonify(all) #"Success" #
			
			elif request.method == 'PUT':
				usrname = request.args.get('usrname', '')
				passwd = request.args.get('passwd', '')
				
				# DATABASE CALL TO INSERT NEW USER
				query = "INSERT INTO users (login_un, login_pw) VALUES (%s, %s);", (usrname, passwd)
				cursor.execute(query)
				
				return jsonify({"result": "Success"}) #
				
			elif request.method == 'POST':
				curUn = request.args.get('curUN', '')
				
				newUN = request.args.get('newUN', '')
				newPW = request.args.get('newPW', '')
				
				# DATABASE CALL TO UPDATE USER
				query = "UPDATE dbo.UserLogin SET login_un={}, login_pw={} WHERE login_un={};".format(newUN, newPW, curUN)
				return "Success"
			
			elif request.method == 'DELETE':
				usrname = request.args.get('usrname', '')
				passwd = request.args.get('passwd', '')
				
				#DATABASE CALL TO REMOVE USER
				query = "DELETE FROM dbo.UserLogin WHERE login_un={} AND login_pw={};".format(usrname, passwd)
				return "Success"
			
			else:
				return "None"
		except Exception as e:
			return "Error: {}".format(e)
		
		else:
			cleanup(connection, cursor)
			
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

		# DATABASE TO GET CONTACT DATA
		
		return jsonify({'contact': {'No Contacts': {'phone': '(xxx)xxx-xxxx'}}})
		
	elif request.method == 'PUT':
		phoneNum = request.args.get()
		address  = request.args.get()
		# OTHER DATA
		
		# DATABASE CALL TO INSERT NEW CONTACT
		
		return "Success"
		
	elif request.method == 'POST':
		phoneNum = request.args.get()
		address  = request.args.get()
		# OTHER DATA
		
		# DATABASE CALL TO UPDATE CONTACT
		
		return "Success"
		
	elif request.method == 'DELETE':
		# DATABASE CALL TO REMOVE CONTACT
		return "Success"
		
	
def connect():
	connection = mysql.connector.connect(user="admins@cop4331group7dbserver", password="#cop4331", host="cop4331group7dbserver.mysql.database.azure.com", port=3306)
	return connection

def cleanup(connection, cursor):
	connection.commit()
	cursor.close()
	connection.close()
	
	
		
		