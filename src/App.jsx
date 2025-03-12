import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Detail from "./components/Detail";
import AddRecipe from "./components/AddRecipe"; // Import komponen input resep


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/add" element={<AddRecipe />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
