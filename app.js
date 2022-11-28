import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer"
import usersRoute from "./routes/usersroute.js";
import recordsRoute from "./routes/recordsroute.js";
import ordersRoute from "./routes/ordersroute.js";
// import cors from "cors"

//creating/initializing express server
const app = express();
const PORT = process.env.PORT || 4000;

//setup multer diskStorage
const storage = multer.diskStorage({
  destination:function(req,file,cb){
      let fullPath= "./upload"
      cb(null, fullPath)
  },
  filename:function(req,file,cb){
      let fileName = Date.now()+"_"+ file.originalname
      cb(null,fileName)
  }
})
const upload = multer({storage:storage})

// create mongoose connection
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("DB connection established!");
});

//cors middleware
// app.use(cors({origin:"http://localhost:3000", exposedHeaders:["token"]}))

app.use(morgan("dev"));

//express json middleware to parse any incoming json data
app.use(express.json());

// serve static files/pages
app.use(express.static("upload"))
//serve static files in views/build folder
app.use(express.static("views/build"))

app.get("/", (req,res)=> {
  res.sendFile("./views/build/index.html", {root:"."})
})

app.use("/users", upload.single("image"), usersRoute);

app.use("/records", recordsRoute);

app.use("/orders", ordersRoute);

// handling 404 page not found error (error handling middleware)
app.use((req, res, next) => {
  // res.json({success:false, message:"There is no such route found"})
  res.sendFile("./views/pageNotFound.html", { root: "." });
});

// universal error handler middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500) // .res.json({ success: false, message: err.message }); am Ende chainen oder:
  res.json({ success: false, message: err.message });
});

// listening request on port 4000
app.listen(PORT, () => console.log("Server is running on port: ", PORT));
