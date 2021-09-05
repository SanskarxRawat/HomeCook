const mongoose=require("mongoose");
const Message=require("../models/message");

module.exports=io=>{
    io.on("connection",client=>{
        console.log("New Connection...");
        client.on("disconnect",()=>{
            console.log("User Disconnected");
        });
        client.on("message",(data)=>{
            let messageAttributes={
                content:data.content,
                userName:String(data.userName),
                user:new mongoose.Types.ObjectId(data.userId)
            },
            m=new Message(messageAttributes);
            m.save().then(()=>{
                io.emit("message",messageAttributes);
            }).catch(error=>console.log('error : ${error.message}'));
        });
        Message.find({}).sort({createdAt:-1}).limit(10).then(messages=>{
            client.emit("load all message",messages.reverse());
        });
    });
};