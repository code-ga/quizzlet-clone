export interface Collection {
  id: string;
  name: string;
  description: string;
  questions: Record<string,Question >
}

export interface Question {
  id: string;
  question: string;
  answer: string;
}