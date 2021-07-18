var express = require("express");
var bodyParser = require("body-parser");
//var uniqid = require("uniqid");
var app = express();
var mysql = require('mysql');
const cors = require('cors');
 
app.use(cors());

var con = mysql.createConnection({
  host: "db-admin.cbsrzgbgkhst.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "admin1234",
  database: "db_admin"
});

con.connect(function(err) {
    if (err) throw err;
  
   console.log('connection successful');
});

// var users = [{
//     email : 'abc@abc.ca',
//     firstName : 'ABC',
//     id : '5abf6783'
//     },
//     {
//     email : 'xyz@xyz.ca',
//     firstName: 'XYZ',
//     id : '5abf674563'
//     }]

let port = process.env.PORT || 2007
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

app.get('/homepage',(req,res) => {
    return res.status(200).json({
        success: true,
        message: "Homepage",
    });
});

app.get('/homepage/items', (req, res) => {

        con.query(`SELECT * FROM item_details`, function(err, result, fields) {
            console.log(result.length);
            
            if (err)
            {
                return res.status(404).json({
                    success: false,
                    message: "No user found!"
                })
            } 
            if (result)
            {
                return res.status(200).json({
                    success: true,
                    message: "Users retrieved",
                    data: result
                });
            } 
        });

});

app.get('/cart/items', (req, res) => {

    con.query(`SELECT * FROM cart_items`, function(err, result, fields) {
        console.log(result.length);
        
        if (err)
        {
            return res.status(404).json({
                success: false,
                message: "No user found!"
            })
        } 
        if (result)
        {
            return res.status(200).json({
                success: true,
                message: "Users retrieved",
                data: result
            });
        } 
    });

});

app.put('/cart/truncate', (req, res) => {

    con.query(`TRUNCATE TABLE cart_items;`,function(err,res){
        
        if(err) throw err;

        console.log(res);
    });

    return res.status(200).json({
        success: true,
        message: "Users Truncated",
    })
});

app.post('/cart/add', (req, res) => {

	var records = [[req.body.firstName,req.body.email]];

	if(records[0][0]!=null)
	{
		con.query("INSERT into cart_items (store_name, item_name, item_qty, item_price, item_desc, item_image) VALUES ?",[records],function(err,result,fields){

			if(err)
            {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: "server error"
                })
                
            }

            else
            {
                return res.status(200).json({
                    success: true,
                    message: "Users Added",
                })
            }

		});
	}
});

// app.get('/user/:id', (req, res) => {

//     let userID = req.params.id;
//     con.query(`SELECT * FROM user_info WHERE id = '${req.params.id}'`, function(err, result, fields) {
//         console.log(result);
//         var found=false;
//         Object.keys(result).forEach(function(key) {
//             var row = result[key];
//             if (row.id == userID)
//             {
//                 found=true;
//             }
//             console.log(row.id)
//           });

//         if (found==false)
//         {
//             return res.status(404).json({
//                 success: false,
//                 message: "No user found!"
//             })
//         }

//         else
//         {
//             if (err)
//             {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Server error"
//                 })
//             } 
//             if (result)
//             {
//                 return res.status(200).json({
//                     success: true,
//                     message: "User retrieved",
//                     data: result
//                 });
//             } 
//         }
//     });

// });


// app.post('/add', (req, res) => {
//     const userTemp = req.body;
//     userTemp.id = uniqid();
//     console.log("Inside POST Statement");
//     if(!userTemp || !userTemp.firstName || !userTemp.email){
//         return res.status(404).json({
//             success : 'False',
//             Message : 'Data is incomplete'
//         });
//     }
//     else{
//         users.push(userTemp);
//         return res.status(200).json({
//             success : true,
//             Message : 'User added'
//         });
//     }
    
    
// });

// app.get('/users', (req, res) => {
//     console.log("Inside GET Statement");

//     try{

//         if(!users || !users.length){
//             return res.status(404).json({
//                 success : 'False',
//                 Message : 'Users Not Found'
//             });
//         }

//         res.status(200).json({
//             success :  true,
//             Message : "Users retrieved",
//             data : users
//         });
//     }
//     catch(err){
//         return res.status(500).json({
//             success : 'False',
//             Message : 'Server response Error',
//             Stack_Trace : err 
//         })

//     }
    
    
// });


// app.get('/user/:id', (req, res) => {
//     const id = req.params.id;
//     var userTemp = null;
//     users.map(user => {
//         if(user.id === id){
//             userTemp = user;
//         }
//     });
//     console.log("Inside GET Statement");

//     try{

//         if(!userTemp){
//             return res.status(404).json({
//                 success : 'False',
//                 Message : 'User with id = '+ id +' Not Found'
//             });
//         }

//         res.status(200).json({
//             success :  true,
//             Message : "Users Received",
//             data : userTemp
//         });
//     }
//     catch(err){
//         return res.status(500).json({
//             success : 'False',
//             Message : 'Server response Error',
//             Stack_Trace : err 
//         })

//     }
// });

// app.put('/update/:id', (req, res) => {
//     const id = req.params.id;
//     const newUser = req.body;
//     var userTemp = null;
//     users.map(user => {
//         if(user.id === id){
//             if(newUser.firstName){
//                 user.firstName = newUser.firstName;
//             }
//             if(newUser.email){
//                 user.email = newUser.email;
//             }
            
//             userTemp = user;
//         }
//     });
//     console.log("Inside PUT Statement");

//     try{

//         if(!userTemp){
//             return res.status(404).json({
//                 success : 'False',
//                 Message : 'User with id = '+ id +' Not Found'
//             });
//         }
//         if(!newUser){
//             return res.status(404).json({
//                 success : 'False',
//                 Message : 'No Body passed in json file'
//             });
//         }

//         res.status(200).json({
//             success :  true,
//             Message : "User updated"
//         });
//     }
//     catch(err){
//         return res.status(500).json({
//             success : 'False',
//             Message : 'Server response Error',
//             Stack_Trace : err 
//         })

//     }
// });












// app.get("/", (req, res) => {
//     res.status(200).json({"status": "Success", "message": "User api server for Tutorial5 in CSCI5709"});
// });
// app.get("/users", (req, res) => {
//     res.json(
//         {
//             "success": true,
//             "message": "user_retrieved",
//             "data": "Hello World"
//         }
//     )
// });