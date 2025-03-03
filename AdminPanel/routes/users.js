var express = require('express');
var router = express.Router();
//only imports function
const { addUser, editUser, deleteUser } = require('../Panel');


router.post('/addUser', addUser);
router.put('/editUser/:id', editUser);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;
