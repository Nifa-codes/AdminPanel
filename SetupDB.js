const pool= require('./db');
async function testConnection(){
    try{
        const res= await pool.query('SELECT NOW()');
        console.log(res.rows[0].now);
    }
    
    catch(err)
    {
        console.log('error',err);
    }
}
async function setupDb() {
    try{
         await pool.query('CREATE TABLE IF NOT EXISTS users(id UUID PRIMARY KEY,name varchar(20),email varchar(100),password varchar(20))');
         console.log('success');

    }
    catch(err){
        console.error(err);
        pool.end();
        
    }
}
testConnection();
setupDb();