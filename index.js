const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employeesystem",
});

// db.connect((err, details)=>{
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(details)
//   }
// });

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employee (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/employee", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// db.query(
//   "UPDATE employee SET name = 'Ammar', age='26', country='Ostriya', position='Administrater', wage='220000'  WHERE id=6",
//   (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//     }
//   }
// );

app.put("/update", (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  db.query(
    "UPDATE employee SET name=? WHERE id=?",
    [name, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// db.query("DELETE FROM employee WHERE id IN (13,14,15,16,17,18)");

app.listen(3001, () => {
  console.log("Port 3001 started running");
});
