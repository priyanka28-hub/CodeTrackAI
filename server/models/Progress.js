const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
{
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  problem:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Problem",
    required:true
  },

  status:{
    type:String,
    enum:["Solved","Attempted"],
    default:"Attempted"
  },

  solvedDate:{
    type:Date
  }
},
{
  timestamps:true
}
);

module.exports =
  mongoose.models.Progress ||
  mongoose.model("Progress", progressSchema);