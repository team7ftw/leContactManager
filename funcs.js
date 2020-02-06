var currUser = localStorage.getItem("localLogin"); //? test this
console.log("Logged in as: " +currUser); //for test

// do we need this ???????
var mysql = require('mysql');
/*
var conn = mysql.creatConnection({
	host: // ip address of server running mysql
	user: // user name to your mysql database
	pw:  // corresponding password
	db: // use the specified database
});

conn.connect(function(err){
	if(err) throw err;
	console.log("connection worked");
});
*/

// Adds a new login user with the specified username and password.
function newLogin(){
	
	var uID = document.getElementById("userID").value;
	var pw = document.getElementById("password").value;
	
	var sql = "SELECT * FROM users WHERE login_un = \'"+un+"\' AND login_pw = \'"+pw+"\'";
		
	conn.query(sql, function(err, result){
		if(err) throw err;
		
		if(result[0] == undefined){
			console.log("Username doesn't exist");
			return 0;
		}
		
		if(uID != result[0].username || pw != result[0].password){
			console.log("Incorrect username and/or password");
			return 0;
		}
		
		console.log("Login Success:" +result);
		localStorage.setItem("localLogin", uID);
		
	});
}

//Adds a new contact with the specified information to the specified user’s contacts.
function addContact(){
	
	var uID = document.getElementById("userID").value;
	var fName = document.getElementById("firstName").value;
	var lName = document.getElementById("lastName").value;
	var pNum = document.getElementById("phoneNumber").value;
	var addy = document.getElementById("address").value;
	var bday = document.getElementById("birthday").value;
	
	var sql = "INSERT INTO contacts (ref_id, firstName, lastName, phoneNumber, address, birthday) \ VALUES (\'"+uID+"\',\'"+fName+"\',\'"+lName+"\',\'"+pNum+"\',\'"+addy+"\',\'"+bday+"\')";
	
	conn.query(sql, function(err, result){
		if(err) throw err;
		console.log("contact ID:" + result.insertID + " inserted");
	}
	
}

//TODO
function deleteContact(){
	
	var obj = {
		userID: int currUser,
		contactID: int target.userID
	}
	
	try{
		
	}
	catch(e){
		console.log("Error deleting contact");
	}
}
