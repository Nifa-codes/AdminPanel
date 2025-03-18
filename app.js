const express= require('express');
const app=express();
const routes=require('./routes/userRoutes');
const dbRoutes=require('./routes/dbRoutes');
const YAML=require('yamljs');
const swaggerUi=require('swagger-ui-express');
const path=require('path');
const swaggerDocument=YAML.load(path.join(__dirname,'swagger.yaml'));
app.use(express.urlencoded({ extended: true })); 

app.use(express.json());

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.use("/api/users", routes);
app.use("/api/users/db", dbRoutes);

module.exports=app;
