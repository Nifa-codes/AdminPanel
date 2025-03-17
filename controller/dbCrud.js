const pool=require('../db');
const { randomUUID } = require('crypto');
const addUser=async function (req,res) {
    const{name,email,password}=req.body;
    let id=randomUUID();
    try{
        const isExists=await pool.query('SELECT EXISTS(SELECT 1 FROM users WHERE LOWER(email) = LOWER($1))',[email]);
        if(isExists.rows[0].exists)
        {
            return res.status(409).send('user is duplicate');
        }
        else
        {
            if(name.length==0||name.length>20||email.length==0||email.length>100||password.length==0||password.length>20)
            {
               return res.status(400).send('Invalid input');
            }
            await pool.query('INSERT INTO users (id,name,email,password) VALUES ($1,$2,$3,$4)',[id,name,email,password]);
            res.status(200).send('User added successfully');
        }
    }
   
    catch(err)
    {
        console.error(err);
        return res.status(500);
    }

}
const editUser=async function (req,res) {
    const{id}=req.params;
    const{name,email,password}=req.body;
    if(name?.length>20||email?.length>100||password?.length>20)
        {
           return res.status(400).send('Invalid input');
        }
   try
   {
                const user=await pool.query('SELECT EXISTS(SELECT 1 FROM users WHERE id=$1)',[id]);
                
                if(!user.rows[0].exists)
                {
                    return res.status(404).send('User not found');
                }
                else
                {
                    let i=2;
                    let valuesQ=[];
                    valuesQ[0]=id;
                    let query='UPDATE users SET id=$1'
                    if(name)
                    {
                    let nameQ=`,name=$${i}`;
                    valuesQ[i-1]=name;
                    i++;
                    query=query+nameQ;

                    }
                    if(email)
                    {
                        let emailQ=`,email=$${i}`;
                        valuesQ[i-1]=email;
                        i++;
                        query=query+emailQ;
                    }
                    if(password)
                    {
                        let passwordQ=`,password=$${i}`;
                        valuesQ[i-1]=password;
                        i++;
                        query=query+passwordQ;
                    }
                    query=query+` WHERE id=$1`;
                    await pool.query(query,valuesQ);
                    res.status(200).send('user editted')
                }
   }
   catch(err)
   {
      console.error(err);
      res.status(500);
   }
    
}
const deleteUser=async function (req,res) {
    const {id}=req.params;
    try{
        let user= await pool.query('SELECT EXISTS(SELECT 1 FROM users WHERE id=$1)',[id]);
        if(!user.rows[0].exists)
        {
            return res.status(404).send('user not found');
        }
    
        await pool.query('DELETE FROM users WHERE id=$1',[id]);
        res.status(200).send('user deleted');
    }
    catch(err)
    {
        console.error(err);
        return res.status(500);
    }
  
    
}
const getUsers=async function(req,res){
try
{
   let users= await pool.query('SELECT * FROM users');
    
   res.status(200).json(users.rows);
}
catch(err)
{
    console.error(err);
    return res.status(500);
}
}
const getUser=async function (req,res) {
try
{
  let query=req.query.q;
   query=`%${query}%`;
  let user=await pool.query('SELECT * FROM users WHERE LOWER(name) LIKE LOWER($1) OR LOWER(email) LIKE LOWER($1)',[query]);
  res.status(200).json(user.rows);
}
catch(err)
{
    console.error(err);
    return res.status(500);
}
    
}

module.exports={
addUser,
editUser,
deleteUser,
getUsers,
getUser
};