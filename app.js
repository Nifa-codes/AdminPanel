const express= require('express');
const app=express();
const routes=require('./routes/userRoutes');
const dbRoutes=require('./routes/dbRoutes');
app.use(express.urlencoded({ extended: true })); 

app.use(express.json());

app.use("/api/users", routes);
app.use("/api/users/db", dbRoutes);

module.exports=app;
