// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let taskModel = mongoose.Schema({
    Name:String,
    Description:String,
    Deadline:String
},
{
    collection:"User_Tasks"
}
)
module.exports = mongoose.model('Task',taskModel)