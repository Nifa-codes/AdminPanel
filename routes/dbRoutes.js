let express=require('express');
let router=express.Router();
console.log('db router called');
const {addUser,editUser,deleteUser,getUsers,getUser}=require('../controller/dbCrud');
router.post('/',addUser);
router.put('/:id',editUser);
router.delete('/:id',deleteUser);
router.get('/',getUsers);
router.get('/search',getUser);


module.exports= router;