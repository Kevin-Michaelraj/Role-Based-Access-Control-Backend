
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
//schemaaa
const user= mongoose.Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true,enum:["admin","user","moderator"]}
},{
    timestamps:true,
})
user.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const hashedPassword = await bcrypt.hash(this.password,10);
            this.password = hashedPassword;  
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});
const mod= mongoose.model("user",user);
module.exports=mod