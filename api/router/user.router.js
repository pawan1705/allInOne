import express from 'express';
var router=express.Router();
import * as userController from '../controller/user.controller.js';

router.post("/save",userController.save);
router.get('/fetch',userController.fetch);
router.delete('/delete/:id',userController.deleteUser);
router.post('/login',userController.loginUser);
router.patch("/update",userController.updateUser);

export default router;