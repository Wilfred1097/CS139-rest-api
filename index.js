import Express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();

const { API_URL } = process.env;
const app = Express();

//routers
import userRouter from "./src/modules/user/user.route.js";

app
  .use(json())
  .use(`${API_URL}users`, userRouter) //localhost:3000/api/v1/users
  .use("*", (req, res) => {
    return res.status(404).send("Not Found...");
  });

app.listen(3000, function () {
  console.log(API_URL);
  console.log("Server is running at port 3000");
});