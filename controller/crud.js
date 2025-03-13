const fs = require('fs');
const { randomUUID } = require('crypto');
const path = require('path');
let usersPath=path.join(__dirname,'../data/Users.json')

const addUser = function (req, res) {
    console.log("add user called");
    //input data
    const { name, email, password } = req.body;
    //read data from Users.js
    fs.readFile(usersPath, 'utf-8', (err, user) => {
        if (err) {
            return res.status(500).send('Error reading users data');
          }

        let users =[]
        try {
            users = JSON.parse(user);
          } catch (parseErr) {
            console.error('Error parsing users data:', parseErr); 
            return res.status(500).send('Error parsing users data');
          }
          const duplicateUser = users.some(u => 
            u.email.toLowerCase() === email.toLowerCase()
          );
        if (duplicateUser) {
            res.status(409).send('user already exist');
        }
        else {
            const newUser = {
                id: randomUUID(),
                name,
                email, 
                password
              };
            users.push(newUser);

            fs.writeFile(usersPath, JSON.stringify(users), err => {
                if (err) {
                    res.status(500).send('Error saving user');
                } else {
                    res.status(200).send('User added successfully');
                }
            });

        }
       

    });
    

  
}
//edit user
const editUser = function (req, res) {
    console.log("edit called");
    const { id } = req.params;
    const { name, email, password } = req.body;
    fs.readFile(usersPath, 'utf-8', (err, user) => {
        if (err) {
            return res.status(500).send('Error reading users data');
          }

        let users = JSON.parse(user);
        const userIndex = users.findIndex(u => u.id === id);
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
        fs.writeFile(usersPath, JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).send('error updating user');

            }
            res.status(200).send('User updated successfully');

        });


    });
}
//delete user
const deleteUser = function (req, res) {
    console.log("delete called");
    const { id } = req.params;
    fs.readFile(usersPath, 'utf-8', (err, user) => {
        if (err) {
            return res.status(500).send('Error reading users data');
          }

        let users = [];
        users=JSON.parse(user);
        let deletedUser = users.findIndex(c => c.id == id);
        users.splice(deletedUser, 1);

        fs.writeFile(usersPath, JSON.stringify(users), err => {
            if (err)
            {
                res.status(500).send('error deleting user');
            }
            res.status(200).send('user deleted successfully')
        });
    });
}
//list users
const getUsers = function(req,res){
  fs.readFile(usersPath,'utf-8',(err,data)=>{
    if(err)
    {
      res.status(500).send('Error reading users list');
    }
    let users=[];
    users=JSON.parse(data);
    res.send(users);

  });
}
//search user
const getUser =function(req,res){
  fs.readFile(usersPath,'utf-8',(err,data)=>{
   if (err)
   {
    return res.status(500).send('error reading users');
   }
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
  });
}
module.exports = {
    addUser,
    editUser,
    deleteUser,
    getUsers,
    getUser
  };
