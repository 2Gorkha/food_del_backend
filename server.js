const express = require('express')
const mongoose  = require('mongoose')
require('dotenv').config()
const User = require('./model/User')


const PORT = 3000
const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(
    ()=> console.log("DB Connected Successfully.....")
).catch(
    (err) => console.log(err)
)

app.get('/',async(req,res)=>{
    try{
        res.send("Welcome to the Backend Page")

    }catch(err){
        console.log(err)
    }
})

app.post('/register',async(req,res)=>{

    const{user,email,password} = req.body
    try{
        const NewUser = new User({user,email,password})
        await NewUser.save()
        console.log("User is Registered Sucessfully.....")
        res.json({message:'User Created..'})

    }catch(err){
        console.log(err)

    }
})

app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("Sever Running on Port | This Server :"+PORT)
})