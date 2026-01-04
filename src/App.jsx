import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


// trendcart/
// ├── node_modules/     ← Dependencies (don't touch!)
// ├── public/           ← Static files (images, index.html)
// ├── src/              ← Our code goes HERE! 👈
// │   ├── App.js        ← Main component
// │   ├── App.css       ← Main styles
// │   └── index.js      ← Entry point
// ├── package.json      ← Project settings
// └── README.md         ← Instruction