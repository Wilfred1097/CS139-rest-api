import { Router } from "express"
import controller from "./user.controller.js";
const userRouter = Router();

userRouter.get("/:Id", controller.get);
userRouter.get("/", controller.get);

userRouter.post("/", controller.post);
userRouter.put("/:Id", controller.put);

userRouter.delete("/:Id", controller.delete);

export default userRouter;