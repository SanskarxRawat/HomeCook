const Message=require("../models/message");

module.exports=io=>{
    io.on("connection",client=>{
        Message.find({})
        .sort({
            createdAt:-1
        })
        .limit(10)
        .then(messages=>{
            client.emit("load all messages",messages.reverse());
        });
        console.log("new connecton");

        client.on("disconnect",()=>{
            console.log("user disconnected");
        });
        
    client.on("message",(data)=>{
        let messageAtrributes={
            content:data.content,
            userName:data.userName,
            user:data.userId
        },
        m=new Message(messageAttributes);
        m.save()
        .then(()=>{
            io.emit("message",messageAtrributes);
        })
        .catch(error=>console.log(`error: ${error.message}`));
    });
       
    });
};