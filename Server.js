const express = require("express");
var bodyParser = require('body-parser');
const path = require("path");
const methodOverride = require('method-override');
const app = express();
require("dotenv").config();
const router = require("./routers");
require("./databases/db");
const Blog = require('./databases/blogs');
const { engine } = require("express-handlebars");
const port = process.env.PORT;

// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, './node_modules/bootstrap/dist/')));
app.use(express.static(path.join(__dirname, './statics')));

app.engine("hbs",engine({extname:"hbs"},));
app.set("view engine","hbs");


app.use("/",router);

app.listen(port,()=>{
  console.log(`Server is ready on port ${port} 🚀🚀🚀...
  This is a Development servers,
  please don't use for Deployment 🚧🚧🚧`);
});