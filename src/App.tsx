import * as React from 'react';
import './App.css';
import Simulator from './features/ui/Simulator'

class App extends React.Component {

  public render() { 
    return (
      <div className="App">
        <header>
          <h1 className="App-title">Elevator Coding Challenge</h1>
          <Simulator />
        </header>
      </div>
    );
  }
}

export default App;
