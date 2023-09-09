const {faker} = require('@faker-js/faker')
const Todo = require('../db/todos.model')
const connect = require('../db/connectDatabase')
const axios = require('axios');
const fs = require('fs');


const data = fs.readFileSync('todos.json', 'utf8');


const jsonData = JSON.parse(data);



 async function addData(){
  try{
    await Todo.create(jsonData);
    console.log('data added')
  }
  catch(err){
    console.log(err)
  }

    }


connect().then(addData())