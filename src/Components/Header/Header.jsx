import React from "react";
import { motion } from "framer-motion";
import Logo from "../../assets/Picture1.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Array of navigation items
  const navItems = [
    { label: "Fittings", navigateTo: "/" },
    { label: "DFID", navigateTo: "/pipes" },
  ];

  // Function to check if the current item is active
  const isActive = (path) => location.pathname === path;

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
          className="flex items-center space-x-8"
        >
          {/* Dynamically generate navigation links */}
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate(item.navigateTo)}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Apply active style */}
                <span
                  className={`text-lg transition-colors duration-300 ${
                    isActive(item.navigateTo)
                      ? "text-yellow-400"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  {item.label}
                </span>

                {/* Cool animated underline */}
                {isActive(item.navigateTo) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-[-4px] left-0 right-0 h-1 bg-yellow-400 rounded"
                  />
                )}
              </motion.div>

              {/* Add vertical line between navigation items, but not after the last item */}
              {index < navItems.length - 1 && (
                <div className="h-4 w-px bg-gray-300"></div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </motion.header>
  );
}
