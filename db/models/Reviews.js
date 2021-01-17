const mongoose = require("mongoose");

const reviews_schema = mongoose.Schema({
    movie_name : {
        type : "String",
        required : true
    },
    review : {
        type : "String",
        required : true
    }
})

const Reviews = module.exports = mongoose.model("Reviews", reviews_schema);