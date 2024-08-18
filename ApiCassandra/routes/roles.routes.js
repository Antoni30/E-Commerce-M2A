import { Router } from "express";
import{getRoles, postRol,deleteRol,putRol} from "../controllers/roles.controller.js"

const router = Router()

router.get('/roles', getRoles);
router.post('/roles', postRol);
router.delete('/roles/:id', deleteRol);
router.put('/roles/:id',putRol)

export default router;