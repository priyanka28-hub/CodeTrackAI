const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
{
  title:{
    type:String,
    required:true
  },

  platform:{
    type:String,
    required:true
  },

  difficulty:{
    type:String,
    enum:["Easy","Medium","Hard"],
    required:true
  },

  topic:{
    type:String,
    required:true
  }
},
{
  timestamps:true
}
);

module.exports =
  mongoose.models.Problem ||
  mongoose.model("Problem", problemSchema);