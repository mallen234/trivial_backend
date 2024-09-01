export interface Question {
  question: string;
  anwser: string;
}

export const isQuestion = (t: object): t is Question => {
  return "question" in t && "answer" in t;
};

export const isQuestionsArray = (t: object[]): t is Question[] => {
  return t.find((question) => !isQuestion(question)) === undefined;
};
