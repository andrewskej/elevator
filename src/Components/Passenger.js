import React, { Component } from 'react'
import { ElevatorConsumer } from '../Contexts/ElevatorStore';

export default class Passenger extends Component {

    render() {
        return (
            <ElevatorConsumer>
                {({state, actions})=> (
                    <div className="passenger" >
                        <img alt="man" style={{bottom: state.passengerY + '%', left: state.passengerX+'px', /*border:'solid 3px green'*/}}  src={require('../elvMan.png')}/>

                    </div>
                )}
            </ElevatorConsumer>
        )
  }
}
