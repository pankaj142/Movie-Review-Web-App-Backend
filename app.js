var express = require("express");
var mongoose = require("mongoose");
var body_parser = require("body-parser");
var cors = require("cors");
var path = require("path");

var app = express();
const port = 3001;
const reviews_routes = require("./routes/reviews");

app.use(cors());
app.use(body_parser.json())

app.use("/review", reviews_routes);

app.get("/", (req,res)=>{
    res.send("hello.")
})

app.listen(port, ()=>{
    console.log("Server started on port: " + port);
})

