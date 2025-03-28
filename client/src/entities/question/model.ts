export interface IQuestion {
  id: number;
  category: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: string;
  score: number;
  isAnswered: boolean;
}
