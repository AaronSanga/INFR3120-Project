var express = require('express');
var router = express.Router();
let Book = require('../model/task')
let bookController = require('../controllers/task.js')
/*Read Operation*/
router.get('/',async(req,res,next)=>{
    try{
        const BookList = await Book.find();
        res.render('Book/list',{
            title:'Tasks',
            BookList:BookList
        })
    }
    catch(err){
        console.error(err)
        res.render('Book/list',{
            error:'Error on Server'})
    }
});
/*Create Operation */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Book/add',{
            title: 'Add Task'
        })
    }
    catch(err){
        console.error(err)
        res.render('Book/list',{
            error:'Error on Server'})
    }
});
/*Create Operation */
router.post('/add',async(req,res,next)=>{
    try{
        let newBook = Book({
            "Name":req.body.Name,
            "Author":req.body.Author,
            "Published":req.body.Published,
            "Description":req.body.Description,
            "Price":req.body.Price
        })
        Book.create(newBook).then(()=>{
            res.redirect('/booklist')
        })
    }
    catch(err){
        console.error(err)
        res.render('Book/list',{
            error:'Error on Server'})
    }
});
/*Update Operation */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const bookToEdit=await Book.findById(id);
        res.render('Book/edit',{
            title: 'Edit Task',
            Book:bookToEdit
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
        let updatedBook = Book({
            "_id":id,
            "Name":req.body.Name,
            "Author":req.body.Author,
            "Published":req.body.Published,
            "Description":req.body.Description,
            "Price":req.body.Price
        })
        Book.findByIdAndUpdate(id,updatedBook).then(()=>{
            res.redirect('/booklist')
        })
    }
    catch(err){
        console.error(err)
        res.render('Book/list',{
            error:'Error on Server'})
    }
});
/*Delete Operation */
router.get('/delete/:id',(req,res,next)=>{
    try{
        let id=req.params.id;
        Book.deleteOne({_id:id}).then(()=>{
            res.redirect('/booklist')
        })
    }
    catch{
        console.error(err)
        res.render('Book/list',{
            error:'Error on Server'})
    }
});
module.exports = router;