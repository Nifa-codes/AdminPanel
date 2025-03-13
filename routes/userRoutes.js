let express = require('express');
let router = express.Router();
console.log("User routes loaded"); 
//only imports function
const { addUser, editUser, deleteUser, getUsers, getUser } = require('../controller/crud');


router.post('/', addUser);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);
router.get('/',getUsers);
router.get('/search',getUser);
module.exports = router;
