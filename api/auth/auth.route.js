const authControllers = require("./auth.controller");
const authRouter = require("express").Router();

authRouter.post("/signup", authControllers.signUp);
authRouter.post("/signin", authControllers.signIn);

module.exports = authRouter;
