var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
//telling router that I have this model
let Book = require('../model/book');
/* Get route for the book list - Read operation*/
/*
GET,
Post,
Put
*/
router.get('/',async(req,res,next)=>{
try{
    const BookList = await Book.find();
    res.render('book', {
        title: 'Books Lib',
        BookList:BookList
    })}
    catch(err){
        console.error(err);
        res.render('book', {
            error: 'Error on the server'
        })
    }
});
module.exports = router;