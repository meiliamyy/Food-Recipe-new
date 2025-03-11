import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Detail from "./components/Detail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
