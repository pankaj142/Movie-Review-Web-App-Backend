const express = require("express");
const router = express.Router();
const Reviews = require("../db/models/Reviews");
const db = require("../db/db");

//get all Reviews items
router.get('/', (req,res, next)=>{
    Reviews.find()
        .then(function(success){
            res.json({
                success : true,
                data : {
                    "items" : success,
                    "message" : "Successfully fetched all Reviews"
                },
                error : {}
            })
            return false;
        })
        .catch((err)=>{
            res.json({
                success : false,
                error : {
                    "message" : "Could not fetched all Reviews."
                },
                data : {}
            })
            return false;
        })
})

//add new Reviews item
router.post('/', (req,res, next)=>{
    let new_Reviews = new Reviews({
        movie_name : req.body.movie_name,
        review : req.body.review,
    })
    new_Reviews.save((err, Reviews)=>{
        if(err){
            res.json({
                success : false,
                error : {
                    "message" : "Could not add the Reviews item.",
                    "Reviews" : Reviews,
                    "err" : err
                },
                data : {}
            })
            return false;
        }else{
            res.json({
                success : true,
                data : {
                    "message" : "Reviews added successfully"
                },
                error : {}
            })
            return false;
        }
    })
})

router.delete('/:id', (req,res, next)=>{
    Reviews.remove({_id : req.params.id}, (err, result)=>{
        if(err){
            res.json({
                success : false,
                error : {
                    "message" : "Could not remove the Reviews."
                },
                data : {}
            })
            return false;
        }else{
            res.json({
                success : true,
                data : {
                    "message" : "Reviews removed successfully"
                },
                error : {}
            })
            return false;
        }
    })
})


module.exports = router;