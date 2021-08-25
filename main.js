"use strict";


const express = require("express"),
  layouts=require("express-ejs-layouts"),
  app=express(),
  router=require("./routes/index"),
  morgan=require("morgan"),
  mongoose=require("mongoose"),
  methodOverride=require("method-override"),
  passport=require("passport"),
  cookieParser=require("cookie-parser"),
  expressSession=require("express-session"),
  expressValidator=require("express-validator"),
  connectFlask=require("connect-flash"),
  User=require("./models/user");
  
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/homeCook",
  {userNewUrlParser:true,useFindAndModifiy:false}
);

mongoose.set("useCreateIndex",true);

app.set("port",process.env.PORT || 3000);
app.set("view engine","ejs");

app.use(
  methodOverride("_method",{
    methods:["POST","GET"]
  })
);

app.use(morgan("combined"));
app.use(layouts);
app.use(express.static("public"));
app.use(expressValidator());
app.use(
  express.urlencoded({
    extended:false
  })
);
app.use(express.json());

router.use(cookieParser("secret_passcode"));
router.use(
  expressSession({
    secret:"secret_passcode",
    cookie:{
      maxAge:4000000
    },
    resave:false,
    saveUnitialized:false
  })
);

app.use(connectFlask());

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



router.use((req,res,next)=>{
  res.locals.loggedIn=req.isAuthenticated();
  res.locals.currentUser=req.user;
  res.locals.flashMessages=req.flash();
  next();
});



const server=app.listen(app.get("port"),()=>{
  console.log(`Server running at https://localhost:${app.get("port")}`);
}),

io=require("socket.io")(server),
chatController=require("./controllers/chatController")(io);

module.exports=router;