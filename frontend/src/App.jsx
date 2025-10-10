import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./app/loginRegister";   
import Dashboard from "./app/dashboard";   
import Employee from "./app/employee-dashboard";     


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-dashboard" element={<Employee />} />
      </Routes>
    </Router>
  );
}

export default App;

