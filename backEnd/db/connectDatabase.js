const mongoose = require('mongoose');



async function connect(){
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/altwin')
        
        console.log("Connected")
    }
   catch(err){
    console.error("Could not connect to the database")
   }
   
    
}

module.exports= connect;