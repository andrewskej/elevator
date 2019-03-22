import React, { Component } from 'react';
import Elevator from './Components/Elevator';
import { ElevatorProvider } from './Contexts/ElevatorStore';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ElevatorProvider>
          <Elevator/>
        </ElevatorProvider>
      </div>
    );
  }
}

export default App;
