const mongoose=requrie("mongoose"),
    Course=require("./models/course");

    mongoose.Promise=global.Promise;
    mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/recipe_db",
        {userNewUrlParser:true,useFindAndModify:false}
);


Course.remove({})
.then(()=>{
    return Course.create({
        title:"Classic Butter Chicken",
        description:"Swap your usual takeaway for homemade butter chicken.The dish is made in two parts,combining tandoori chicken with a rich, buttery sauce",
        price:"₹"+30,
        maxStudents:25
    });
})
 .then(course=>console.log(course.title))
.then(()=>{
    return Course.create({
        title:"Chicken Pakoras",
        description:"Make a batch of these crispy golden pakoras as a snack, or part of an Indian meal. Serve hot with sweet chilli sauce or green chutney",
        price:"₹"+20,
        maxStudents:30
    });
})
.then(course=>console.log(course.title))
.then(()=>{
    return Course.create({
        title:"Bengali Scotch Eggs",
        description:"Impress guests at dinner parties with these moreish Bengali scotch eggs. They make a popular starter in an Indian menu, or as part of the snack spread",
        price:"₹"+25,
        maxStudents:30
    });
})
 .then(course=>console.log(course.title))
 .then(()=>{
    return Course.create({
        title:"Tandoori Roast Chicken",
        description:"Serve this Indian spiced bird with rice, potatoes and vegetables for an alternative roast dinner",
        price:"₹"+40,
        maxStudents:20

    });
})
 .then(course=>console.log(course.title))
 .then(()=>{
    return Course.create({
        title:"Malai Kofta",
        description:"This North Indian dish is often served at Diwali and makes the perfect dinner party dish.",
        price:"₹"+35,
        maxStudents:10
    });
})
 .then(course=>console.log(course.title))
 .then(()=>{
    return Course.create({
        title:"Dosa",
        description:"Make your own dosa – Indian rice pancakes made from fermented batter. They take a little effort, but are delicious served with aloo masala and other fillings",
        price:"₹"+30,
        maxStudents:25
    });
})
 .then(course=>console.log(course.title))
 .then(()=>{
    return Course.create({
        title:"Roasted Salmon",
        description:"Serve salmon with paprika, ginger and honey mustard glaze for an Indian-inspired, original roast",
        price:"₹"+40,
        maxStudents:20
    });
})
 .then(course=>console.log(course.title))
 .then(()=>{
    return Course.create({
        title:"Saag Paneer",
        description:"An Indian dish with plenty of flavour, saag paneer is a well-loved vegetarian side dish.",
        price:"₹"+45,
        maxStudents:50
    });
})
 .then(course=>console.log(course.title))
 .then(()=>{
    return Course.create({
        title:"Chicken Biryani",
        description:"A great one-pot rice dish that still tastes great a few days later – perfect for leftovers",
        price:"₹"+30,
        maxStudents:30
    });
})
 .then(course=>console.log(course.title))
 .then(()=>{
    return Course.create({
        title:"Coconut Loaf Cake",
        description:"This easy coconut cake will give you a taste of the tropical. Bake with a handful of storecupboard ingredients and enjoy with a cuppa",
        price:"₹"+20,
        maxStudents:20
    });
})
 .then(course=>console.log(course.title))
 .catch(error=>console.log(error.message))
 .then(()=>{
     console.log("DONE");
     mongoose.connect.close();
 });
 