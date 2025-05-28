import React from "react";

const HomeLayout: React.FC<any> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-theme-background">
      {/* Fixed Rotated Background */}
   <div
  className="
    fixed inset-0 w-full 
    h-[600px] sm:h-[800px] md:h-[1000px] 
    transform 
    rotate-6 sm:rotate-12 
    scale-125 sm:scale-150 
    bg-theme-background
  "
  style={{
    backgroundImage: `
      linear-gradient(#918D82 .5px, transparent .5px), 
      linear-gradient(to right, #918D82 .5px, transparent .5px)
    `,
    backgroundSize: "250px 150px",
  }}
/>

      

      {/* Scrollable Content */}
      <div className="relative p-8 min-h-screen">{children}</div>
    </div>
  );
};

export default HomeLayout;
