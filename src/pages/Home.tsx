import React from "react";
import { motion } from "framer-motion";
import Layouts from "../shared/layout/export";
import Components from "../shared/components/export";
import { APP_FIRST_NAME_2, APP_LAST_NAME } from "../utils/const/appConst";

const Home: React.FC = () => {
  return (
    <Layouts.home>
      <Components.navbar />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: -4 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.3,
          ease: "easeOut"
        }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[calc(50%-50px)] max-md:hidden"
      >
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[150px] leading-35 font-extrabold tracking-widest"
        >
          {APP_FIRST_NAME_2.toUpperCase()}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-[150px] leading-none font-semibold tracking-widest"
        >
          {APP_LAST_NAME.toUpperCase()}
        </motion.div>
      </motion.div>
      <Components.calculator />
    </Layouts.home>
  );
};

export default Home;