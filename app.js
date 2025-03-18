const express= require('express');
const app=express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const routes=require('./routes/userRoutes');
const swaggerDocument=YAML.load(path.join(__dirname,'swagger.yaml'));

app.use(express.urlencoded({ extended: true })); 

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/users", routes);

module.exports=app;
