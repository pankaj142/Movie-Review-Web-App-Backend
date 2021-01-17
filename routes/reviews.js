const express = require("express");
const router = express.Router();
const Reviews = require("../db/models/Reviews");
const db = require("../db/db");

//get all Reviews items
router.get('/', (req,res, next)=>{
    console.log("get reviews")
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
    console.log("post review api", req.body)
    if(req.body.movie_name == "" || req.body.review == ""){
        res.json({
            success : false,
            error : {
                "message" : "Compalsary fields are missing.",
            },
            data : {}
        })
        return false;
    }
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

router.delete('/:movie_name', (req,res, next)=>{
    console.log("delete review api", req.params.movie_name)
    Reviews.remove({movie_name : req.params.movie_name}, (err, result)=>{
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

//add new Reviews item
router.post('/update', (req,res, next)=>{
    console.log("post review api", req.body)
    if(req.body.movie_name == "" || req.body.review == ""){
        res.json({
            success : false,
            error : {
                "message" : "Compalsary fields are missing.",
            },
            data : {}
        })
        return false;
    }
    let query = {movie_name : req.body.movie_name};
    let update = {$set:{review:req.body.review}};
    Reviews.findOneAndUpdate(query, update, (err)=>{
        if(err){
            res.json({
                success : false,
                error : {
                    "message" : "Could not update the review",
                },
                data : {}
            })
            return false;
        }else{
            res.json({
                success : true,
                data : {
                    "message" : "Reviews udpated successfully"
                },
                error : {}
            })
            return false;
        }
    })
})

module.exports = router;