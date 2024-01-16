const mongoose=require("mongoose");
const conn=async(req,res)=>{
    try {
        
        
        await mongoose.connect("mongodb+srv://user:123@cluster.hnagtqq.mongodb.net/")
        .then(()=>{
        console.log("connect");
    });
        
    } catch (error) {
        res.status(400).jsson({
            message:"not connected",
        });
        
    }
};
conn();
