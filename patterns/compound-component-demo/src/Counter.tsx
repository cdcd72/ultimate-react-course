import { ReactNode, createContext, useContext, useState } from 'react';

type CounterContextType = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

// 1. Create a context
const CounterContext = createContext<CounterContextType>({
  count: 0,
  increase: () => {},
  decrease: () => {},
});

// 2. Create parent component
function Counter({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);
  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <span>{children}</span>
    </CounterContext.Provider>
  );
}

// 3. Create child components to help implementing the common task
function Count() {
  const { count } = useContext(CounterContext);
  return <span>{count}</span>;
}

function Label({ children }: { children: ReactNode }) {
  return <span>{children}</span>;
}

function Increase({ icon }: { icon: string }) {
  const { increase } = useContext(CounterContext);
  return <button onClick={increase}>{icon}</button>;
}

function Decrease({ icon }: { icon: string }) {
  const { decrease } = useContext(CounterContext);
  return <button onClick={decrease}>{icon}</button>;
}

// 4. Add child components as properties to parent component
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;
