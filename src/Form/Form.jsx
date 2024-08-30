import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineRefresh } from "react-icons/hi";

const Form = () => {
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
      "Invert Flanged Branch": "IF",
      Plug: "PL",
      "Puddle Pipe": "PP",
      "Reducer (Taper)": "RT",
      Socket: "SC",
      Spigot: "SG",
      Tee: "TE",
      "socket branch Tee": "SB",
      "Inv Socket Branch": "IS"
    },
    Type: {
      "ADAPTOR BODY (DJ)": "APB",
      "ALL FLANGED EQU CROSS": "AFX",
      "ALL FLANGED INV TEE": "AFI",
      "ALL FLANGED RADIAL TEE": "AFR",
      "ALL FLANGED TEE": "AFT",
      "ALL SOCKET EQU CROSS": "ASE",
      "ALL SOCKET REDUCING CROSS": "ASR",
      "ALL SOCKET TEE": "AST",
      "BLANK FLANGE": "BFO",
      "CAP": "COP",
      "CLAMPING FLANGE REST. EXPRESS DN": "CFR",
      "D F DUCK FOOT BEND": "DFB",
      "D F ECCENTRIC REDUCER": "DFE",
      "D F LONG RADIUS BEND": "DLR",
      "D F PIPE": "DFP",
      "D F PUD PIPE": "DFU",
      "D F PUDDLE PIPE": "DPL",
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
      "F SKT PIPE WLD JT": "SOW",
      "FLANGE SOCKET PIPE": "FSP",
      "FLANGED ADAPTOR": "FAP",
      "FLANGED BELL MOUTH": "FBM",
      "FLANGED MECHANICAL SOCKET": "FMS",
      "FLANGED SOCKET": "FSK",
      "FLANGED SPIGOT": "FSG",
      "FLANGED SPIGOT (DJ)": "FSD",
      "LOCKING BAR": "LBR",
      "LOCKING PLATE": "LPL",
      "LOOSE FLANGE (SET) DN": "LFS",
      "MECHANICAL COLLAR": "MCO",
      "MECHANICAL GLAND": "MGO",
      "PLUG": "PGO",
      "PUDDLE FLANGE": "PUF",
      "REDUCING FLANGE": "RDF",
      "REST. JT. BOLT DN": "RJB",
      "REST. JT. GLAND DN": "RJG",
      "S F PIPE": "SFP",
      "S F PUD PIPE": "SFU",
      "S F PUDDLE PIPE": "SPD",
      "SFPP WLD JT": "SFW",
      "SOCKET FLANGE REDUCER": "SFR",
      "WELDABLE FLANGE LN": "WFL",
      "WELDABLE FLANGE SN": "WFS",
      "DOUBLE FLANGED INV TEE": "DFI",
      "DF SKT BRANCH TEE": "DST",
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
      "PN-10/16": "3",
      "PN-25": "4",
      "PN-40": "5",
    },
    "Major Part Dia(mm)": {
      80: "Y8",
      100: "10",
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
    "Branch Dia(mm)": {
      50: "Y5",
      80: "Y8",
      100: "10",
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
      NA: "00",
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
    Angle: {
      11.25: "W",
      22.5: "X",
      45: "Y",
      90: "Z",
      NA: "O",
    },
  };

  const [formValues, setFormValues] = useState({
    Category: "",
    Type: "",
    Quality: "",
    Pressure: "",
    "Major Part Dia(mm)": "",
    "Branch Dia(mm)": "",
    Puddle: "",
    Angle: "",
    Suffix: "",
    input3: "", // Length in mm
  });

  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formatLValue = (value) => {
    if (value && !isNaN(value)) {
      const numericValue = Math.floor(parseFloat(value) / 10);
      return numericValue.toString().padStart(3, "0"); // Always 3 digits
    }
    return "000"; // Default value if input is invalid
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(""); // Clear error if values are valid

    let resultString = "";

    const dropdownKeys = [
      "Category",
      "Type",     // Updated to default to "000"
      "Quality",  // Updated to default to "0"
      "Pressure", // Updated to default to "0"
      "Major Part Dia(mm)",
      "Branch Dia(mm)",
      "Puddle",   // Updated to default to "0"
      "Angle",    // Updated to default to "0"
    ];

    dropdownKeys.forEach((key) => {
      // Default for "Quality", "Pressure", "Puddle", and "Angle" is "0", "Type" is "000"
      const defaultSingleZeroKeys = ["Quality", "Pressure", "Puddle", "Angle"];
      const selectedDropdownValue = dropdownMaps[key][formValues[key]] || (key === "Type" ? "000" : (defaultSingleZeroKeys.includes(key) ? "0" : "00"));
      resultString += selectedDropdownValue;
    });

    const LValue = formatLValue(formValues.input3); // Process L value
    resultString += LValue;

    const suffixValue = formValues.Suffix.substring(0, 3).padStart(3, "0").toUpperCase() || "000"; // Default to "000"
    resultString += suffixValue;

    setResult(resultString);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormValues({
      Category: "",
      Type: "",
      Quality: "",
      Pressure: "",
      "Major Part Dia(mm)": "",
      "Branch Dia(mm)": "",
      Puddle: "",
      Angle: "",
      Suffix: "",
      input3: "", // Length in mm
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
        PRODUCT CODE FOR DI FITTINGS
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

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
              htmlFor="input3"
              className="block text-base font-medium text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors"
            >
              Length_in_mm (Number):
            </label>
            <input
              type="number"
              step="0.1"
              name="input3"
              value={formValues.input3}
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
              htmlFor="Suffix"
              className="block text-base font-medium text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors"
            >
              Suffix (Text and Numbers):
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

        <div className="flex flex-row gap-4 justify-center">
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

      <motion.div
        className="mt-10 p-6 bg-indigo-50 border border-indigo-200 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">SKU CODE</h2>
        <pre className="text-lg text-gray-800 whitespace-pre-wrap">
          {result}
        </pre>
      </motion.div>
    </motion.div>
  );
};

export default Form;
