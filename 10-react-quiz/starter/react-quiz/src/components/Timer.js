import { useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContext';

function Timer() {
  const { secondsRemaining, tick } = useQuiz();
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <div className="timer">
      {minutes < 10 && '0'}
      {minutes}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
}

export default Timer;
