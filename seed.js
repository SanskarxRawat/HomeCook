const mongoose=requrie("mongoose"),
    Course=require("./models/course"),
    User=require("./models/user");

    mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/recipe_db",
        {userNewUrlParser:true,useFindAndModify:false}
);

mongoose.connection;

const users=[
        {
            details:{
                name:{
                    first:"Sanskar",
                    last:"Rawat"
                },
                email:"rawatavi.211@gmail.com",
                zipCode:224001
            },
            password:"rukasarashina"
        }
];


User.deleteMany().exec().then(()=>{
    console.log("User data is empty.");
});

var command=[];

users.forEach(user=>{
    commands.push(User.register(user.details,user.password));
});

Promise.all(commands).then((r)=>{
    console.log(r);
    mongoose.connection.close();
}).catch((error)=>{
    console.log(`error :${error.message}`);
});
