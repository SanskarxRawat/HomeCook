const mongoose = require('mongoose'), 
passportLocalMongoose = require('passport-local-mongoose'),
{ Schema } = mongoose, 
randToken = require('rand-token'), 
Subscriber = require('./subscriber'), 
userSchema = new Schema({
    name : {
        first : {
            type : String, 
            trim : true
        }, 
        last : {
            type : String, 
            trim : true
        }
    }, 
    email : {
        type : String, 
        required : true, 
        unique : true
    }, 
    zipCode : {
        type : Number, 
        min : [10000, 'Zip Code is too short'], 
        max : [999999, 'Zip Code is too large']
    }, 
    courses : [
        {
            type : Schema.Types.ObjectId, 
            ref : 'Course'
        }
    ], 
    subscribedAccount : {
        type : Schema.Types.ObjectId, 
        ref : 'Subscriber'
    }, 
    apiToken : {
        type : String
    }
}, {
    timestamps : true
});



userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save",function(next){
  let user=this;
  if(!user.apiToken) user.apiToken=randToken.generate(16);
  next();
});


userSchema.pre("save",function(next){
  let user=this;
  if(user.subscribedAccount===undefined){
    Subscriber.findOne({
      email:user.email
    })
    .then((subscriber)=>{
      user.subscribedAccount=subscriber;
      next();
    })
    .catch((error)=>{
      console.log(`Error in connectiong subscriber: ${error.message}`);
      next(error);
    });
  }
  else{
    next();
  }
});


userSchema.plugin(passportLocalMongoose,{
  usernameField:"email"
});


module.exports = mongoose.model("User", userSchema);