const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
mongoose
  .connect("mongodb+srv://amar68:930523@amar.og3v7.mongodb.net/")
  .then(() => console.log("mongo connected "))
  .catch((error) => console.error(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin : 'http://localhost:5173/' ,
        methods : ['GET' , 'POST' , 'PUT' , 'DELETE'] , 
        allowedHeaders : [
            'Content-Type',
            'Authorization' ,
            'Cache-Control' ,
            'Expires' ,
            'Pragma'
        ] , 
        credentials  : true 
    })
)

app.use(cookieParser())
app.use(express.json())

app.listen(PORT  , () => console.log('server is now running on port '))