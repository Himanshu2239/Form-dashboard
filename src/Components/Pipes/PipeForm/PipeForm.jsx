import React, { useState } from "react";
import { motion } from "framer-motion";

const PipeForm = () => {
  // Dropdown options as arrays of objects
  const dropdownMaps = {
    Flanged: {
      DOUBLE_FLANGED: "DF",
      SINGLE_FLANGED: "SF",
      DOUBLE_SPIGOT: "DS",
      SOCKET_SPIGOT: "SG",
      SINGLE_FLENGED_SOCKET: "FS",
      NO_FLANGED: "00", // No Flanged option
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
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
    },
    Necks: {
      // Necks dropdown options
      SHORT_NECKS: "SN",
      LONG_NECK: "LN",
      NO_NECK: "00",
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
      "PN_Value-10/16": "C",
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
    Necks: "", // Necks state
    DIA_in_mm: "",
    PN_Value: "",
    pressure: "", // Pressure field
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
      const numericValue = parseFloat(value);

      // Formatting logic for values less than 100
      if (numericValue < 100) {
        const scaledValue = Math.floor(numericValue / 10); // convert 0.7 to 70
        return `Y${scaledValue}`;
      }

      // Formatting logic for values between 100 and 900
      if (numericValue >= 100 && numericValue <= 900) {
        const hundredsDigit = Math.floor(numericValue / 100); // convert 100 to 1, 200 to 2, etc.
        return `0${hundredsDigit}`;
      }

      // Formatting logic for values above 1000
      if (numericValue >= 1000) {
        const thousandsDigit = Math.floor(numericValue / 100); // convert 1100 to 11, 1200 to 12, etc.
        return `${thousandsDigit}`;
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

    // Process the suffix to only take the first 3 characters
    const suffixValue = formValues.Suffix.substring(0, 3).toUpperCase() || "00"; // Default to "00" if empty

    // Add pressure value directly to barcode (use default "00" if empty)

    //Pressure :
    const pressureValue = processNumericValue(formValues.pressure);

    // Generate the barcode string in the specified order, defaulting to "00" if no value is selected
    const resultString = [
      dropdownMaps.Flanged[formValues.Flanged] || "00", // Default to "00"
      dropdownMaps.Joint[formValues.Joint] || "00", // Default to "00"
      dropdownMaps.Puddle[formValues.Puddle] || "00", // Default to "00"
      dropdownMaps.Necks[formValues.Necks] || "00", // Default to "00"
      dropdownMaps.DIA_in_mm[formValues.DIA_in_mm] || "00", // Default to "00"
      pressureValue, // Add the pressure value before the length
      Lengh_in_mmValue || "00", // Default to "00"
      dropdownMaps.PN_Value[formValues.PN_Value] || "00", // Default to "00"
      suffixValue, // Processed suffix value
    ].join("");

    setResult(resultString);
  };

  const handleReset = (e) => {
    e.preventDefault();
    // Resetting all form values
    setFormValues({
      Flanged: "",
      Joint: "",
      Puddle: "",
      Necks: "", // Reset Necks
      DIA_in_mm: "",
      PN_Value: "",
      pressure: "", // Reset pressure field
      Lengh_in_mm: "",
      Suffix: "",
    });
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

        {/* Numeric Input for Pressure and Lengh_in_mm */}
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
              htmlFor="pressure"
              className="block text-base font-medium text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors"
            >
              Pressure (Number):
            </label>
            <input
              type="number"
              step="0.1"
              name="pressure"
              value={formValues.pressure}
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
              Suffix (Text and number):
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
        <div className="flex flex-row gap-4 justify-center items-center">
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
          <motion.div className="text-center" onClick={handleReset}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="inline-block w-full sm:w-auto bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
              Reset
            </motion.button>
          </motion.div>
        </div>
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
