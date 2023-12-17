import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.js";

function App() {
  const [message, setMessage] = useState("");

  // Fetching message from backend on mount
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_URL}`)
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data));
  // }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<h1>Forgot</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
