import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import config from "./config";
import { initDB, pool } from "./db";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";


const app: Application = express();
// const port = config.port;

//middleware need / terminal undefined
app.use(express.json()); //middleware
app.use(express.text());
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));


// initDB();

app.get("/", (req: Request, res: Response) => {
  // res.send('Express Server !')
  res.status(200).json({
    message: "Express Server !",
    author: "Next Level",
  });
});


app.use("/api/users",userRoute);
app.use("/api/profile",profileRoute);
app.use("/api/auth",authRoute)

//POST/Create
//GET All
//GET Single
//PUT
//DELETE


export default app;
//==========================
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });



