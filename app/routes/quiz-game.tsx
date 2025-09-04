import React from 'react';
import type { Route } from '../+types/root';
import QuizGamePage from '../pages/quiz-game/index';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Vocabulary Master' },
    { name: 'description', content: 'Vocabulary Master' },
  ];
}

const QuizGame = () => <QuizGamePage />;

export default QuizGame;
