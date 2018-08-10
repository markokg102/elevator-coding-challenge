import * as React from 'react';
import './App.css';

import Building from './features/model/Building'

class App extends React.Component {

  private building: Building;

  constructor(props: any) {
    super(props); 

    this.building = new Building(20, 2);

  }

  public render() { 
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Elevator Coding Challenge</h1>
          Building with: {this.building.getAmmountOfFloors()} floors and {this.building.getAmmountOfElevators()} elevators.
        </header>
      </div>
    );
  }
}

export default App;
