
const jwt=require("jsonwebtoken")
function authenticatetoken(req,res,next){

    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    console.log(token)
    if(token)
    {
        
     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err)
            {
                return res.status(403).json({message:" token is not valid"})
            }
            req.user=user
            console.log(req.user)
            next()
        })
       

    }
    else
    {
        return res.status(401).json({message:"no token authorization denied"})
    }


}

module.exports=authenticatetoken