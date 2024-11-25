// routes/task.js
var express = require('express');
var router = express.Router();
let Task = require('../model/task');  // Assuming Task is a Mongoose model
let taskController = require('../controllers/task.js');

function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

// Home Route - Pass TaskList to the home page
router.get('/', async (req, res, next) => {
    try {
        const TaskList = await Task.find();  // Get tasks from the database
        res.render('index', {
            title: 'Home',
            displayName: req.user ? req.user.displayName : '',
            TaskList: TaskList  // Pass TaskList to the view
        });
    } catch (err) {
        console.error(err);
        res.render('index', {
            error: 'Error on Server',
            TaskList: []  // Pass an empty array in case of error
        });
    }
});

// Home Route - Same logic as the '/' route
router.get('/home', async (req, res, next) => {
    try {
        const TaskList = await Task.find();  // Get tasks from the database
        res.render('index', {
            title: 'Home',
            displayName: req.user ? req.user.displayName : '',
            TaskList: TaskList  // Pass TaskList to the view
        });
    } catch (err) {
        console.error(err);
        res.render('index', {
            error: 'Error on Server',
            TaskList: []  // Pass an empty array in case of error
        });
    }
});

// Task List Route
router.get('/tasklist', async (req, res, next) => {
    try {
        const TaskList = await Task.find();  // Get tasks from the database
        res.render('Task/list', {
            title: 'Tasks',
            displayName: req.user ? req.user.displayName : '',
            TaskList: TaskList  // Pass TaskList to the view
        });
    } catch (err) {
        console.error(err);
        res.render('Task/list', {
            error: 'Error on Server',
            TaskList: []  // Pass an empty array in case of error
        });
    }
});

// Create Task - Display Add Task Form
router.get('/add', async (req, res, next) => {
    try {
        res.render('Task/add', {
            title: 'Add Task',
            displayName: req.user ? req.user.displayName : ''
        });
    } catch (err) {
        console.error(err);
        res.render('Task/list', {
            error: 'Error on Server'
        });
    }
});

// Create Task - Handle Form Submission
router.post('/add', async (req, res, next) => {
    try {
        let newTask = new Task({
            "Name": req.body.Name,
            "Description": req.body.Description,
            "Deadline": req.body.Deadline
        });
        await Task.create(newTask);
        res.redirect('/tasklist');
    } catch (err) {
        console.error(err);
        res.render('Task/list', {
            error: 'Error on Server'
        });
    }
});

// Edit Task - Display Edit Form
router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const TaskToEdit = await Task.findById(id);
        res.render('Task/edit', {
            title: 'Edit Task',
            displayName: req.user ? req.user.displayName : '',
            Task: TaskToEdit
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// Edit Task - Handle Form Submission
router.post('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        let updatedTask = new Task({
            "_id": id,
            "Name": req.body.Name,
            "Description": req.body.Description,
            "Deadline": req.body.Deadline
        });
        await Task.findByIdAndUpdate(id, updatedTask);
        res.redirect('/tasklist');
    } catch (err) {
        console.error(err);
        res.render('Task/list', {
            error: 'Error on Server'
        });
    }
});

// Delete Task
router.get('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Task.deleteOne({ _id: id });
        res.redirect('/tasklist');
    } catch (err) {
        console.error(err);
        res.render('Task/list', {
            error: 'Error on Server'
        });
    }
});
module.exports = router;
