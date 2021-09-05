const user=require("./models/user");
const express = require("express"),
  layouts=require("express-ejs-layouts"),
  app=express(),
  router=require("./routes/index"),
  mongoose=require("mongoose"),
  methodOverride=require("method-override"),
  passport=require("passport"),
  cookieParser=require("cookie-parser"),
  expressSession=require("express-session"),
  expressValidator=require("express-validator"),
  connectFlask=require("connect-flash"),
  User=require("./models/user");
  
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/recipe_db",
  {userNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModifiy:false}
);

const db=mongoose.connection;
db.once('open',()=>{
  console.log('Successfully connected.');
});

mongoose.Promise=global.Promise;


app.set("port",process.env.PORT || 3000);
app.set("view engine","ejs");
app.set('token',process.env.TOKEN || "recipeT0K3N");
app.use(express.static('public'));
app.use(
  methodOverride("_method",{
    methods:["POST","GET"]
  })
);
app.use(
  express.urlencoded({
    extended:true
  })
);
app.use(express.json());
app.use(layouts);
app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret:"secret_passcode",
    cookie:{
      maxAge:4000000
    },
    resave:false,
    saveUninitialized : false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlask());
app.use((request,response,next)=>{
  response.locals.flashMessages=request.flash();
  response.locals.loggedIn=request.isAuthenticated();
  response.locals.currentUser=request.user;
  next();
});
app.use(expressValidator());
app.use('/',router);

const server=app.listen(app.get("port"),()=>{
  console.log(`Server running at https://localhost:${app.get("port")}`);
}),

io=require("socket.io")(server);

const chatController=require("./controllers/chatController")(io);