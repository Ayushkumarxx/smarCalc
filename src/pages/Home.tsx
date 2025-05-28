import React from "react";
import Layouts from "../shared/layout/export";
import Components from "../shared/components/export";
import { APP_FIRST_NAME_2, APP_LAST_NAME } from "../utils/const/appConst";

const Home: React.FC = () => {
  return (
    <Layouts.home>
      <Components.navbar />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[calc(50%-50px)] -rotate-4 max-md:hidden">
        <div className="text-[150px] leading-35 font-extrabold tracking-widest ">
          {APP_FIRST_NAME_2.toUpperCase()}
        </div>
        <div className="text-[150px] leading-none font-semibold tracking-widest">
          {APP_LAST_NAME.toUpperCase()}
        </div>
      </div>
      <Components.calculator />
    </Layouts.home>
  );
};

export default Home;
