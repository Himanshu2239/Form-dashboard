import React, { useState } from "react";
import { motion } from "framer-motion";

const PipeForm = () => {
  // Dropdown options as arrays of objects
  const dropdownMaps = {
    Flanged: {
      DF: "DF",
      SF: "SF",
    },
    Joint: {
      SCREWED: "S",
      WELDED: "W",
    },
    Puddle: {
      PUDDLE: "1",
      NOPUDDLE: "0",
    },
    DIAmm: {
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
    PN: {
      "PN-10": "A",
      "PN-16": "B",
      "PN-25": "C",
      "PN-40": "D",
      "PN-63": "E",
      "PN-100": "F",
    },
  };

  // State to manage form values
  const [formValues, setFormValues] = useState({
    Flanged: "",
    Joint: "",
    Puddle: "",
    DIAmm: "",
    PN: "",
    Length: "",
    Pressure: "",
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

  // Function to process numeric values for Length and Pressure
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

    // Process Length and Pressure inputs
    const lengthValue = processNumericValue(formValues.Length);
    const pressureValue = processNumericValue(formValues.Pressure);

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
      dropdownMaps.DIAmm[formValues.DIAmm],
      lengthValue,
      dropdownMaps.PN[formValues.PN],
      pressureValue,
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
        Product Code For DIDF
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

        {/* Numeric Inputs for Length and Pressure */}
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
              htmlFor="Length"
              className="block text-base font-medium text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors"
            >
              Length (Number):
            </label>
            <input
              type="number"
              step="0.1"
              name="Length"
              value={formValues.Length}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-transform transform group-hover:scale-105"
            />
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="relative group"
          >
            <label
              htmlFor="Pressure"
              className="block text-base font-medium text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors"
            >
              Pressure (Number):
            </label>
            <input
              type="number"
              step="0.1"
              name="Pressure"
              value={formValues.Pressure}
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
