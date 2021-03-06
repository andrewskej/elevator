import React, { Component, Fragment } from 'react'
import { ElevatorConsumer } from '../Contexts/ElevatorStore';
import ButtonBox from './ButtonBox';
import OneColumn from './OneColumn';
import Passenger from './Passenger';

export default class Elevator extends Component {
  render() {
    return (
      <ElevatorConsumer>
        {({state, actions})=> (
          <Fragment>
            <div className="panel">
              {state.panelText}
            </div>
            <div className="columns">
              <OneColumn columnNo="col1" carNo="car1" pos={state.car1Pos}/>
              <OneColumn columnNo="col2" carNo="car2" pos={state.car2Pos}/>
              <OneColumn columnNo="col3" carNo="car3" pos={state.car3Pos}/>
              <Passenger/>
              <ButtonBox/>
            </div>
          </Fragment>
        )}
      </ElevatorConsumer>
    )
  }
}
