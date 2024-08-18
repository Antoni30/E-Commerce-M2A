import { Router } from "express";
import {deleteUserRoles,getUserRole,getUserRoles,getUserRolesNames,postUserRoles,putUserRole} from "../controllers/user_roles.controller.js"

const router = Router();


router.get('/user_roles',getUserRoles)
router.get('/user_roles_name/:id',getUserRolesNames)
router.get('/user_roles/:id',getUserRole)
router.put('/user_roles/:id',putUserRole)
router.delete('/user_roles/:id', deleteUserRoles)
router.post('/user_roles', postUserRoles)

export default router;