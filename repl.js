const mongoose=require("mongoose"),
    Subscriber=require("./models/subscriber"),
    Course=require("./models/course"),
    User=require('./models/user');


mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    {useNewParse:true,useUnifiedTopology:true}
);


mongoose.Promise=global.Promise;

var testSubscriber, testCourse, testUser;


Course.remove({})
.then((items)=>{
    console.log(`Successfully removed ${items.n} entries from course...`);
    return Subscriber.remove({});
})
.then((items)=>{
    console.log(`Successfully removed ${items.n} entries from subscriber...`);
    return User.remove({});
})
.then((items)=>{
    console.log(`Successfully removed ${items.n} entries from user...`);
})
.then(()=>{
  return Subscriber.create({
      name:"Sanskar",
      email:"rawatavi.211@gmail.com",
      zipCode:224001
  });
})
.then((subscriber)=>{
    console.log(`Created new subscriber: ${subscriber.name}`);
    return Subscriber.create({
        name:'Neelam',
        email:'neelam1090@gmail.com',
        zipCode:224001
    });
})
.then((subscriber)=>{
    console.log(`Created new subscriber: ${subscriber.name}`);
    return Subscriber.findOne({name:'Sanskar'});
})
.then((subscriber)=>{
    testSubscriber=subscriber;
    console.log(subscriber.getInfo());
    return Course.create({
        title : 'Tomato Soup', 
        description : 'Spicy Tomato Soup', 
        items : ['Tomato', 'Spices'], 
        zipCode : 12345
    });
})
.then((course)=>{
    testCourse=course;
    console.log(`Created new course: ${course.title}`);
})
.then((course)=>{
    testCourse=course;
    testSubscriber.save();
})
.then(()=>{
    return Subscriber.populate(testSubscriber,"courses");
})
.then((subscriber)=>{
    console.log(subscriber);
    return Subscriber.find({});
})
.then((subscriber)=>{
    console.log(subscriber);
    return User.create({
        name:{
            first:"Sanskar",
            last:"Rawat"
        },
        email:"rawatavi.211@gmail.com",
        password:"rukasarashina",
        zipCode:224001
    });
})
.then((user)=>{
    console.log(`Created new user: ${user.fullName}`);
    return Subscriber.findOne({email:testUser.email});
})
.then((subscriber)=>{
    testUser.subscribedAccount=subscriber;
    testUser.save().then(()=>console.log("User is updated now..."));
})
.catch((error)=>console.log(error.message));