import { useState } from 'react';
import './App.css';
import AutocompleteWithClass from './components/AutocompleteWithClass';
import AutocompleteWithFunc from './components/AutocompleteWithFunc';

function App() {

  const [isServerRemote, setIsServerRemote] = useState(false)

  const enableLocalServer = (remote) => {
    if(isServerRemote) {
      window.server = 'db.json'
      setIsServerRemote(false)
    }
    else {
      window.server = 'http://localhost:3004/words'
      setIsServerRemote(true)
    }


  }

  return (
    <div className="App">
      <div className="header">
        <pre>Server in use: {isServerRemote ? 'http://localhost:3004' : 'db.json ' }</pre>
        <button onClick={enableLocalServer}>Switch to {isServerRemote ? 'static' : 'remote ' } server</button>
      </div>
      <div className="app-container">
        <div className="app-content">
          <h1>Autocomplete with Class</h1>
          <AutocompleteWithClass />
        </div>
        <div className="app-content">
          <h1>Autocomplete with Functional</h1>
          <AutocompleteWithFunc />
        </div>
      </div>
    </div>
  );
}

export default App;
