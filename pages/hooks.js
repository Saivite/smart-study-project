import { useEffect, useState } from "react";

const useCounter = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
  }, []);
  console.log("CALLING useCOUNTER");
  return count;
};

const SimpleComponent = () => {
  console.log("CALLING- SIMPLE COMPONENT PAGE");
  const count = useCounter();

  return <h1>Simple Component - {count}</h1>;
};

export default function HooksPage() {
  const count = useCounter();
  console.log("CALLING- HOOKS PAGE");
  return (
    <>
      <h1>Hello World - {count}</h1>
      <SimpleComponent />
    </>
  );
}
