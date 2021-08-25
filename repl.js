const mongoose=require("mongoose"),
    Subscriber=require("./models/subscriber"),
    Course=require("./models/course");

var testCourse, testSubscrier;

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    {useNewParse:true}
);

mongoose.Promise=global.Promise;

Subscriber.remove({})
    .then((item)=>console.log(`Removed ${items.n} records!`))
    .then(()=>{
        return Course.remove({});
    })
    .then((items)=>console.log(`Removed ${items.n} records!`))
    .then(()=>{
        return Subscriber.create({
            name:"Sanskar Rawat",
            email:"rawatavi.211@gmail.com",
            zipCode:"12345"
        });
    })
    .then(subscriber=>{
        console.log(`Created Subscriber: ${subscriber.getInfo()}`);
    })
    .then(()=>{
        return Subscriber.findOne({
            name:"Jon"
        });
    })
    .then(subscriber=>{
        testSubscrier=subscriber;
        console.log(`Found one subscriber: ${subcriber.getInfo()}`);
    })
    .then(()=>{
        return Course.create({
            title:"Tomato Land",
            description:"Locally farmed tomatoes only",
            zipCode:12345,
            items:["cheerry","heirloom"]
        });
    })
    .then(course=>{
        testCourse=course;
        console.log(`Created course: ${course.tite}`);
    })
    .then(()=>{
        testSubscrier.course.push(testCourse);
        testSubscrier.save();
    })
    .then(()=>{
        return Subscriber.populate(testSubscrier,"courses");
    })
    .then(subscriber=>console.log(subscriber))
    .then(()=>{
        return Subscriber.find({courses:mongoose.Types.ObjectId(testCourse._id)});
    })
    .then(subscriber=>console.log(subscriber));