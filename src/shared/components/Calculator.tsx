import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoCellular, IoWifi, IoBatteryFull } from "react-icons/io5";
import useSarcasticCalculator from "../../utils/hooks/useSarcasticCalculator";
import loadingMessages from "../../utils/const/lodingConst";

const CalcButton = ({ children, onClick, className = "", span = 1 }: any) => {
  const baseClasses = `${
    span > 1 ? "" : "aspect-square"
  } w-full text-theme-dark text-2xl border-[0.5px] border-theme-gray active:scale-95 transition-transform flex items-center justify-center rounded-none cursor-pointer`;

  const spanClassMap: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
  };

  const colSpan = spanClassMap[span] || "col-span-1";

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${colSpan} ${className}`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  );
};

const Calculator: React.FC = () => {
  const {
    expression,
    result,
    showLoading,
    handleNumber,
    handleOperator,
    handleDecimal,
    calculate,
    clear,
    backspace,
  } = useSarcasticCalculator();

  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  useEffect(() => {
    let interval: any;
    if (showLoading) {
      interval = setInterval(() => {
        setLoadingTextIndex(
          (prevIndex) => (prevIndex + 1) % loadingMessages.length
        );
      }, 500); // change every 500ms
    } else {
      setLoadingTextIndex(0); // reset on hide
    }

    return () => clearInterval(interval);
  }, [showLoading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.1,
      }}
      className="absolute top-[15%] left-1/2 transform -translate-x-1/2 
  w-[95%] sm:w-[400px] max-w-[95%] 
  rounded-t-[40px] sm:rounded-t-[55px] 
  bg-theme-background border-10 border-b-0 border-theme-dark 
  overflow-hidden shadow-2xl"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative flex justify-between items-center px-6 py-3 text-sm font-semibold text-theme-dark"
      >
        {/* Time */}
        <span>9:41</span>

        {/* Dynamic Island */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute left-1/2 transform -translate-x-1/2 h-6 bg-theme-dark rounded-full"
        ></motion.div>

        {/* Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center space-x-1 text-[18px] text-theme-dark"
        >
          <IoCellular />
          <IoWifi />
          <IoBatteryFull />
        </motion.div>
      </motion.div>

      {/* App Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 py-4 border-b border-theme-gray/20"
      >
        <h1 className="text-2xl font-normal text-theme-dark">SmartCalc</h1>
      </motion.div>

      {/* Display Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex-1 px-6 py-6 flex flex-col justify-end"
      >
        <div className="text-right mb-4">
          {/* Expression Display */}
          <div className="text-lg text-theme-gray font-semibold mb-2 h-[24px] break-all">
            {expression || ""}
          </div>
          {/* Result Display */}
          <motion.div
            key={showLoading ? loadingTextIndex : result}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`font-normal text-theme-dark h-[48px] flex justify-end items-center ${
              showLoading
                ? "text-xl italic text-theme-gray"
                : /^\d+$/.test(result) ||
                  [
                    "+",
                    "-",
                    "*",
                    "/",
                    "%",
                    ".",
                    "x",
                    "×",
                    "÷",
                    "(",
                    ")",
                    "error",
                  ].includes(result.toLowerCase())
                ? "text-4xl md:text-5xl"
                : "text-[24px] md:text-[26px]"
            }`}
          >
            {showLoading ? loadingMessages[loadingTextIndex] : result}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, staggerChildren: 0.02 }}
        className="grid grid-cols-4 gap-[0px]"
      >
        {/* Row 1 */}
        <CalcButton onClick={clear} className="text-lg">
          AC
        </CalcButton>
        <CalcButton onClick={backspace} className="text-xl">
          ⌫
        </CalcButton>
        <CalcButton onClick={() => handleOperator("%")}>%</CalcButton>
        <CalcButton onClick={() => handleOperator("÷")}>÷</CalcButton>

        {/* Row 2 */}
        <CalcButton onClick={() => handleNumber("7")}>7</CalcButton>
        <CalcButton onClick={() => handleNumber("8")}>8</CalcButton>
        <CalcButton onClick={() => handleNumber("9")}>9</CalcButton>
        <CalcButton
          onClick={() => handleOperator("×")}
          className="bg-theme-orange"
        >
          ×
        </CalcButton>

        {/* Row 3 */}
        <CalcButton onClick={() => handleNumber("4")}>4</CalcButton>
        <CalcButton onClick={() => handleNumber("5")}>5</CalcButton>
        <CalcButton onClick={() => handleNumber("6")}>6</CalcButton>
        <CalcButton
          onClick={() => handleOperator("-")}
          className="bg-theme-orange"
        >
          −
        </CalcButton>

        {/* Row 4 */}
        <CalcButton onClick={() => handleNumber("1")}>1</CalcButton>
        <CalcButton onClick={() => handleNumber("2")}>2</CalcButton>
        <CalcButton onClick={() => handleNumber("3")}>3</CalcButton>
        <CalcButton
          onClick={() => handleOperator("+")}
          className="bg-theme-orange"
        >
          +
        </CalcButton>

        {/* Row 5 */}
        <CalcButton onClick={() => handleNumber("0")} span={2}>
          0
        </CalcButton>
        <CalcButton onClick={handleDecimal}>.</CalcButton>
        <CalcButton onClick={calculate} className="bg-theme-yellow font-medium">
          =
        </CalcButton>
      </motion.div>
    </motion.div>
  );
};

export default Calculator;
