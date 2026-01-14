import Footer from "@/component/shared/Footer";
import Navbar from "@/component/shared/Navbar";
import React from "react";
import { Toaster } from "react-hot-toast";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
};

export default layout;
