const express= require('express');
const app=express();
const routes=require('./routes/userRoutes');
const swaggerUi=require('swagger-ui-express');
const path=require('path');
const YAML=require('yamljs');

const swaggerDocument=YAML.load(path.join(__dirname,'swagger.yaml'));
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.use(express.urlencoded({ extended: true })); 

app.use(express.json());

app.use("/api/users", routes);

module.exports=app;
