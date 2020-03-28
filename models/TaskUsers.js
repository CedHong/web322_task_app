const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const taskUserSchema = new Schema({
    firstName: 
    {
        type: String,
        required: true
    },
    lastName:
    {

        type:String,
        required: true

    },
    email:
    {
        type: String,
        required: true

    },
    password:
    {

        type:String,
        required:true

    },
    profilePic:{

        type:String

    },
    dateRegistered:
    {
        type:Date,
        default:Date.now()
    }

});

/*
    Create a model object. This model object is responsible for 
    performing CRUD operations on the given collection
*/
taskUserSchema.pre("save", function(next){

    //salt is random generated characters/strings
    bcrypt.genSalt(10)
    .then((salt)=>{

        bcrypt.hash(this.password, salt)
        .then((encrytPassword)=>{


            this.password = encrytPassword;
            next();


        })
        .catch(err=>console.log(`Error when hashing: ${err}`))




    })
    .catch(err=>console.log(`Error when salting: ${err}`))




})
const userModel = mongoose.model('TaskUsers', taskUserSchema);


module.exports = userModel;