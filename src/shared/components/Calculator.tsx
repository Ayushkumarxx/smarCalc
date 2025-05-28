import React from "react";
import { IoCellular, IoWifi, IoBatteryFull } from "react-icons/io5";
import useSarcasticCalculator from "../../utils/hooks/useSarcasticCalculator";

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
    <button
      onClick={onClick}
      className={`${baseClasses} ${colSpan} ${className}`}
    >
      {children}
    </button>
  );
};
const Calculator: React.FC = () => {
 const {
    expression,
    result,
    handleNumber,
    handleOperator,
    handleDecimal,
    calculate,
    clear,
    backspace,
  } = useSarcasticCalculator();


  return (
   <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 
  w-[90%] sm:w-[400px] max-w-[95%] 
  rounded-t-[40px] sm:rounded-t-[55px] 
  bg-theme-background border-10 border-b-0 border-theme-dark 
  overflow-hidden shadow-2xl">
      <div className="relative flex justify-between items-center px-6 py-3 text-sm font-semibold text-theme-dark">
        {/* Time */}
        <span>9:41</span>

        {/* Dynamic Island */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-20 h-6 bg-theme-dark rounded-full"></div>

        {/* Icons */}
        <div className="flex items-center space-x-1 text-[18px] text-theme-dark">
          <IoCellular />
          <IoWifi />
          <IoBatteryFull />
        </div>
      </div>

      {/* App Header */}
      <div className="px-6 py-4 border-b border-theme-gray/20">
        <h1 className="text-2xl font-normal text-theme-dark">SmartCalc</h1>
      </div>

      {/* Display Area */}
      <div className="flex-1 px-6 py-6 flex flex-col justify-end">
        <div className="text-right mb-4">
          {/* Expression Display */}
          <div className="text-lg text-theme-gray font-semibold mb-2 h-[24px] break-all">
            {expression || ""}
          </div>
          {/* Result Display */}
          <div className="text-5xl font-normal text-theme-dark">{result}</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-[0px]">
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
      </div>
    </div>
  );
};

export default Calculator;
