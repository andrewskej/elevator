import React, { Component } from 'react'
import { ElevatorConsumer } from '../Contexts/ElevatorStore';

export default class Passenger extends Component {
    

    componentDidMount(){
    }



    render() {
    
        return (
            <ElevatorConsumer>
                {({state, actions})=> (
                    <div className="passenger" >
                        <img alt="man" style={{bottom:state.passengerY+'%', left:state.passengerX+'px'}}  src={require('../elvMan.png')}/>
                    </div>
                )}
            </ElevatorConsumer>
        )
  }
}
