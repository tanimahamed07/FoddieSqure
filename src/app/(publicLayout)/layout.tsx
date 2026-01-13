import Footer from "@/component/shared/Footer";
import Navbar from "@/component/shared/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default layout;
