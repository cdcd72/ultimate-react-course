import { useState } from 'react';

export default function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const handleStepMinus = () => {
    setStep((currentStep) => currentStep - 1);
  };
  const handleStepPlus = () => {
    setStep((currentStep) => currentStep + 1);
  };
  const handleCountMinus = () => {
    setCount((currentCount) => currentCount - 1 * step);
  };
  const handleCountPlus = () => {
    setCount((currentCount) => currentCount + 1 * step);
  };
  const date = new Date();
  const getDateDaysAdded = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
  };
  return (
    <div className="App">
      <div style={{ margin: '5px' }}>
        <button onClick={handleStepMinus}>-</button>
        <span style={{ margin: '5px' }}>Step: {step}</span>
        <button onClick={handleStepPlus}>+</button>
      </div>
      <div style={{ margin: '5px' }}>
        <button onClick={handleCountMinus}>-</button>
        <span style={{ margin: '5px' }}>Count: {count}</span>
        <button onClick={handleCountPlus}>+</button>
      </div>
      <p>
        {count === 0
          ? `Today is ${date.toDateString()}`
          : count > 0
          ? `${count} days from today is ${getDateDaysAdded(
              date,
              count
            ).toDateString()}`
          : `${Math.abs(count)} days ago today is ${getDateDaysAdded(
              date,
              count
            ).toDateString()}`}
      </p>
    </div>
  );
}
