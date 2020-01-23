from flask import Flask
from flask_restful import Api, Resource, reqparse
from sqlalchemy import create_engine
from json import dumps
import urllib

import psycopg2




server = 'team7ftw.database.windows.net'
database = 'ContactManager'
username = 'admins'
password = '#cop4331'
driver = '{ODBC Driver 17 for SQL Server}'

conn = psycopg2.connect(database=database, user=username, password=password, host=server, port="1433")
cursor = conn.cursor()

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


class User(Resource):
	"""Contains any information related to 
	users of this contact manager. 
	"""
	
	def get(self, id):
		conn = db_connect.connect()
		
	def post(self, name):
		pass
	
	def put(self, name):
		pass
		
	def delete(self, name):
		pass