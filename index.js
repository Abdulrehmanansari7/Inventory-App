import express from "express"
import "dotenv/config"
import userRouter from "./routes/userRouter.js";
import path from "path"
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const PORT = process.env.PORT;
const __dirname = import.meta.dirname;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/", userRouter);

// keep these two LAST, after all routes
app.use(notFound);
app.use(errorHandler);

app.listen(PORT,(err) => {
    if(err) throw err;
    console.log(`Server is listening on PORT:${PORT}`);
})
