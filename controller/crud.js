// fs/promises for async read and write
const fs = require('fs/promises');
const { randomUUID } = require('crypto');
const path = require('path');

let usersPath=path.join(__dirname,'../data/Users.json')

const addUser = async function (req, res) {
    console.log("add user called");
    let users =[]
    //input data
    const { name, email, password } = req.body;
 try
  {
      //read data from Users.js
      let user=await fs.readFile(usersPath,'utf-8');
      users = JSON.parse(user);

      //duplicate_user check
    const duplicateUser = users.some(u => u.email.toLowerCase()===email.toLowerCase());
    if (duplicateUser)
     {
            return res.status(409).send('user already exist');
     }
   else
     {
            const newUser = {
                id: randomUUID(),
                name,
                email, 
                password
              };
            users.push(newUser);
          
   
    
             await fs.writeFile(usersPath,JSON.stringify(users));
             res.status(200).send('User added successfully');
    }
    
    
  }

  catch(Err)
  {
            console.error(Err);
             return res.status(500).send('error adding user');
             
  }

}
//edit user
const editUser = async function (req, res) {
    console.log("edit called");
    const { id } = req.params;
    const { name, email, password } = req.body;
  try
  {
    let user = await fs.readFile(usersPath,'utf-8');

   let users = JSON.parse(user);
   
   
     let userIndex=users.findIndex(u=>u.id===id);
        if (userIndex === -1) {
            return res.status(404).send('User not found');
          }
        const updatedUser = {
            id: users[userIndex].id,
            name: name || users[userIndex].name,
            email: email || users[userIndex].email,
            password: password || users[userIndex].password
          };
      
          users[userIndex] = updatedUser;
    //write file
    await fs.writeFile(usersPath,JSON.stringify(users));
    res.status(200).send('User editted successfully');
  }
   
         
                   
      
 catch(Err)
 {
  console.error(Err);
  return res.status(500).send('error editing user');
 }

}
//delete user
const deleteUser = async function (req, res) {
    console.log("delete called");
    const { id } = req.params;
  try
  {
    let user= await fs.readFile(usersPath,'utf-8');

    let users = [];
    users=JSON.parse(user);
    let deletedUser = users.findIndex(c => c.id === id);
    if (deletedUser === -1) {

      return res.status(404).send('User not found');
    }
    users.splice(deletedUser, 1);
    

   await fs.writeFile(usersPath,JSON.stringify(users));
   res.status(200).send('User deleted');
  }
    
  catch(Err)
  {
  console.error(Err);
  return res.status(500).send('error deleting user');
  }
    
}
//list users
const getUsers = async function(req,res){
  try
  {
    let data= await fs.readFile(usersPath,'utf-8');
    let users=[];
    users=JSON.parse(data);
    res.status(200).send(users);
  }
  catch(Err)
  {
    console.error(Err);
    res.status(500).send('Error reading users');
  }

}
//search user
const getUser =async function(req,res){
  try
  {
    let data= await fs.readFile(usersPath,'utf-8');
    let users=[];
     users=JSON.parse(data);
     let query= req.query.q;
     if (!query) {
      return res.status(400).send('Query is null');
    }
     let user= users.filter(u=>(u.name.toLowerCase().includes(query.toLowerCase()))||
     (u.email.toLowerCase().includes(query.toLowerCase())));
     if(user.length==0){
      return res.status(404).send('no users found');
     }
     else{
      res.status(200).json(user);
     }
  }

  catch(Err)
  {
    console.error(Err);
    return res.status(500).send('error reading users');
  }
}
module.exports = {
    addUser,
    editUser,
    deleteUser,
    getUsers,
    getUser
  };
