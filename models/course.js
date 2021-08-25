const mongoose = require("mongoose"),
  {Schema}=require("mongoose");

  var courseSchema=new Schema(
    {
      title:{
        type:String,
        required:true,
        unique:true
      },
      desciption:{
        type:String,
        required:true
      },
    maxStudents:{
      type:Number,
      default:0,
      min:[0,"Course cannot have a negative number of students"]
    },
    cost:{
      type:Number,
      default:0,
      min:[0,"Course cannot have a negative cost"]
    }
  },
  {
    timestaps:true
  }
);
module.exports = mongoose.model("Course", courseSchema);