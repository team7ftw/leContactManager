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

@app.route("/redirect", methods=["GET"])
		
@app.route('/resetTables', methods=['GET'])
def resetTables():
	retString = "\n"
	try:
		connection = connect()
		cursor = connection.cursor()

		cursor.execute("USE ContactManagerDB;")
		cursor.execute("DROP TABLE IF EXISTS users;")
		retString += "Finished dropping users table (if existed)\n"
		cursor.execute("DROP TABLE IF EXISTS contacts;")
		retString += "Finished dropping contacts table (if existed)\n"
		cursor.execute("CREATE TABLE users (uID INT PRIMARY KEY AUTO_INCREMENT, login_un VARCHAR(50), login_pw VARCHAR(50));")
		retString += "Created new users table.\n"
		cursor.execute("CREATE TABLE contacts (cID INT PRIMARY KEY AUTO_INCREMENT, ref_id INT NOT NULL, firstName VARCHAR(50), lastName VARCHAR(50), phoneNum VARCHAR(16), birthDate VARCHAR(50), address VARCHAR(50), CONSTRAINT  fk_ref_id FOREIGN KEY (ref_id) REFERENCES users (uID));")
		retString += "Created new contacts table.\n"

		cleanup(connection, cursor)
		retString += "Done.\n"
		return retString

	except Exception as e:
		tb = traceback.format_exc()
		return "Return string:" + retString + "Exception:\n" + tb

@app.route('/users', methods= ['GET', 'PUT', 'POST', 'DELETE'])
def userFunctions():
	
		try:
			connection = connect()
			cursor = connection.cursor()
			
			cursor.execute("USE ContactManagerDB")

			if request.method == 'GET':
				usrname = request.args.get('usrname', '')
				passwd = request.args.get('passwd', '')
				
				# DATABASE CALL TO RETREVIVE
				query = "SELECT * FROM users WHERE login_un='{}' AND login_pw='{}';".format(usrname, passwd)
				cursor.execute(query)
				all = cursor.fetchall()	

				cleanup(connection, cursor)
				
				return jsonify(all) #"Success" #
			
			elif request.method == 'PUT':
				usrname = request.args.get('usrname', '')
				passwd = request.args.get('passwd', '')
				
				# DATABASE CALL TO INSERT NEW USER
				query = "INSERT INTO users (login_un, login_pw) VALUES ('{}', '{}');".format(usrname, passwd)
				cursor.execute(query)
				
				cleanup(connection, cursor)
				
				return jsonify({"result": "Success"}) #
				
			elif request.method == 'POST':
				curUn = request.args.get('curUN', '')
				
				newUN = request.args.get('newUN', '')
				newPW = request.args.get('newPW', '')
				
				# DATABASE CALL TO UPDATE USER
				query = "UPDATE users SET login_un='{}', login_pw='{}' WHERE login_un='{}';".format(newUN, newPW, curUN)
				cursor.execute(query)
				
				cleanup(connection, cursor)
				
				return jsonify({"result": "Success"})
			
			elif request.method == 'DELETE':
				usrname = request.args.get('usrname', '')
				passwd = request.args.get('passwd', '')
				
				#DATABASE CALL TO REMOVE USER
				query = "DELETE FROM users WHERE login_un='{}' AND login_pw='{}';".format(usrname, passwd)
				cursor.execute(query)
				
				cleanup(connection, cursor)
				
				return jsonify({"result": "Success"})
			else:
				cleanup(connection, cursor)
				return jsonify({"result": "Success"})
				
		except Exception as e:
			return jsonify({"result": "Error", "Info": str(e)})
			
@app.route('/User/Contacts', methods = ['GET'])
def getUserContacts():
	try:
		connection = connect()
		cursor = connection.cursor()
			
		cursor.execute("USE ContactManagerDB")
		
		if request.method == 'GET':
			usrID = request.args.parse('uID', '')
			
			# DATABASE CALL TO GET ALL CONTACTS THAT BELONG TO USE
			query = "SELECT cID, firstName, lastName FROM contacts WHERE ref_id={}".format(usrID)
			cursor.execute(query)
			
			all = cursor.fetchall()
			
			cleanup(connection, cursor)
			
			return jsonify(all)
		
		else:
			return "None"
	except Exception as e:
		return jsonify({"Error" : str(e)})
			

@app.route('/User/Contacts/Contact', methods = ['GET', 'PUT', 'POST', 'DELETE'])
def userContact():
	try:
		connection = connect()
		cursor = connection.cursor()
			
		cursor.execute("USE ContactManagerDB")

		
		if request.method == 'GET':
			uID = request.args.get('uID', '')
			cID = request.args.get('cID', '')
			
			# DATABASE TO GET CONTACT DATA
			query = "SELECT * FROM contacts WHERE ref_id={} AND cID={}".format(uID, cID) 
			cursor.execute(query)
			all = cursor.fetchall()
			
			cleanup(connection, cursor)
			
			return jsonify(all)
			
		elif request.method == 'PUT':
			json_data = request.get_json(force=True)
			
			uID = json_data['uID']
			fName = json_data['fName']
			lName = json_data['lName']
			phoneNum = json_data['phoneNum']
			address  = json_data['address']
			bDay = json_data['bday']
			
			# DATABASE CALL TO INSERT NEW CONTACT
			query = "INSERT INTO contacts (firstName, lastName, phoneNum, address, birthDate, fk_ref_id) VALUES ('{}', '{}', '{}', '{}', '{}', {});".format(fName, lName, phoneNum, address, bday, uID)
			cursor.execute(query)
			cleanup(connection, cursor)
			
			return jsonify({"result": "Success"})
			
		elif request.method == 'POST':
			json_data = request.get_json(force=True)
			
			uID = json_data['uID']
			cID = json_data['cID']
			fName = json_data['fName']
			lName = json_data['lName']
			phoneNum = json_data['phoneNum']
			address  = json_data['address']
			bDay = json_data['bday']
			
			
			# DATABASE CALL TO UPDATE CONTACT
			query = "UPDATE contacts SET firstName='{}', lastName='{}', phoneNum='{}', address='{}', birthDate='{}' WHERE fk_ref_id={} AND cID={};"format(fName, lName, phoneNum, address, bday, uID, cID)
			cursor.execute(query)
			cleanup(connection, cursor)
			
			return jsonify({"result": "Success"})
			
		elif request.method == 'DELETE':
			json_data = request.get_json(force=True)
			
			uID = json_data['uID']
			cID = json_data['cID']
			
			# DATABASE CALL TO REMOVE CONTACT
			query = "DELETE FROM contacts WHERE cID={} AND fk_ref_id={};".format(cID, uID)
			cursor.execute(query)
			cleanup(connection, cursor)
				
			return jsonify({"result": "Success"})
			
		else:
			cleanup(connection,cursor)
			return jsonify({"Error": "Unsupported command '{}'.".format(request.method)})
	
	except Exception as e:
		return jsonify({"Error": str(e)})
			
		
def connect():
	connection = mysql.connector.connect(user="admins@cop4331group7dbserver", password="#cop4331", host="cop4331group7dbserver.mysql.database.azure.com", port=3306)
	return connection

def cleanup(connection, cursor):
	connection.commit()
	cursor.close()
	connection.close()
	
	
		
		