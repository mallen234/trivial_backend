import fs from "fs";
import {
  CreateListPayload,
  Product,
  Question,
  isQuestionsArray,
} from "./types";
import { v4 as generateUUID } from "uuid";

class Database {
  questions: Question[];
  constructor() {
    let rawQuestionsFiles;
    try {
      rawQuestionsFiles = JSON.parse(
        fs.readFileSync("questions/questions.json", "utf-8")
      );
    } catch {
      throw new Error("Unable to parse products data file");
    }

    if (!isQuestionsArray(rawQuestionsFiles)) {
      throw new Error("Format issue with products data file");
    }

    this.questions = rawQuestionsFiles;
  }

  public getQuestions(): Product[] {
    return this.questions;
  }

  public searchProducts(query: string): Product[] {
    // TODO: Consider how we might use this function...
    return this.questions;
  }

  public addQuestion(newQuestion: CreateListPayload) {
    const questionWithId = { ...newQuestion, id: generateUUID() };

    this.questions.push(questionWithId);
    this.writeQuestionsToFile();

    return questionWithId;
  }

  public deleteList(id: string) {
    this.questions = this.questions.filter((l) => l.id !== id);
    this.writeQuestionsToFile();
  }

  private writeQuestionsToFile() {
    fs.writeFileSync("products/lists.json", JSON.stringify(this.questions));
  }
}

const db = new Database();
export default db;
