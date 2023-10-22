import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import createPost from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
dotenv.config();

app.use(cors());

//routes
app.get("/", (req, res) => {
  //   console.log(res);
  res.status(200).send("Hii there");
});

app.use("/book", createPost);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening to ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
