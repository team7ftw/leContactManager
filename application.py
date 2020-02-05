from flask import Flask, request, jsonify, url_for, send_from_directory, redirect
from flask_restful import Api, Resource, reqparse
from sqlalchemy import create_engine
from json import dumps
import urllib
import traceback

import mysql.connector
from mysql.connector import errorcode

import os

	
app = Flask(__name__)
#api = Api(app)

BASE_URL = "https://cop4331group7api.azurewebsites.net/"
# BASE_URL = "http://localhost:5000/"


# https://m.youtube.com/watch?v=dkgRxBw_4no
@app.route('/dev/resettables', methods=['GET'])
def resetTables():
	retString = "\n"
	try:
		connection = connect()
		cursor = connection.cursor()

		cursor.execute("USE ContactManagerDB;")
		cursor.execute("DROP TABLE IF EXISTS contacts;")
		retString += "Finished dropping contacts table (if existed)\n"
		cursor.execute("DROP TABLE IF EXISTS users;")
		retString += "Finished dropping users table (if existed)\n"
		cursor.execute("CREATE TABLE users (userID INT PRIMARY KEY AUTO_INCREMENT, login_un VARCHAR(50) UNIQUE, login_pw VARCHAR(50));")
		retString += "Created new users table.\n"
		cursor.execute("CREATE TABLE contacts (contactID INT PRIMARY KEY AUTO_INCREMENT, ref_id INT NOT NULL, firstName VARCHAR(50), lastName VARCHAR(50), phoneNumber VARCHAR(10), birthday VARCHAR(6), address VARCHAR(50), imageFilename VARCHAR(100), CONSTRAINT  ref_id FOREIGN KEY (ref_id) REFERENCES users (userID));")
		retString += "Created new contacts table.\n"

		cleanup(connection, cursor)
		retString += "Done.\n"
		return retString

	except Exception as e:
		tb = traceback.format_exc()
		return "Return string:" + retString + "Exception:\n" + tb

@app.route('/dev/showtable/users', methods=['GET'])
def showUsersTable():
	try:
		retString = "\n"
		connection = connect()
		cursor = connection.cursor()
		cursor.execute("USE ContactManagerDB;")

		cursor.execute("SELECT * FROM users;")
		all = cursor.fetchall()
		retString += "Read " + str(cursor.rowcount) + " row(s) of data.\n"
		for row in all:
			retString += "row ="
			for col in row:
				retString += " " + str(col)
			retString += "\n"

		cleanup(connection, cursor)
		retString += "Done.\n"
		return retString

	except Exception as e:
		tb = traceback.format_exc()
		return "Exception:\n" + tb

@app.route('/dev/showtable/contacts', methods=['GET'])
def showContactsTable():
	try:
		retString = "\n"
		connection = connect()
		cursor = connection.cursor()
		cursor.execute("USE ContactManagerDB;")

		cursor.execute("SELECT * FROM contacts;")
		all = cursor.fetchall()
		retString += "Read " + str(cursor.rowcount) + " row(s) of data.\n"
		for row in all:
			retString += "row ="
			for col in row:
				retString += " " + str(col)
			retString += "\n"


		cleanup(connection, cursor)
		retString += "Done.\n"
		return retString

	except Exception as e:
		tb = traceback.format_exc()
		return "Exception:\n" + tb

@app.route('/users', methods= ['PUT', 'POST', 'DELETE'])
def userFunctions():
	
		try:
			connection = connect()
			cursor = connection.cursor()
			cursor.execute("USE ContactManagerDB")
			
			if request.method == 'PUT':
				json_input = request.get_json(force=True)
				username = json_input['username']
				password = json_input['password']
				
				# DATABASE CALL TO INSERT NEW USER
				query = "INSERT INTO users (login_un, login_pw) VALUES ('{}', '{}');".format(username, password)
				cursor.execute(query)
				
				cleanup(connection, cursor)
				
				return jsonify({"result": "Success"})
				
			elif request.method == 'POST':
				json_input = request.get_json(force=True)
				currentUsername = json_input['currentUsername']
				newUsername = json_input['newUsername']
				newPassword = json_input['newPassword']
				
				# DATABASE CALL TO UPDATE USER
				query = "UPDATE users SET login_un='{}', login_pw='{}' WHERE login_un='{}';".format(newUsername, newPassword, currentUsername)
				cursor.execute(query)
				
				cleanup(connection, cursor)
				
				return jsonify({"result": "Success"})
			
			elif request.method == 'DELETE':
				json_input = request.get_json(force=True)
				userID = json_input['userID']
				username = json_input['username']
				password = json_input['password']
				
				#DATABASE CALL TO REMOVE USER
				cursor.execute("DELETE FROM contacts WHERE ref_id = " + str(userID))
				query = "DELETE FROM users WHERE login_un='{}' AND login_pw='{}';".format(username, password)
				cursor.execute(query)
				
				cleanup(connection, cursor)
				
				return jsonify({"result": "Success"})
			else:
				cleanup(connection, cursor)
				return jsonify({"result": "Success"})
				
		except Exception as e:
			return jsonify({"result": "Error", "Info": str(e)})

@app.route('/users/get', methods=['POST'])
def usersGet():
	try:
		connection = connect()
		cursor = connection.cursor()
		cursor.execute("USE ContactManagerDB")

		json_input = request.get_json(force=True)
		username = json_input['username']
		password = json_input['password']
			
		# DATABASE CALL TO RETREVIVE
		query = "SELECT * FROM users WHERE login_un='{}' AND login_pw='{}';".format(username, password)
		cursor.execute(query)
		all = cursor.fetchall()	

		cleanup(connection, cursor)
				
		return jsonify(all)
	
	except Exception as e:
		return jsonify({"result": "Error", "Info": str(e)})

			
