const express =require('express')
const app=express()
const connectDb=require('./db/db')
const cors=require('cors')
app.use(cors())
app.use(express.json())
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

const Todo =require('./db/Todo')
connectDb()

app.get("/",(req,res)=>{
//     res.setHeader("Access-Control-Allow-Origin", "*")
// res.setHeader("Access-Control-Allow-Credentials", "true");
// res.setHeader("Access-Control-Max-Age", "1800");
// res.setHeader("Access-Control-Allow-Headers", "content-type");
// res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    res.send("...Api is running ")
})


app.post('/todo',async(req,res)=>{
    const {text}=req.body
    console.log(text)
    const todo =await Todo.create({
        blog:text
    })
    res.status(201).json(todo)
})

app.get('/show',async(req,res)=>{
    const todos=await Todo.find({})
    const documentCount=await Todo.countDocuments({})
          res.json(todos)  
    
   //  console.log("Number of users:", documentCount)     
})
app.put('/todoupdate',async(req,res)=>{
    const {text,id}=req.body
   // console.log(text,id)
    const todo=await Todo.findById(id)
    if(todo){
      //  console.log(todo)
        todo.blog=text
        const updatedTodo=await todo.save()
       // console.log(updatedTodo)
        }
    else{
        console.log(`not found`)
    }
})
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const Port=process.env.PORT || 5000


app.listen(Port,console.log(`Server running in ${Port}`))