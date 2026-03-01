import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrameList from "./components/FrameList";
import PartsList from "./components/PartsList"; 
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header
          style={{
            backgroundColor: "#282c34",
            padding: "10px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1>ow library 🦉</h1>
        </header>

        <main>
          <Routes>
            {/* Main Inventory Page */}
            <Route path="/" element={<FrameList />} />

            {/* Specific Package Parts Page */}
            <Route path="/parts/:id" element={<PartsList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
