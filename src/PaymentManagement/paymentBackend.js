const http = require('http');
const port = 2000;
const express = require('express');
const app = express();
const server = http.createServer(app);
var mysql = require('mysql');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const uniqid = require('uniqid');

server.listen(port, ()=>{
    console.log("server started at http://localhost:"+port);
})


// var user = [{email : "",name : "", id : "", cardNumber: "", timestamp:"",status:""}]
// var userdata

  

app.post('/payment', function  (req, res) {
    console.log('hello')
    
    const userdata = req.body;
    console.log(userdata)
    try{
            userdata.id = uniqid();
            // user.push(userdata)
            console.log(userdata)
            insertDb(userdata)
            // console.log('query time')


            res.status(200).json({
                Message: "User added",
                success : true,
                data: userdata                
        })
    
}
catch(err){
    return res.status(500).json({
        message: "Internal Server Error",
        success : false
    })
}
    })

    insertDb = (userdata)=>{
        console.log('in insert')
        var todayDate = Date.now()
        var connection = mysql.createConnection({
            host     : "webdb.cim0emcvx2mb.us-east-1.rds.amazonaws.com",
            user     : "web",
            password : "webrobinder",
            port     : 3306
          });
          
          connection.connect(function(err) {
            if (err) {
              console.error('Database connection failed: ' + err.stack);
              return;
            }
          
            console.log('Connected to database.');
            var sqlquery = `INSERT INTO webEmployee.client VALUES ('${userdata.id}', '${userdata.cardHolderName}', ${userdata.cardNumber}, ${todayDate}, 'SUCCESS')`;
            // var sqlquery = "INSERT INTO webEmployee.client VALUES (123, 'man', 'dude', 123333333, 1626499036, 'SUCCESS')";
            connection.query(sqlquery, function (err, result) {
                if (err) throw err;
                console.log("client record inserted");
              });
            
          });
    }