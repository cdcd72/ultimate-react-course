import { useState } from 'react';
import BillInput from './BillInput';
import SelectPercentage from './SelectPercentage';
import CostOutput from './CostOutput';
import Reset from './Reset';

export default function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [myPercentage, setMyPercentage] = useState(0);
  const [friendPercentage, setFriendPercentage] = useState(0);
  const tip = bill * ((myPercentage + friendPercentage) / 2 / 100);
  const handleReset = () => {
    setBill(0);
    setMyPercentage(0);
    setFriendPercentage(0);
  };
  return (
    <div>
      <BillInput bill={bill} onHandleBill={setBill} />
      <SelectPercentage
        percentage={myPercentage}
        onHandlePercentage={setMyPercentage}
      >
        <span>How did you like the service?</span>
      </SelectPercentage>
      <SelectPercentage
        percentage={friendPercentage}
        onHandlePercentage={setFriendPercentage}
      >
        <span>How did your friend like the service?</span>
      </SelectPercentage>
      {bill > 0 && (
        <>
          <CostOutput bill={bill} tip={tip} />
          <Reset onHandleReset={handleReset} />
        </>
      )}
    </div>
  );
}
