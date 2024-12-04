const roles=(...rolesfor)=>
{
   return(req,res,next)=>{

    if(!rolesfor.includes(req.user.role))
    {
        return res.status(403).json({message:"Access denied"})
    }
    next()
   }
}

module.exports=roles
