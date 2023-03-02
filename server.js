//exp5 database server
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://admin:admin@cluster0.aqmkc3t.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
client.connect();
var db = client.db("In-Sem");
// var col = client.db("Exam");

// register into mongoDB
app.post('/insert_stu',(req,res)=>{
  col =db.collection("Exam")
  console.log(req.body)
  col.insertOne(req.body)
  res.send(req.body)

})
app.get('/show_one_stu',(req,res)=>{
  async function find(){
    try{
      const result=await col.findOne()
      console.log(result)
      if(result==null)
      {
        res.send({"Data_retrieval":"Fail"})
      }else{
          res.send(result);
        }
      }
      finally{}
    }
    find().catch(console.dir)
  })

  app.get('/show_all',(req,res)=>{
    async function find(){
      try{
        const result=await col.find().toArray([])
        console.log(result)
        if(result==null)
        {
          res.send({"Data_retrieval":"Fail"})
        }else{
            res.send(result);
          }
        }
        finally{}
      }
      find().catch(console.dir)
    })

    app.get('/show_all_gt1',(req,res)=>{
      async function find(){
        try{
          const result=await col.find({stu_id:{$gte:1},$or:[{stu_dept:"CSE"},{stu_dept:"ECE"}]}).toArray()
          console.log(result)
          if(result==null)
          {
            res.send({"Data_retrieval":"Fail"})
          }else{
              res.send(result);
            }
          }
          finally{}
        }
        find().catch(console.dir)
      })

  
app.listen(8082)
//localhost:8081
console.log("server started")