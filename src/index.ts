import express, { Request, Response } from "express";
import database from "./database";
import { Question } from "./types";

const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});

app.get("/question", (req: Request, res: Response) => {
  let questions: Question[];
  try {
    questions = database.getQuestions();
  } catch {
    res.status(400);
    return;
  }
  res.status(200).json(questions);
  return;
});

app.use("/img", express.static("products/img"));

app.listen(PORT, () => {
  console.log(
    `API server listening on port ${PORT} - http://localhost:${PORT}`
  );
});
