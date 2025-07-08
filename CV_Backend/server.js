const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cvRouter = require('./routes/routers')
const databaseConnect = require('./config/databaseConnect')
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());



app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.use("/uploads", express.static("uploads"));
app.use('/', cvRouter);



// making connection with the server port by the env file 
const port = process.env.PORT || 3000;

// making connection with database 
databaseConnect();

//default error handler
const errorHandler = (err, req, res, next)=>{
    if(req.headersSent){
        console.log("Error occure:",err);
        return next(err);
    }

    res.status(400).json({message:"Server error. Please try later"});
}
app.use(errorHandler);

app.listen(port,()=>{
    console.log("Liste ning on port: ",port);
})