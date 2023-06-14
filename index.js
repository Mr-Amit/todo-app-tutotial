const express = require("express");
const app = express();
const route = require("./backend/src/route/route");
const dotnev = require("dotenv");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotnev.config({ path: "./.env" });
const myDbString = process.env.DATABASE;
mongoose.connect(myDbString, { useNewUrlParser: true, }).then(() => {
    console.log("You have connected with your mongoDB")
}).catch((err) => console.log("There is some problem in mongoose connection", { error: err }))

app.use("/", route);

app.use(express.static('frontend/dist'))

app.listen(process.env.PORT || 3001, () => {
  console.log(
    "Your server running on port " + (process.env.PORT || 3001)
  );
});