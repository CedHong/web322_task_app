const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

//This loads all our environment variables from the keys.env
require("dotenv").config({ path: './config/keys.env' });

//import your router objects
const userRoutes = require("./controllers/User");
const taskRoutes = require("./controllers/Task");
const generalRoutes = require("./controllers/General");

//creation of app object
const app = express();

//bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));

//express static middleware
app.use(express.static("public"));


//Handlebars middlware
app.engine("handlebars", exphbs(


    {

        helpers: {

            equal: function (value1, value2, option) {

                let string = "";

                if (value1 == value2) {

                    string = option
                }

                return string;

            }


        }
    }



));
app.set("view engine", "handlebars");

/*

This is to allow specific forms and/or links  that are 
submitted/pressed to send PUT and DELETE request respectively
*/
app.use((req, res, next) => {

    if (req.query.method == "PUT") {

        req.method = "PUT";


    }
    else if (req.query.method == "DELETE") {

        req.method = "DELETE"

    }

    next();

})


app.use(fileUpload());

//MAPs EXPRESS TO ALL OUR  ROUTER OBJECTS
app.use("/", generalRoutes);
app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/", (req, res) => {
    res.render("General/404");
});


mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connection was successful`)
    })
    .catch(err => console.log(`Error while connecting to a mongDB ${err}`))







const PORT = process.env.PORT;
//Creates an Express Web Server that listens for incomin HTTP Requests
app.listen(PORT, () => {
    console.log(`Your Web Server has been connected`);

});



