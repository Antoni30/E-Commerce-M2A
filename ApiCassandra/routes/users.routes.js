import { Router } from "express";
import {
  getUsers,
  getUser,
  putUser,
  deleteUser,
  postUser,
  login,
  logout,
  auth,
  verifyToken,
  getUserByUsername
} from "../controllers/users.controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/profile/:id", getUser);
router.get("/profileUsername/:username",getUserByUsername);
router.put("/users/:id", putUser);
router.delete("/users/:id", deleteUser);

router.post("/register", postUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verifyToken);

export default router;
