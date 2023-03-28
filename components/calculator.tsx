import React, { useState } from "react";

const Calculator: React.FC = () => {
  const [result, setResult] = useState("0");
  const [currentValue, setCurrentValue] = useState("");
  const [operator, setOperator] = useState("");

  const handleNumberClick = (value: string) => {
    if (currentValue === "0") {
      setCurrentValue(value);
    } else {
      setCurrentValue(currentValue + value);
    }
  };

  const handleOperatorClick = (value: string) => {
    if (operator !== "") {
      calculate();
    }
    setOperator(value);
    setResult(currentValue);
    setCurrentValue("");
  };

  const handleEqualsClick = () => {
    calculate();
    setOperator("");
  };

  const calculate = () => {
    let num1 = parseFloat(result);
    let num2 = parseFloat(currentValue);

    switch (operator) {
      case "+":
        setResult((num1 + num2).toString());
        break;
      case "-":
        setResult((num1 - num2).toString());
        break;
      case "*":
        setResult((num1 * num2).toString());
        break;
      case "/":
        setResult((num1 / num2).toString());
        break;
      default:
        setResult(currentValue);
        break;
    }
  };

  const handleClearClick = () => {
    setResult("0");
    setCurrentValue("");
    setOperator("");
  };

  return (
    <div className="p-8 text-black bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4 text-4xl font-bold">{result}</div>
      <div className="grid grid-cols-4 gap-4">
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleNumberClick("7")}
        >
          7
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleNumberClick("8")}
        >
          8
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleNumberClick("9")}
        >
          9
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleOperatorClick("+")}
        >
          +
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleNumberClick("4")}
        >
          4
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleNumberClick("5")}
        >
          5
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleNumberClick("6")}
        >
          6
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleOperatorClick("-")}
        >
          -
        </button>

        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleNumberClick("1")}
        >
          1
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleNumberClick("2")}
        >
          2
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleNumberClick("3")}
        >
          3
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleOperatorClick("*")}
        >
          x
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleNumberClick("0")}
        >
          0
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handleOperatorClick("/")}
        >
          ÷
        </button>
        <button
          className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={handleEqualsClick}
        >
          =
        </button>
        <button
          className="col-span-2 px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
          onClick={handleClearClick}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Calculator;
