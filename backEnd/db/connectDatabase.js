const mongoose = require('mongoose');


// const mongo = String(process.env.MongoDbAdress

async function connect(){
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/altwin')
        // mongodb+srv://<credentials>@cluster0.td7qnop.mongodb.net/?appName=mongosh+1.9.1
        console.log("Connected")
    }
   catch(err){
    console.error("Could not connect to the database")
   }
   
    
}

module.exports= connect;