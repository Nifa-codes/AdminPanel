//creating server_1
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const fs = require('fs');
app.use(express.json());
const router = require('./routes');
const { randomUUID } = require('crypto');
app.use('/api', router);

PORT = process.env.PORT;

addUser = function (req, res) {
    let id = randomUUID();
    //input data
    const { name, email, password } = req.body;
    //read data from Users.js
    fs.readFile('Users.json', 'utf-8', (err, user) => {

        let users = JSON.parse(user);
        const duplicateUser = users.some(u => u.email == email);
        if (duplicateUser) {
            res.send('user already exist');
        }
        else {
            let newUser = {
                Id: id,
                name: name,
                email: email,
                password: password
            }
            users.push(newUser);

        }
        fs.writeFile('Users.json', JSON.stringify(users), err => {
            if (err) {
                res.status(500).send('Error saving user');
            } else {
                res.send('User added successfully');
            }
        });

    });
    

  
}
//edit user
editUser = function (req, res) {
    const { id } = req.params;
    const { Name, Email, Password } = req.body;
    fs.readFile('Users.json', 'utf-8', (err, user) => {
        let users = JSON.parse(user);
        let costumer = users.findIndex(u => u.Id == id);
        users[costumer] = {
            Id: user[costumer].Id,
            name: Name || user[costumer].name,
            email: Email || user[costumer].email,
            password: Password || user[costumer].password
        };
        fs.writeFile('Users.json', JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).send('error updating user');

            }

        });


    });
}
//delete user
deleteUser = function (req, res) {
    const { id } = req.params;
    fs.readFile('Users.json', 'utf-8', (err, user) => {
        let users = JSON.parse(user);
        let costumer = users.findIndex(c => c.Id == id);
        users.splice(costumer, 1);

        fs.writeFile('Users.json', JSON.stringify(users), err => {
            if (err)
            {
                res.status(500).send('error deleting user');
            }
        });
    });
}
module.exports = { addUser,editUser,deleteUser};
//creating server_2
app.listen(PORT, function (req, res) {
    console.log('UP');

});