@app.route('/user/contacts/get', methods = ['POST'])
def getUserContacts():
	try:
		connection = connect()
		cursor = connection.cursor()
		cursor.execute("USE ContactManagerDB")

		json_data = request.get_json(force=True)
		userID = json_data['userID']
			
		# DATABASE CALL TO GET ALL CONTACTS THAT BELONG TO USE
		query = "SELECT contactID, firstName, lastName FROM contacts WHERE ref_id='{}'".format(userID)
		cursor.execute(query)
			
		all = cursor.fetchall()
			
		cleanup(connection, cursor)
			
		return jsonify(all)

	except Exception as e:
		return jsonify({"Error" : str(e)})
			

@app.route('/user/contacts/contact', methods = ['PUT', 'POST', 'DELETE'])
def userContact():
	try:
		connection = connect()
		cursor = connection.cursor()
		cursor.execute("USE ContactManagerDB")
			
		if request.method == 'PUT':
			json_data = request.get_json(force=True)
			
			userID = json_data['userID']
			firstName = json_data['firstName']
			lastName = json_data['lastName']
			phoneNumber = json_data['phoneNumber']
			address  = json_data['address']
			birthday = json_data['birthday']
			
			# DATABASE CALL TO INSERT NEW CONTACT
			query = "INSERT INTO contacts (ref_id, firstName, lastName, phoneNumber, address, birthday, imageFilename) VALUES ('{}', '{}', '{}', '{}', '{}', '{}', 'default.png');".format(userID, firstName, lastName, phoneNumber, address, birthday)
			cursor.execute(query)
			cleanup(connection, cursor)
			
			return jsonify({"result": "Success"})
			
		elif request.method == 'POST':
			json_data = request.get_json(force=True)
			
			userID = json_data['userID']
			contactID = json_data['contactID']
			firstName = json_data['firstName']
			lastName = json_data['lastName']
			phoneNumber = json_data['phoneNumber']
			address  = json_data['address']
			birthday = json_data['birthday']
			
			
			# DATABASE CALL TO UPDATE CONTACT
			query = "UPDATE contacts SET firstName='{}', lastName='{}', phoneNumber='{}', address='{}', birthday='{}' WHERE ref_id='{}' AND contactID='{}';".format(firstName, lastName, phoneNumber, address, birthday, userID, contactID)
			cursor.execute(query)
			cleanup(connection, cursor)
			
			return jsonify({"result": "Success"})
			
		elif request.method == 'DELETE':
			json_data = request.get_json(force=True)
			
			userID = json_data['userID']
			contactID = json_data['contactID']
			
			# DATABASE CALL TO REMOVE CONTACT
			query = "DELETE FROM contacts WHERE contactID='{}' AND ref_id='{}';".format(contactID, userID)
			cursor.execute(query)
			cleanup(connection, cursor)
				
			return jsonify({"result": "Success"})
			
		else:
			cleanup(connection,cursor)
			return jsonify({"Error": "Unsupported command '{}'.".format(request.method)})
	
	except Exception as e:
		return jsonify({"Error": str(e)})

@app.route('/user/contacts/contact/get', methods = ['POST'])
def userContactsContactGet():
	try:
		connection = connect()
		cursor = connection.cursor()
		cursor.execute("USE ContactManagerDB")

		json_data = request.get_json(force=True)
		userID = json_data['userID']
		contactID = json_data['contactID']
			
		# DATABASE TO GET CONTACT DATA
		query = "SELECT * FROM contacts WHERE ref_id='{}' AND contactID='{}'".format(userID, contactID) 
		cursor.execute(query)
		all = cursor.fetchall()
			
		cleanup(connection, cursor)
			
		return jsonify(all)

	except Exception as e:
		return jsonify({"Error" : str(e)})

@app.route("/user/contacts/contact/photo", methods=['POST'])
def imageTest():
	try:
		connection = connect()
		cursor = connection.cursor()
		cursor.execute("USE ContactManagerDB")

		f = None
		for thisFile in request.files:
			f = request.files[thisFile]
			break
		filename = f.filename
		folder_path = "/contactimages"
		f.save("./contactimages/" + filename)
		stringthing = "UPDATE contacts SET imageFilename = '{}' WHERE contactID = '{}'".format(filename, filename[:filename.index(".")] + ";")
		# return stringthing
		cursor.execute(stringthing)

		return "Successfully saved " + folder_path + "/" + filename + "\n" + "URL for file: " + url_for('uploaded_file', filename=filename)
	except Exception as e:
		return jsonify({"Error" : str(e)})

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)

@app.route('/user/contacts/contact/photo/get', methods=['POST'])
def getContactPhoto():
	try:
		connection = connect()
		cursor = connection.cursor()
		cursor.execute("USE ContactManagerDB")

		json_data = request.get_json(force=True)
		contactID = json_data['contactID']
		cursor.execute("SELECT imageFilename FROM contacts WHERE contactID = '{}'".format(contactID))
		record = cursor.fetchone()
		filename = record[0]

		cleanup(connection,cursor)
		return send_from_directory("./contactimages", filename)

	except Exception as e:
		return jsonify({"Error" : str(e)})


		
def connect():
	connection = mysql.connector.connect(user="admins@cop4331group7dbserver", password="#cop4331", host="cop4331group7dbserver.mysql.database.azure.com", port=3306)
	return connection

def cleanup(connection, cursor):
	connection.commit()
	cursor.close()
	connection.close()
	
	
		
		
