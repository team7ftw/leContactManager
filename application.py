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
		conn = mysql.connector.connect(user="cweik@cop4331group7dbserver", password="#Pokemon", host="cop4331group7dbserver.mysql.database.azure.com", port=3306)
		retString += "Connected\n"
		cursor = conn.cursor()
		cursor.execute("USE ContactManagerDB;")
		cursor.execute("DROP TABLE IF EXISTS users;")
		retString += "Finished dropping table (if existed)\n"
		cursor.execute("CREATE TABLE users (id serial PRIMARY KEY AUTO_INCREMENT, username VARCHAR(50), password VARCHAR(50));")
		retString += "Finished creating table.\n"
		conn.commit()
		cursor.close()
		conn.close()
		retString += "Done.\n"
		return retString

	except Exception as e:
		tb = traceback.format_exc()
		return "Return string:" + retString + "Exception:\n" + tb

@app.route('/addtotable', methods=['GET'])
def addToTable():
	retString = "\n"
	try:
		conn = mysql.connector.connect(user="cweik@testserver012345", password="#Pokemon", host="testserver012345.mysql.database.azure.com", port=3306)
		retString += "Connected\n"
		usrname = request.args.get('usrname', '')
		passwd = request.args.get('passwd', '')
		cursor = conn.cursor()
		cursor.execute("USE testdatabase012345")
		cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s);", (usrname, passwd))
		retString += "Inserted a new row: (" + usrname + ", " + passwd + ")\n"

		conn.commit()
		cursor.close()
		conn.close()
		retString += "Done.\n"
		return retString

	except Exception as e:
		tb = traceback.format_exc()
		return "Return string:" + retString + "Exception:\n" + tb

@app.route('/readtable', methods=['GET'])
def readTable():
	retString = "\n"
	try:
		conn = mysql.connector.connect(user="cweik@testserver012345", password="#Pokemon", host="testserver012345.mysql.database.azure.com", port=3306)
		retString += "Connected\n"
		cursor = conn.cursor()
		usrname = request.args.get('usrname', '')
		passwd = request.args.get('passwd', '')
		cursor.execute("USE testdatabase012345")
		cursor.execute("SELECT * FROM users;")
		rows = cursor.fetchall()

		retString += "Read " + str(cursor.rowcount) + " row(s) of data.\n"
		# Print all rows
		for row in rows:
			retString += "row = " + str(row[0]) + ": " +  str(row[1]) + " " + str(row[2]) + "\n"

		conn.commit()
		cursor.close()
		conn.close()
		retString += "Done.\n"
		return retString

	except Exception as e:
		tb = traceback.format_exc()
		return "Return string:" + retString + "Exception:\n" + tb
	

@app.route('/Users', methods= ['GET', 'PUT', 'POST', 'DELETE'])
def userFunctions():
		if request.method == 'GET':
			usrname = request.args.get('usrname', '')
			passwd = request.args.get('passwd', '')
			
			
			# DATABASE CALL TO RETREVIVE
			#query = "SELECT * from dbo.UserLogin WHERE login_un={} AND login_pw={}".format(usrname, passwd)
			#cursor.execute(query)
			#all = cursor.fetchall()
			
			
			return "Success" #jsonify(all)
		
		elif request.method == 'PUT':
			usrname = request.args.get('usrname', '')
			passwd = request.args.get('passwd', '')
			
			# DATABASE CALL TO INSERT NEW USER
			#query = "INSERT INTO dbo.UserLogin (login_un, login_pw) VALUES ({0}, {1});".format(usrname, passwd)
			#cursor.execute(query)
			#all = cursor.fetchall()
			
			return "Success" #jsonify(all)
			
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
		
	
		
		
	
		
		