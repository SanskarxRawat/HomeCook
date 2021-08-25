const mongoose = require("mongoose"),
  {Schema}=require("mongoose"),
  passportLocalMongoose=require("passport-local-mongoose"),
  Subscriber=require("./subscriber");

 var userSchema = new Schema(
    {
      name: {
        first: {
          type: String,
          trim: true
        },
        last: {
          type: String,
          trim: true
        }
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
      zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
      },
      password: {
        type: String,
        required: true
      },
      subscribedAccount: {
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
      },
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }]
    },
    {
      timestamps: true
    }
  );



userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});


userSchema.pre("save",function(next){
  let user=this;
  if(user.subscribedAccount===undefined){
    Subscriber.findOne({
      email:user.email
    })
    .then(subscriber=>{
      user.subscribedAccount=subscriber;
      next();
    })
    .catch(error=>{
      console.log(`Error in connectiong subscriber: ${error.message}`);
      next(error);
    });
  }
  else{
    next();
  }
});


userSchema.pre("save",function(next){
  let user=this;

  bcrypt.hash(user.password,10).then(hash=>{
    user.password=hash;
    next();
  })
  .catch(error=>{
    console.log(`Error in hashing password: ${error.message}`);
    next(error);
  });

});

userSchema.methods.passwordComparison=function(inputPassword){
  let user=this;
  return bcrypt.compare(inputPassword,user.password);
};

userSchema.pre("save",function(next){
  let user=this;
  if(!user.apiToken) user.apiToken=randToken.generate(16);
  next();
});


userSchema.plugin(passportLocalMongoose,{
  usernameField:"email"
});


module.exports = mongoose.model("Usner", userSchema);