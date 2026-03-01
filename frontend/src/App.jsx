import { useState } from 'react'
import './App.css'
import FrameList from './components/FrameList';

function App() {
  return (
    <div className="App">
      <header
        style={{
          backgroundColor: "#282c34",
          padding: "10px",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1>OWL tframes🦉</h1>
      </header>
      <main>
        <FrameList />
      </main>
    </div>
  );
}

export default App
