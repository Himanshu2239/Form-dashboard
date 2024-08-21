import React from "react";
import { motion } from "framer-motion";
import Logo from "../../assets/Picture1.png";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-indigo-600 shadow-md py-4"
    >
      <div className="container mx-auto flex items-center justify-between px-10">
        <motion.img
          src={Logo}
          alt="Logo"
          className="h-12 w-auto"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
       
        </motion.div>
      </div>
    </motion.header>
  );
}
