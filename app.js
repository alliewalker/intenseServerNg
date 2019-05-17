require("dotenv").config();

let express = require("express");
let app = express();
let sequelize = require("./db");
let bodyParser = require("body-parser");
let cors = require("cors");

require("./db").sync();
let User = require("./controllers/usercontroller");
let Trip = require("./controllers/tripcontroller");
let Review = require("./controllers/reviewcontroller");
sequelize.sync();

console.log("hello");
// app.use(
//   cors({
//     exposedHeaders: ["Authorization"],
//     credentials: true
//   })
// );
app.use(cors());

app.use(bodyParser.json());

app.use("/user", User);

app.use(require("./middleware/validate-session"));

app.use("/trip", Trip);

app.use("/review", Review);

app.listen(process.env.PORT, function(req, res) {
  console.log(`App is listening on ${process.env.PORT}`);
});

//order matters here
