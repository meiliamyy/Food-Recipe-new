import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Detail from "./components/Detail";
import AddRecipe from "./components/AddRecipe";
import DeleteRecipe from "./components/DeleteRecipe";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/delete" element={<DeleteRecipe />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
