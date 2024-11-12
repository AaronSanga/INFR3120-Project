var express = require('express');
var router = express.Router();
let Task = require('../model/task');

router.get('/', async (req, res, next) => {
    try {
        const TaskList = await Task.find();
        res.render('index', {
            title: 'Home',
            TaskList: TaskList
        });
    } catch (err) {
        console.error(err);
        res.render('index', {
            error: 'Error on Server',
            TaskList: []
        });
    }
});

router.get('/home', async (req, res, next) => {
    try {
        const TaskList = await Task.find();
        res.render('index', {
            title: 'Home',
            TaskList: TaskList
        });
    } catch (err) {
        console.error(err);
        res.render('index', {
            error: 'Error on Server',
            TaskList: []
        });
    }
});

router.get('/tasklist', async (req, res, next) => {
    try {
        const TaskList = await Task.find();
        res.render('Task/list', {
            title: 'Tasks',
            TaskList: TaskList
        });
    } catch (err) {
        console.error(err);
        res.render('Task/list', {
            error: 'Error on Server'
        });
    }
});
/*Create Operation */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Task/add',{
            title: 'Add Task'
        })
    }
    catch(err){
        console.error(err)
        res.render('Task/list',{
            error:'Error on Server'})
    }
});
/*Create Operation */
router.post('/add',async(req,res,next)=>{
    try{
        let newTask = Task({
            "Name":req.body.Name,
            "Description":req.body.Description,
            "Deadline":req.body.Deadline
        })
        Task.create(newTask).then(()=>{
            res.redirect('/tasklist')
        })
    }
    catch(err){
        console.error(err)
        res.render('Task/list',{
            error:'Error on Server'})
    }
});
/*Update Operation */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const TaskToEdit=await Task.findById(id);
        res.render('Task/edit',{
            title: 'Edit Task',
            Task:TaskToEdit
        })
    }
    catch{
        console.error(err);
        next(err);
    }
});
/*Update Operation */
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id= req.params.id;
        let updatedTask = Task({
            "_id":id,
            "Name":req.body.Name,
            "Description":req.body.Description,
            "Deadline":req.body.Deadline
        })
        Task.findByIdAndUpdate(id,updatedTask).then(()=>{
            res.redirect('/tasklist')
        })
    }
    catch(err){
        console.error(err)
        res.render('Task/list',{
            error:'Error on Server'})
    }
});
/*Delete Operation */
router.get('/delete/:id',(req,res,next)=>{
    try{
        let id=req.params.id;
        Task.deleteOne({_id:id}).then(()=>{
            res.redirect('/tasklist')
        })
    }
    catch{
        console.error(err)
        res.render('Task/list',{
            error:'Error on Server'})
    }
});
module.exports = router;