import "reflect-metadata"
import router from './route'; 
const express = require("express");
const app = express();

app.use(express.json()); 
app.use(router); 

app.listen(9000, () => {
  console.log('Server is running on port 9000');
});