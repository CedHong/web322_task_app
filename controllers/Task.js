
/*********************Task ROUTES***************************/
const express = require('express')
const moment = require("moment");
const router = express.Router();
const taskModel = require("../models/Task")

moment().format('mm/dd/yyyy');

//Route to direct use to Add Task form
router.get("/add", (req, res) => {
    res.render("Task/taskAddForm");
});

//Route to process user's request and data when the user submits the add task form
router.post("/add", (req, res) => {
    //1.Import the taskModel object so that we can perform CRUD
    //operations on the collection

    //2. Fetch user data from the task add form

    const newTask =
    {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority
        //don't need for fields with a default value
    }

    //3 Insert a task into the task collection

    /*
        When inserting a document into a collection, you must create an instance
        of the model object and then have that instance call the save method()
    */

    const task = new taskModel(newTask);
    task.save() //Async method
        .then(() => {

            res.redirect("/task/list")

        })
        .catch(err => console.log(`Error occured when inserting data into the Task collection ${err}`))

});

////Route to fetch all tasks
router.get("/list", (req, res) => {

    taskModel.find()//returns an array, pulls multiple values
        .then((tasks) => {

            const filteredTask = tasks.map(task => {

                return {

                    id: task._id,
                    title: task.title,
                    description: task.description,
                    dueDate: moment(task.dueDate).format('MM/DD/YYYY'),
                    status: task.status,
                    priority: task.priority

                }


            });

            res.render("Task/taskDashboard", {

                data: filteredTask

            });

        })
        .catch(err => console.log(`Error occured when pulling  data from the Task collection ${err}`))



});

//Route to direct user to the task profile page
router.get("/description", (req, res) => {



})


//Route to direct user to edit task form

router.get("/edit/:id", (req, res) => {


    taskModel.findById(req.params.id)
        .then((task) => {

            const { _id, title, description, dueDate, priority, status } = task; // destructoring the task to get only the fields i want

            format_date = moment(dueDate).format('YYYY-MM-DD');

            res.render("Task/taskEditForm", {

                _id,
                title,
                description,
                format_date,
                priority,
                status


            })


        })
        .catch(err => console.log(`Error occured when pulling  data from the Task collection ${err}`))


})




//Route to update user data after they submit the form

router.put("/update/:id", (req, res) => {


    const task = {

        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status

    }

    taskModel.updateOne({ _id: req.params.id }, task)
        .then(() => {

            res.redirect("/task/list");


        })
        .catch(err => console.log(`Error occured when updating data from the Task collection ${err}`))

});


//router to delete user

router.delete("/delete/:id", (req, res) => {

    taskModel.deleteOne({ _id: req.params.id })
    .then(() => {

        res.redirect("/task/list");


    })
    .catch(err => console.log(`Error occured when deleting data from the Task collection ${err}`))


});


module.exports = router;