// Author : Pathik Kumar Patel
// Description: updating the user password.

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());

var mysql = require("mysql");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://group10proposalweb.herokuapp.com"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var con = mysql.createConnection({
  host: "db-admin.cbsrzgbgkhst.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "admin1234",
  database: "db_admin"
});

con.connect(function (err) {
  if (err) throw err;

  console.log("connection successful");
});

// updating the user password.

router.put("/updatePassword", (req, res) => {
  con.query(
    `UPDATE user_auth SET password = '${req.body.password}' WHERE (email = '${req.body.email}');`,
    function (err, result, fields) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "server error",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Password Updated",
      });
    }
  );
});

// checking the user authentication answer.
router.post("/answer", (req, res) => {
  con.query(
    `SELECT answer FROM user_auth WHERE email = '${req.body.email}'`,
    function (err, result, fields) {
      
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "server error",
        });
      }

      if (result.length > 0) {
        var queryAnswer = result[0].answer.toLowerCase();
        var userAnswer = req.body.answer.toLowerCase();
        if (queryAnswer === userAnswer) {
          return res.status(200).json({
            success: true,
            message: "Answer Matched",
          });
        } else {
          return res.status(204).send({
            success: false,
            message: "Wrong Answer",
          });
        }
      }
    }
  );
});

// authenticationg the user email whether user is present in database or not.
router.post("/forgotPassword", (req, res) => {
  con.query(
    `SELECT email,question FROM user_auth WHERE email = '${req.body.email}'`,
    function (err, result, fields) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "server error",
        });
      }

      if (result.length > 0) {
        req.session.forgotUser = result[0].email;
        console.log(req.session.forgotUser);
        return res.status(200).json({
          success: true,
          message: "Users exists",
          data: result,
        });
      } else {
        return res.status(204).send({
          success: false,
          message: "User doesn't exist",
        });
      }
    }
  );
});

module.exports = router;