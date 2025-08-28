const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cvRouter = require('./routes/routers')
const adminRouter = require('./routes/adminRouters')
const databaseConnect = require('./config/databaseConnect')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));
app.use(cors({
  origin: ["https://deploy-mern-profilegen-cv-maker.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use("/uploads", express.static("uploads"));
app.use('/', cvRouter);
app.use('/admin', adminRouter);

app.post('/test-body', (req, res) => {
  console.log('req.body:', req.body);
  res.json({ body: req.body });
});


// making connection with the server port by the env file 
const port = process.env.PORT || 3000;

// making connection with database 
databaseConnect();


app.use(errorHandler);

app.listen(port,()=>{
    console.log("Listening sdf on port: ",port);
})