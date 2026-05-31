const Problem = require("../models/Problem");

const addProblem = async (req,res)=>{

try{

const problem =
await Problem.create(req.body);

res.status(201).json(problem);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};

module.exports = {
addProblem
};