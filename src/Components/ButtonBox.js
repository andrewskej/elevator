import React, { Component } from 'react'
import { ElevatorConsumer } from '../Contexts/ElevatorStore';
import './style.css'
export default class ButtonBox extends Component {
  render() {
    return (
      <ElevatorConsumer>
        {({state,actions})=> (
        <div className="buttonBox">

            <div className="upDownBox">
              <div style={{color:'navy'}}>↑</div>
              <div onClick={()=>actions.buttonPress('9-d')}>↓</div>
            </div>

            <div className="upDownBox">
              <div onClick={()=>actions.buttonPress('8-u')}>↑</div>
              <div onClick={()=>actions.buttonPress('8-d')}>↓</div>
            </div>

            <div className="upDownBox">
              <div onClick={()=>actions.buttonPress('7-u')}>↑</div>
              <div onClick={()=>actions.buttonPress('7-d')}>↓</div>
            </div>

            <div className="upDownBox">
              <div onClick={()=>actions.buttonPress('6-u')}>↑</div>
              <div onClick={()=>actions.buttonPress('6-d')}>↓</div>
            </div>

            <div className="upDownBox">
              <div onClick={()=>actions.buttonPress('5-u')}>↑</div>
              <div onClick={()=>actions.buttonPress('5-d')}>↓</div>
            </div>

            <div className="upDownBox">
             <div onClick={()=>actions.buttonPress('4-u')}>↑</div>
             <div onClick={()=>actions.buttonPress('4-d')}>↓</div>
            </div>
         
            <div className="upDownBox">
              <div onClick={()=>actions.buttonPress('3-u')}>↑</div>
              <div onClick={()=>actions.buttonPress('3-d')}>↓</div>
            </div>
           
            <div className="upDownBox">
              <div onClick={()=>actions.buttonPress('2-u')}>↑</div>
              <div onClick={()=>actions.buttonPress('2-d')}>↓</div>
            </div>
          
            <div className="upDownBox">
              <div onClick={()=>actions.buttonPress('1-u')}>↑</div>
            </div>

        </div>
        )}
      </ElevatorConsumer>
    )
  }
}
