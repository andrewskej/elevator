import React, { Component } from 'react'
import { ElevatorConsumer } from '../Contexts/ElevatorStore';

export default class Passenger extends Component {

    render() {
        return (
            <ElevatorConsumer>
                {({state})=> (
                    <div className="passenger" >
                        <img alt="man" style={{bottom: state.passengerY + '%', left: state.passengerX+'px'}}  src={require('../elvMan.png')}/>
                    </div>
                )}
            </ElevatorConsumer>
        )
  }
}
