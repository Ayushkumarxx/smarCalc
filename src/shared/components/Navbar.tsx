import React from "react";
import {
  APP_FIRST_NAME,
  APP_LAST_NAME,
  CREATOR,
  CREATOR_EMAIL,
} from "../../utils/const/appConst";

const Navbar: React.FC = () => {
  return (
    <nav className="max-w-[1450px] mx-auto  flex flex-row items-baseline gap-4 lg:gap-0 text-theme-dark">
      <section className="flex-2">
        <div className="flex flex-col gap-1">
          <div className="font-extrabold text-2xl sm:text-3xl lg:text-4xl">{APP_FIRST_NAME}</div>
          <div className="text-2xl sm:text-3xl lg:text-4xl">{APP_LAST_NAME}</div>
        </div>
      </section>
     <section className="flex flex-row items-center gap-6">
    <div className="hidden md:flex flex-col">
      <div className="text-sm sm:text-base">Email</div>
      <div className="font-bold text-sm sm:text-base break-all">{CREATOR_EMAIL}</div>
    </div>
    <div className="flex flex-col">
      <div className="text-sm sm:text-base">Created by</div>
      <div className="font-bold text-sm sm:text-base">{CREATOR}</div>
    </div>
  </section>
    </nav>
  );
};

export default Navbar;