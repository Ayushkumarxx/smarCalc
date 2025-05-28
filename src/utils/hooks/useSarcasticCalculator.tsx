import { useState, useCallback, useMemo } from "react";
import sarcasticPhrases from "../const/sarcasticConst";
import useGeminiHumor from "./useGeminiHumor";

// Utility for delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const useSarcasticCalculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [isNewCalculation, setIsNewCalculation] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [isAIResponse, setIsAIResponse] = useState(false);
  const { fetchSnarkyReply } = useGeminiHumor();
  const isOperator = useCallback(
    (char: string) => ["+", "-", "×", "÷"].includes(char),
    []
  );
  const isUnaryOperator = useCallback(
    (char: string) => ["+", "-"].includes(char),
    []
  );

  const handleNumber = useCallback(
    (num: string) => {
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
    },
    [expression, isNewCalculation]
  );

  const handleOperator = useCallback(
    (op: string) => {
      const lastChar = expression.slice(-1);
      if (!expression) {
        if (!isAIResponse) {
          setExpression(result + op);
          setResult(op);
          setIsNewCalculation(false);
        } else if (isUnaryOperator(op)) {
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
    },
    [expression, isOperator, isUnaryOperator]
  );

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

  const calculate = useCallback(async () => {
    if (!expression || isOperator(expression.slice(-1))) return;

    setShowLoading(true);
    setIsAIResponse(false);

    try {
      const calcExpression = expression.replace(/×/g, "*").replace(/÷/g, "/");
      const evalResult = eval(calcExpression); // ⚠️ Replace in production
      const random = Math.random();

      if (random < 0.15) {
        // Gemini humor (15%)
        const aiReply = await fetchSnarkyReply(expression);

        if (aiReply) {
          setResult(aiReply);
          setIsAIResponse(true);
        } else {
          // fallback to local sarcastic phrase
          const sarcastic =
            sarcasticPhrases[
              Math.floor(Math.random() * sarcasticPhrases.length)
            ];
          setResult(sarcastic);
          setIsAIResponse(true);
        }
      } else if (random < 0.40) {
        await delay(1000); // simulate delay
        // Use local sarcastic line
        const sarcastic =
          sarcasticPhrases[Math.floor(Math.random() * sarcasticPhrases.length)];
        setResult(sarcastic);
        setIsAIResponse(true);
      } else {
        await delay(500);
        setResult(evalResult.toString());
      }
    } catch {
      setResult("Error? Maybe...");
      setIsAIResponse(true);
    } finally {
      setExpression("");
      setIsNewCalculation(true);
      setShowLoading(false);
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
    showLoading,
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
