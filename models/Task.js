const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: 
    {
        type: String,
        required: true
    },
    description:
    {

        type:String,
        required: true

    },
    dueDate:
    {
        type: Date,
        required: true

    },
    priority:
    {

        type:String,
        required:true

    },
    status:
    {
        type:String,
        default:"Open"

    },
    profilePic:
    {
        type:String
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    }

});

/*
    Create a model object. This model object is responsible for 
    performing CRUD operations on the given collection
*/

const Task = mongoose.model('Task', taskSchema);


module.exports = Task;