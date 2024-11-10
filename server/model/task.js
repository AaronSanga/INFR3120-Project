// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let bookModel = mongoose.Schema({
    Name:String,
    Description:String,
    Deadline:String
},
{
    collection:"User_Tasks"
}
)
module.exports = mongoose.model('Book',bookModel)