import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Form from "./Form/Form";
import "./App.css";
import Header from "./Components/Header/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Form />
    </>
  );
}

export default App;
