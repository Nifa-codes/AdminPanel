require('dotenv').config();
const {Pool}=require('pg');
const pool=new Pool({
host:process.env.PG_host,
user:process.env.PG_user,
database:process.env.PG_database,
password:process.env.PG_password,
port:5432
});
module.exports=pool;