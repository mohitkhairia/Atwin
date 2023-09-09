const express = require('express');
const AthleteRoute = require('./routes/athlete.route');
const  connect  = require('./db/connectDatabase');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
app.use(bodyParser.json()); // To parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/athlete', AthleteRoute);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(express.json())


connect().then(()=>{
    app.listen(3001, ()=>{
        console.log("Server started on http://localhost:3001")
    })
    }
    )