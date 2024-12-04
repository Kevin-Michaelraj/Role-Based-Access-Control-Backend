const express=require("express")
const verify=require("../middle/authenticate")
const roles=require("../middle/roles")
const mod=require("../database")
const router=express.Router()
// admin
router.get("/admin",verify,roles("admin"),async(req,res)=>{
    try{
        const alldet= await mod.find();
        if(!alldet)
            res.status(404).send(" details not found")
        res.json(alldet)
    }
    catch(error)
    {
        res.status(500).send(error)
    }
})


// both admin and moderator
router.get("/moderator",verify,roles("admin","moderator"),async(req,res)=>{
    
    res.json({message:'moderator'})
})




//all

router.get("/user",verify,roles("admin","moderator","user"),async(req,res)=>{
    
    const reg=await mod.findOne({_id:req.user.id})
    res.json(reg)
    //res.json({message:'user'})
})

module.exports=router