require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan")

const port = process.env.PORT || 5050;
var app = express();

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");


// app.use(morgan("tiny")); //logs request-endpoint and time taken
// app.use(express.static(path.join(__dirname, "public")));


// //view routers
// // app.use("/", require("./routes/route"));

// app.get("/",function(req,res){
//   res.send("ima ahere ")
// })



// //no router found will trigger this by default
// app.all("*", (req, res) => {
//   res.render("error");
// });

app.get("/",function(req,res){
     console.log("calling index");
     res.send("on index page")
})
app.listen(port, () => console.log(`\napplication is running at ${port}`));
// app.listen(() => console.log(`\napplication is running at ${port}`));
