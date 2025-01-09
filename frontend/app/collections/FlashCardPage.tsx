import { FlashcardArray } from "react-quizlet-flashcard";

interface Collection {
  id: string;
  name: string;
  description: string;
  questions: Record<string, Question>;
}

interface Question {
  id: string;
  question: string;
  answer: string;
}
interface ExamPageProps {
  collection: Collection;
}

export const FlashCardPage: React.FC<ExamPageProps> = ({ collection }) => {
  const cards = Object.values(collection.questions).map((question) => ({
    front: question.question,
    back: question.answer,
    id: question.id,
    frontHTML: (
      <div className="dark:text-white bg-gray-800 h-full mx-auto text-center text-2xl flex items-center justify-center border rounded-xl">
        {" "}
        <p>{question.question}</p>
      </div>
    ),
    backHTML: (
      <div className="dark:text-white bg-gray-800 h-full mx-auto text-center text-2xl flex items-center justify-center border rounded-xl">
        <p>{question.answer}</p>
      </div>
    ),
    width: "50vw",
    borderRadius: "50px",
  }));
  return (
    <div className="dark:bg-gray-900 flex flex-col items-center justify-center h-full">
      <FlashcardArray
        cards={cards}
        FlashcardArrayStyle={{
          backgroundColor: "rgb(17 24 39 / var(--tw-bg-opacity, 1))",
          color: "white",
        }}
        controls={true}
        cycle={true}
      />
    </div>
  );
};
