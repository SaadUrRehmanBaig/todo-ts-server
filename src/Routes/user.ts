import { Router } from "express";
import * as UserValidation from "../Validation/User";
import * as UserController from "../controller/UserController"

const router = Router()

router.post("/signUp", UserValidation.signUp, UserController.signUp)
router.post("/login", UserValidation.login, UserController.login)
router.post("/logout", UserController.logout)

export default router