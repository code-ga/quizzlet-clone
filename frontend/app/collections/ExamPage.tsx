import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";

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

const ExamPage: React.FC<ExamPageProps> = ({ collection }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < Object.keys(collection.questions).length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    for (const questionId in collection.questions) {
      if (userAnswers[questionId] === collection.questions[questionId].answer) {
        correctAnswers++;
      }
    }
    setScore(correctAnswers);
  };

  useEffect(() => {
    // Reset score and user answers when collection changes
    setScore(0);
    setUserAnswers({});
  }, [collection]);

  const currentQuestion =
    collection.questions[
      Object.keys(collection.questions)[currentQuestionIndex]
    ];

  const option = useMemo(() => {
    const listOfFalseAnswers = Object.values(collection.questions)
      .filter((question) => question.id != currentQuestion.id)
      .map((question) => question.answer);
    const option = [];
    const correctAnswerIndex = Math.floor(
      Math.random() * Math.min(Object.keys(collection.questions).length, 4)
    );
    for (
      let i = 0;
      i < Math.min(4, Object.keys(collection.questions).length);
      i++
    ) {
      if (i === correctAnswerIndex) {
        option.push(collection.questions[currentQuestion.id].answer);
      } else {
        const currentChooseIndex = Math.floor(
          Math.random() * listOfFalseAnswers.length
        );
        const falseAnswer = listOfFalseAnswers[currentChooseIndex];
        option.push(falseAnswer);
        listOfFalseAnswers.splice(currentChooseIndex, 1);
      }
    }
    return option;
  }, [collection.questions, currentQuestion.id]);

  return (
    <div className=" mx-auto p-4">
      <div className="border p-4 text-center mb-12">
        <h1>Collection:</h1>
        <h1 className="text-2xl font-bold mb-4">Name: {collection.name}</h1>
        <p className="text-gray-300 mb-8">
          Description: {collection.description}
        </p>
        <Link to="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to Collections
          </button>
        </Link>
      </div>

      {!isFinished ? (
        <div className="border p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4">
            Question {currentQuestionIndex + 1}
          </h2>
          <p className="text-gray-200 mb-4">{currentQuestion.question}</p>

          <div className="space-y-4">
            {/* Render answer options (you can customize this based on your answer format) */}
            {/* Example: Radio buttons */}
            {option.map((answer, index) => (
              <div className="flex items-center">
                <input
                  type="radio"
                  id={`answer${index}-${currentQuestion.id}`}
                  name={`answer-${currentQuestion.id}`}
                  value={answer}
                  checked={userAnswers[currentQuestion.id] === answer}
                  onChange={() =>
                    handleAnswerChange(currentQuestion.id, answer)
                  }
                  className="mr-2"
                />
                <label htmlFor={`answer${index}-${currentQuestion.id}`}>
                  {answer}
                </label>
              </div>
            ))}
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 items-end"
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <p className="text-gray-200 mb-4 font-bold text-2xl">
            You scored {score} out of {Object.keys(collection.questions).length}
          </p>
          {/* You can add more details here, such as a list of correct/incorrect answers */}
        </div>
      )}
    </div>
  );
};

export default ExamPage;
