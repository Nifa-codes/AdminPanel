const express= require('express');
const app=express();
const routes=require('./routes/userRoutes');
app.use(express.urlencoded({ extended: true })); 

app.use(express.json());

app.use("/api/users", routes);

module.exports=app;
