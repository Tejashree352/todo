const router=require("express").Router();
const User=require("../models/user");
const bcrypt=require("bcryptjs");


//sign in
router.post("/register",async(req,res)=>{
    try {
        const{email,username,password}=req.body;
        const hashpassword=bcrypt.hashSync(password);
        const user=new User({email,password:hashpassword,username});
        await user.save().then(()=>
           res.status(200).json({message:"SignUp Successful"}) 
       );


    } catch (error) {
        res.status(200).json({message:"user already exists"}) ;
    }
});


//login 

router.post("/signin",async(req,res)=>{
    try {
     const user=await User.findOne({email:req.body.email});
     if(!user){
        res.status(200).json({message:"Please sign up first"});
     }
     const ispasswordCorrect=bcrypt.compareSync
     (
        req.body.password,
        user.password
        );
        if (!ispasswordCorrect){
            res.status(200).json({message:"Password is not correct"});
        }
        const{password,...others} = user._doc;
        res.status(200).json({others}) ;

    } catch (error) {
        res.status(200).json({message:"user already exists"}) ;
    }
});
module.exports=router;