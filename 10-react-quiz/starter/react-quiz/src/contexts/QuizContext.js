const { createContext, useContext, useReducer, useEffect } = require('react');

const QuizContext = createContext();

const SECS_PRE_QUESTION = 30;

const initialState = {
  questions: [],
  // loading、error、ready、error、finished...
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PRE_QUESTION,
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    default:
      throw new Error('Invalid action!');
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  // derived state
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('http://localhost:9000/questions');
        const questions = await res.json();
        dispatch({ type: 'dataReceived', payload: questions });
      } catch {
        dispatch({ type: 'dataFailed' });
      }
    }
    fetchQuestions();
  }, []);

  function startQuiz() {
    dispatch({ type: 'start' });
  }

  function newAnswer(answer) {
    dispatch({ type: 'newAnswer', payload: answer });
  }

  function nextQuestion() {
    dispatch({ type: 'nextQuestion' });
  }

  function finishQuiz() {
    dispatch({ type: 'finish' });
  }

  function tick() {
    dispatch({ type: 'tick' });
  }

  function restartQuiz() {
    dispatch({ type: 'restart' });
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        startQuiz,
        newAnswer,
        nextQuestion,
        finishQuiz,
        tick,
        restartQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('QuizContext was used outside of the QuizProvider.');
  return context;
}

export { QuizProvider, useQuiz };
