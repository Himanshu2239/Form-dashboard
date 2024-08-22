import React, { useState } from "react";
import { motion } from "framer-motion";

const PipeForm = () => {
  // Dropdown options as arrays of objects
  const dropdownMaps = {
    Flanged: {
      DOUBLE_FLANGED: "DF",
      SINGLE_FLANGED: "SF",
      DOUBLE_SPIGOT: "DS",
      SOCKET_SPIGOT:"SG",
      SINGLE_FLENGED_SOCKET:"FS"
    }, 
    Joint: {
      SCREWED: "S",
      WELDED: "W",
    },
    Puddle: {
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "6",
      6: "7",
      7: "8",
      8: "9",
     
    },
    DIA_in_mm: {
      80: "Y8",
      100: "01",
      125: "12",
      150: "15",
      200: "20",
      250: "25",
      300: "30",
      350: "35",
      400: "40",
      450: "45",
      500: "50",
      600: "60",
      700: "70",
      750: "75",
      800: "80",
      900: "90",
      1000: "10",
      1100: "11",
      1200: "12",
      1400: "14",
      1500: "15",
      1600: "16",
    },
    PN_Value: {
      "PN_Value-10": "A",
      "PN_Value-16": "B",
      "PN_Value-10/16":"C",
      "PN_Value-25": "D",
      "PN_Value-40": "E",
      "PN_Value-63": "F",
      "PN_Value-100": "G",
    },
  };

  // State to manage form values
  const [formValues, setFormValues] = useState({
    Flanged: "",
    Joint: "",
    Puddle: "",
    DIA_in_mm: "",
    PN_Value: "",
    Lengh_in_mm: "",
    Suffix: "",
  });

  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Function to process numeric values for Lengh_in_mm
  const processNumericValue = (value) => {
    if (value && !isNaN(value)) {
      const numericValue = parseFloat(value) / 100;
      
      // Formatting logic
      if (numericValue < 1) {
        const scaledValue = Math.floor(numericValue * 100); // convert 0.7 to 70
        return `Y${scaledValue}`;
      } else if (numericValue >= 1 && numericValue < 10) {
        const scaledValue = Math.floor(numericValue * 10); // convert 7 to 70
        return `${Math.floor(numericValue)}Y${scaledValue % 10}`;
      } else {
        return `${Math.floor(numericValue)}Y`; // convert 70 to 70Y
      }
    } else {
      return "00"; // Default value if input is invalid
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Process Lengh_in_mm input
    const Lengh_in_mmValue = processNumericValue(formValues.Lengh_in_mm);
    
    // Process the suffix to only take the first 2 characters
    const suffixValue = formValues.Suffix.substring(0, 2).toUpperCase();

    // Check if all fields are filled
    const isFormValid = Object.keys(formValues).every((key) => formValues[key]);

    // if (!isFormValid) {
    //   setError("All fields are required");
    //   return;
    // }

    setError("");

    // Generate the barcode string in the specified order
    const resultString = [
      dropdownMaps.Flanged[formValues.Flanged],
      dropdownMaps.Joint[formValues.Joint],
      dropdownMaps.Puddle[formValues.Puddle],
      dropdownMaps.DIA_in_mm[formValues.DIA_in_mm],
      Lengh_in_mmValue,
      dropdownMaps.PN_Value[formValues.PN_Value],
      suffixValue,
    ].join("");

    setResult(resultString);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-8 bg-white shadow-lg rounded-lg max-w-4xl"
    >
      <motion.h1
        className="text-4xl font-bold text-center text-indigo-600 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Product Code For DFID
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Error Message */}
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        {/* Dropdowns in a grid layout (3 per row) */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1, duration: 0.4 },
            },
          }}
        >
          {Object.keys(dropdownMaps).map((dropdownName) => (
            <motion.div
              key={dropdownName}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="relative group"
            >
              <label
                htmlFor={dropdownName}
                className="block text-base font-medium text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors"
              >
                {dropdownName}:
              </label>
              <select
                name={dropdownName}
                value={formValues[dropdownName]}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-transform transform group-hover:scale-105"
              >
                <option value="">Select an option</option>
                {Object.keys(dropdownMaps[dropdownName]).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </motion.div>
          ))}
        </motion.div>

        {/* Numeric Input for Lengh_in_mm */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1, duration: 0.4 },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="relative group"
          >
            <label
              htmlFor="Lengh_in_mm"
              className="block text-base font-medium text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors"
            >
              Lengh_in_mm (Number):
            </label>
            <input
              type="number"
              step="0.1"
              name="Lengh_in_mm"
              value={formValues.Lengh_in_mm}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-transform transform group-hover:scale-105"
            />
          </motion.div>

          {/* Suffix Input */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="relative group"
          >
            <label
              htmlFor="Suffix"
              className="block text-base font-medium text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors"
            >
              Suffix (Either Number or Alphabet):
            </label>
            <input
              type="text"
              name="Suffix"
              value={formValues.Suffix}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-transform transform group-hover:scale-105"
            />
          </motion.div>
        </motion.div>

        {/* Submit Button */}
        <motion.div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="inline-block w-full sm:w-auto bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
          >
            Submit
          </motion.button>
        </motion.div>
      </form>

      {/* Result Display */}
      {result && (
        <motion.div
          className="mt-10 p-6 bg-indigo-50 border border-indigo-200 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
            SKU CODE
          </h2>
          <pre className="text-lg text-gray-800 whitespace-pre-wrap">
            {result}
          </pre>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PipeForm;
