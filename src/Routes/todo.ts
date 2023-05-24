import { Router } from "express";
import AuthenticationFunction from "../middleware/Authenticated"
import * as todoController from "../controller/TodoContoller";
import * as todoValidator from "../Validation/todo"
const router = Router()

router.get("/", [AuthenticationFunction, ...todoValidator.getAllTodo], todoController.getTodo)
router.get("/:id", [AuthenticationFunction], todoController.getSingleTodo)

router.post("/", [AuthenticationFunction], todoController.postTodo)

router.put("/", [AuthenticationFunction, ...todoValidator.UpdateTodo], todoController.UpdateTodo)
router.delete("/", [AuthenticationFunction, ...todoValidator.deleteTodo], todoController.deleteTodo)
export default router