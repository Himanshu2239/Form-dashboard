import React, { useState } from "react";
import { motion } from "framer-motion";

const DropdownForm = () => {
  // Maps for each dropdown with arbitrary values
  const dropdownMaps = {
    Category: {
      Accessories: "AC",
      "Barrel Pipe": "BP",
      "Bell Mouth": "BM",
      Bend: "BN",
      "Blind (Blank Flange)": "BL",
      Cap: "CP",
      Collar: "CL",
      Cross: "CR",
      "Dismantling Joint": "DJ",
      "Flanged Branch Tee": "FB",
      "Flanged Pipe": "FP",
      Gland: "GL",
      "Invert Flanged Branc": "IF",
      Plug: "PL",
      "Puddle Pipe": "PP",
      "Reducer (Taper)": "RT",
      Socket: "SC",
      Spigot: "SG",
      Tee: "TE",
    },
    Type: {
      "ADAPTOR BODY (DJ)": "APB",
      "ALL FLANGED EQU CROSS": "AFX",
      "ALL FLANGED INV TEE": "AFT",
      "ALL FLANGED RADIAL TEE": "AFT",
      "ALL FLANGED TEE": "AFT",
      "ALL SOCKET EQU CROSS": "ASE",
      "ALL SOCKET REDUCING CROSS": "ASR",
      "ALL SOCKET TEE": "AST",
      "BLANK FLANGE": "BFO",
      CAP: "CP",
      "CLAMPING FLANGE REST. EXPRESS DN": "CFR",
      "D F DUCK FOOT BEND": "DFB",
      "D F ECCENTRIC REDUCER": "DFE",
      "D F LONG RADIUS BEND": "DLR",
      "D F PIPE": "DFP",
      "D F PUD PIPE": "DFU",
      "D F PUDDLE PIPE": "DFU",
      "D S FLG BRANCH TEE": "DFT",
      "DISMANTLING JT WITH ACC.": "DJA",
      "DOUBLE FLANGE REDUCER": "DFR",
      "DOUBLE FLANGED BEND": "DFB",
      "DOUBLE MECH JT COLLAR WITH ACC. DN": "DMC",
      "DOUBLE SOCKET BEND": "DSB",
      "DOUBLE SOCKET COLLAR": "DSC",
      "DOUBLE SOCKET DUCK FOOT BEND": "DSD",
      "DOUBLE SOCKET INV TEE": "DSI",
      "DOUBLE SOCKET REDUCER": "DSR",
      "DOUBLE SPIGOT PIPE": "DSP",
      "E-TYPE MECH. JT. GLAND DN": "EMJ",
      "ELECTROLOCK SOCKET": "ELS",
      "F SKT PIPE WLD JT": "SW",
      "FLANGE SOCKET PIPE": "FSP",
      "FLANGED ADAPTOR": "FAP",
      "FLANGED BELL MOUTH": "FBM",
      "FLANGED MECHANICAL SOCKET": "FMS",
      "FLANGED SOCKET": "FSK",
      "FLANGED SPIGOT": "FSG",
      "FLANGED SPIGOT (DJ)": "FSG",
      "LOCKING BAR": "LBR",
      "LOCKING PLATE": "LPL",
      "LOOSE FLANGE (SET) DN": "LFS",
      "MECHANICAL COLLAR": "MCO",
      "MECHANICAL GLAND": "MGO",
      PLUG: "PGO",
      "PUDDLE FLANGE": "PUF",
      "REDUCING FLANGE": "RDF",
      "REST. JT. BOLT DN": "RJB",
      "REST. JT. GLAND DN": "RJG",
      "S F PIPE": "SFP",
      "S F PUD PIPE": "SFU",
      "S F PUDDLE PIPE": "SFU",
      "SFPP WLD JT": "SFW",
      "SOCKET FLANGE REDUCER": "SFR",
      "WELDABLE FLANGE LN": "WFL",
      "WELDABLE FLANGE SN": "WFS",
    },
    Quality: {
      K7: "A",
      K9: "B",
      K12: "C",
      K14: "D",
    },
    Pressure: {
      "PN-10": "1",
      "PN-16": "2",
      "PN-25": "3",
    },
    DN: {
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
    dn: {
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
    Angle: {
      11.25: "W",
      22.5: "X",
      45: "Y",
      90: "Z",
    },
    Suffix: {
      "INVERT TEE": "IT",
      "JOINT WELD": "JW",
      CROSS: "XO",
      REDUCER: "RD",
      BEND: "BN",
      "FOOT BEND": "FB",
    },
  };

  // State to manage form values
  const [formValues, setFormValues] = useState({
    Category: "",
    Type: "",
    Quality: "",
    Pressure: "",
    DN: "",
    dn: "",
    Angle: "",
    Suffix: "",
    input1: "", // T
    input2: "", // t
    input3: "", // L/100
  });

  const [result, setResult] = useState("");

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Function to format values according to the rules provided
  const formatValue = (value) => {
    if (value && !isNaN(value)) {
      const quotient = Math.floor(value).toString().padStart(2, "0");
      return quotient.slice(0, 2);
    } else {
      return "00";
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    let resultString = "";

    // Process each dropdown value based on new dropdown names
    const dropdownKeys = [
      "Category",
      "Type",
      "Quality",
      "Pressure",
      "DN",
      "dn",
      "Angle",
    ];
    dropdownKeys.forEach((key) => {
      const selectedDropdownValue = dropdownMaps[key][formValues[key]] || "00"; // Default to "00"
      resultString += selectedDropdownValue;
    });

    // Process input values with custom logic
    const TValue = formatValue(formValues.input1 / 10); // T divided by 10
    const tValue = formatValue(formValues.input2 / 10); // t divided by 10
    const LValue = formatValue(formValues.input3 / 100); // L divided by 100

    // Concatenate input values
    resultString += `${TValue}${tValue}${LValue}`;

    // Append Suffix dropdown
    const selectedSuffix = dropdownMaps.Suffix[formValues.Suffix] || "00"; // Default to "00"
    resultString += selectedSuffix;

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
        Customize Your Configuration
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-8">
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

        {/* Numeric Inputs */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8"
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
              htmlFor="input1"
              className="block text-base font-medium text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors"
            >
              T (Number):
            </label>
            <input
              type="number"
              name="input1"
              value={formValues.input1}
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
              htmlFor="input2"
              className="block text-base font-medium text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors"
            >
              t (Number):
            </label>
            <input
              type="number"
              name="input2"
              value={formValues.input2}
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
              htmlFor="input3"
              className="block text-base font-medium text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors"
            >
              L (Number):
            </label>
            <input
              type="number"
              name="input3"
              value={formValues.input3}
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
      <motion.div
        className="mt-10 p-6 bg-indigo-50 border border-indigo-200 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
          Selected Values
        </h2>
        <pre className="text-lg text-gray-800 whitespace-pre-wrap">
          {result}
        </pre>
      </motion.div>
    </motion.div>
  );
};

export default DropdownForm;
