const mongoose = require('mongoose');
require("dotenv").config();

const username = 'ali';
const password = process.env.URI_PWD;
const cluster = 'cluster0.o1x7c';

const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/blog?retryWrites=true&w=majority`;

mongoose.connect(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log('Connection Successful 🐀🐀');
}).catch((e)=>{
  console.log(e,'Connecting to the databases faild 👣👣');
})