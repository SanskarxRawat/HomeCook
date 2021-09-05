const mongoose=requrie("mongoose"),
    Subscribers=require("./models/subscriber"),
    User=require("./models/user");

    mongoose.connect(
        'mongodb://localhost:27017/recipe_db', 
        {
            useNewUrlParser: true, useUnifiedTopology : true
        }
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
        }, {
            details:{
                name:{
                    first:"Neelam",
                    last:"Rawat"
                },
                email:"neelam1090@gmail.com",
                zipCode:224001
            },
            password:"sweet"
        }
];


User.deleteMany().exec().then(()=>{
    console.log("User data is empty.");
});

var command=[];

users.forEach(user=>{
    command.push(User.register(user.details,user.password));
});

Promise.all(command).then((r) => {
    console.log(r);
    mongoose.connection.close();
}).catch((error) => {
    console.log(`error : ${error.message}`);
});