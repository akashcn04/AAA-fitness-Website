const mongoose=require("mongoose");
const connect=mongoose.connect("mongodb://127.0.0.1:27017/Login-tut");
connect.then(()=>{
    console.log("mongodb connected");
})
.catch((err)=>{
    console.log("failed to connect:",err);
});

const donationSchema = new mongoose.Schema({
    name:{ 
        type:String,
        required:true
    },
    email :{ 
        type:String,
        required:true
    },
    message:{ 
        type:String,
        required:true
    }
    
  });

const collection = mongoose.model('contacts', donationSchema);
module.exports=collection;