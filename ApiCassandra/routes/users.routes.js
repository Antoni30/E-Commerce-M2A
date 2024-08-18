import { Router } from "express";
import {getUsers,getUser,putUser,deleteUser,postUser,login} from "../controllers/users.controller.js"

const router = Router();

router.get('/users',getUsers);
router.get('/users/:id',getUser);
router.put('/users/:id',putUser );
router.delete('/users/:id', deleteUser);
router.post('/users', postUser);

router.post('/login', login);

export default router;