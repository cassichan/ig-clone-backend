import express from "express";
import cors from "cors";
import { photoRouter } from "./src/routers/photo-router";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/photos", photoRouter);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Started on port: ${PORT}`);
});
