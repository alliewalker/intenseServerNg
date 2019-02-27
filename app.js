require("dotenv").config();

let express = require("express");
let app = express();
let sequelize = require("./db");
let bodyParser = require('body-parser');

require('./db').sync();
let User = require("./controllers/usercontroller");
let Trip = require("./controllers/tripcontroller");
let Review = require("./controllers/reviewcontroller");
sequelize.sync()

app.use(require("./middleware/headers"))

app.use(bodyParser.json());

app.use("/user", User);



app.use(require("./middleware/validate-session"))

app.use("/trip", Trip)

app.use("/review", Review)


app.listen(process.env.PORT, function(req, res){
    console.log(`App is listening on ${process.env.PORT}`)
})


//order matters here