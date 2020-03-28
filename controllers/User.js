/*********************USER ROUTES***************************/
const express = require('express')
const router = express.Router();
const path = require("path");
const userModel = require("../models/TaskUsers")


//Route to direct use to Registration form
router.get("/register",(req,res)=>
{
    res.render("User/register");
});

//Route to process user's request and data when user submits registration form
router.post("/register",(req,res)=>
{ 
 
    const newUser = {

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        profilePic: req.body.profilePic

    }

    const user = new userModel(newUser);
    user.save() //Async method
        .then((user) => {

            req.files.profilePic.name = `pro_pic${user._id}${path.parse(req.files.profilePic.name).ext}`
            req.files.profilePic.mv(`public/uploads/${req.files.profilePic.name }`)
            .then(()=>{


                userModel.updateOne({_id: user._id}, {

                    profilePic: req.files.profilePic.name


                })
                .then(()=>{

                    res.redirect(`/user/profile/${user._id}`)

                })
                .catch(err => console.log(`Error occured when updating profile pic file ${err}`))



                



            })
            .catch(err => console.log(`Error occured when moving file ${err}`))
            

        })
        .catch(err => console.log(`Error occured when inserting data into the User collection ${err}`))


});

//Route to direct user to the login form
router.get("/login",(req,res)=>
{
    res.render("User/login");
});

//Route to process user's request and data when user submits login form
router.post("/login",(req,res)=>
{

    res.redirect("/user/profile/")
});



router.get("/profile/:id",(req,res)=>{

    userModel.findById(req.params.id)
    .then((user)=>{

        const {profilePic} = user;

        res.render("User/userDashboard", {

            profilePic: profilePic


        });


    })
    .catch(err => console.log(`Error occured when finding user ${err}`))

    
})



module.exports=router;