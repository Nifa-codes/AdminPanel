let express = require('express');
let router = express.Router();
console.log("User routes loaded"); 
//only imports function
const { addUser, editUser, deleteUser } = require('../controller/crud');


router.post('/', addUser);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);

module.exports = router;
