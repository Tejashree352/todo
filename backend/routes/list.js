const router=require("express").Router();
const User=require("../models/user");
const List=require("../models/list");

router.post("/addTask",async(req,res)=>{
try {
   
        const {title,body,id}=req.body;
        const existinguser=await User.findById(id);
        if(existinguser){
            const list=new List({title,body,user:existinguser});
            await list.save().then(()=>res.status(200).json({list}));
        existinguser.list.push(list);
        existinguser.save();
        
        }
        
 
} catch (error) {
    
}
       
}); 

//update
router.put("/updateTask/:id",async(req,res)=>{
    try {
       const {title,body}=req.body;
               const list =await List.findByIdAndUpdate(req.params.id,{title,body});
            list.save().then(()=>res.status(200).json({message:"task updated"}));
            
            
    } catch (error) {
        console.log("error");
    }
           
    });


    //delete

    router.delete("/deleteTask/:id",async(req,res)=>{
        try {
           
                const {id}=req.body;
                const existinguser=await User.findByIdAndUpdate
                (
                    id,
                    {$pull:{list:req.params.id}
                });
                if(existinguser){
                   
                   const list =await List.findByIdAndDelete(req.params.id)
                   .then(()=>res.status(200).json({message:"task deleted"}));
                
                }
        } catch (error) {
            console.log("error");
        }
               
        });

        //get task
        router.get("/getTask/:id",async(req,res)=>{
        try {
            const list =await List.find({user:req.params.id}).sort({createdAt:-1});
           if(list.length !==0){
            res.status(200).json({list:list});
           }else{
            res.status(200).json({message:"No task is added by you"});
           }
        } catch (error) {
            console.log("error")
        }
        
        });


    

module.exports=router;