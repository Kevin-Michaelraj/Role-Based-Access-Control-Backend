const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const crypto=require("crypto")
const jwt =require("jsonwebtoken")
const { timeStamp } = require("console")
require("dotenv").config()
const userroutes=require("./back/userroute")
const mod=require("./database")

const  app=express()
app.use(express.json())
app.use(cors())
app.use("/api/users",userroutes)
mongoose.connect("mongodb://localhost:27017/RABC")
.then(()=>{
    console.log("mongodb connected")
})
.catch((error)=>{
    console.log(error)
})




function authenticatetoken(req,res,next){

    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    console.log(token)
    if(token)
    {
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err)
            {
                return res.sendStatus(403)
            }
            req.user=user
            next()
        })
    }


}

app.get("/loged",authenticatetoken,async(req,res)=>{
    
    console.log(req.user)
    const reg=await mod.findOne({username:req.user})
    res.json(reg)
})
    


app.post("/register",async(req,res)=>{
    
    const request=req.body
    const sampmod=new mod(request)
    await sampmod.save()
    .then(()=>{
        res.status(201).json({message:"new user created"})

    })
    .catch((error)=>{
        res.status(500).json({message:error.message})
    })
})

app.post("/login",async(req,res)=>{
    const {username,password}=req.body
    try
    {
        const reg=await mod.findOne({username:username})
        if (reg!==null)
        {
            const hashed=await bcrypt.compare(password,reg.password)
            if(hashed)
            {
                const accesstoken=jwt.sign({id:reg._id,role:reg.role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
                res.status(200).json({message:"aunthenticated",accesstoken:accesstoken})
  
            }
            else
            {
                res.status(400).json({message:"aunthenticated failed"})

            }

        }
        else{
            res.status(500).json({messge:"user doesnot exist"})
        }
        

    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }

})

app.post("/logout", (req, res) => {
    //jsonweb token is stateless 
    //simple logout
    // in client side you can clear localstorage or session storage
    res.json({ message: "You have logged out successfully" });
  });

console.log(crypto.randomBytes(64).toString("hex"))

const port =3115||process.env.port
app.listen(port,()=>{
    console.log("server running")
})
