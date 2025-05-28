import { useState, useCallback, useMemo } from "react";
import sarcasticPhrases from "../const/sarcasticConst";


const useSarcasticCalculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [isNewCalculation, setIsNewCalculation] = useState(true);

  const isOperator = useCallback((char: string) => ["+", "-", "×", "÷"].includes(char), []);
  const isUnaryOperator = useCallback((char: string) => ["+", "-"].includes(char), []);

  const handleNumber = useCallback((num: string) => {
    if (isNewCalculation) {
      setExpression(num);
      setResult(num);
      setIsNewCalculation(false);
    } else {
      const newExpression = expression + num;
      setExpression(newExpression);

      const parts = newExpression.split(/([+\-×÷])/);
      setResult(parts[parts.length - 1]);
    }
  }, [expression, isNewCalculation]);

  const handleOperator = useCallback((op: string) => {
    const lastChar = expression.slice(-1);

    if (!expression) {
      if (isUnaryOperator(op)) {
        setExpression(op);
        setResult(op);
        setIsNewCalculation(false);
      }
      return;
    }

    if (isOperator(lastChar)) {
      setExpression(expression.slice(0, -1) + op);
    } else {
      setExpression(expression + op);
    }

    setResult(op);
    setIsNewCalculation(false);
  }, [expression, isOperator, isUnaryOperator]);

  const handleDecimal = useCallback(() => {
    if (isNewCalculation) {
      setExpression("0.");
      setResult("0.");
      setIsNewCalculation(false);
    } else {
      const lastChar = expression.slice(-1);
      const parts = expression.split(/([+\-×÷])/);
      const currentNumber = parts[parts.length - 1];

      if (isOperator(lastChar) || expression === "") {
        setExpression(expression + "0.");
        setResult("0.");
      } else if (!currentNumber.includes(".")) {
        setExpression(expression + ".");
        setResult(currentNumber + ".");
      }
    }
  }, [expression, isNewCalculation, isOperator]);

  const calculate = useCallback(() => {
    try {
      if (!expression || isOperator(expression.slice(-1))) return;

      const calcExpression = expression.replace(/×/g, "*").replace(/÷/g, "/");

      const evalResult = eval(calcExpression); // ⚠️ In production, use math.js instead
      const random = Math.random();

      if (random < 0.7) {
        const sarcastic = sarcasticPhrases[Math.floor(Math.random() * sarcasticPhrases.length)];
        setResult(sarcastic);
      } else {
        setResult(evalResult.toString());
      }

      setExpression("");
      setIsNewCalculation(true);
    } catch {
      setResult("Error? Maybe...");
      setExpression("");
      setIsNewCalculation(true);
    }
  }, [expression, isOperator]);

  const clear = useCallback(() => {
    setExpression("");
    setResult("0");
    setIsNewCalculation(true);
  }, []);

  const backspace = useCallback(() => {
    if (isNewCalculation || expression === "") {
      clear();
      return;
    }

    const newExpression = expression.slice(0, -1);
    setExpression(newExpression);

    if (newExpression === "") {
      setResult("0");
      setIsNewCalculation(true);
    } else {
      const parts = newExpression.split(/([+\-×÷])/);
      const lastPart = parts[parts.length - 1];

      if (isOperator(lastPart)) {
        const prevNumber = parts[parts.length - 3] || "0";
        setResult(prevNumber);
      } else {
        setResult(lastPart || "0");
      }
    }
  }, [expression, isNewCalculation, isOperator, clear]);

  const lastNumber = useMemo(() => {
    const parts = expression.split(/([+\-×÷])/);
    return parts[parts.length - 1];
  }, [expression]);

  return {
    expression,
    result,
    lastNumber,
    handleNumber,
    handleOperator,
    handleDecimal,
    calculate,
    clear,
    backspace,
  };
};

export default useSarcasticCalculator;
