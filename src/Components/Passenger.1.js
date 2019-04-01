import React, { Component } from 'react'
import { ElevatorConsumer } from '../Contexts/ElevatorStore';

export default class Passenger extends Component {

    randomAppear = () => {
        const positions = [0,11,22,33,44,55,66,77,88]
        let beginPos = positions[Math.ceil(Math.random()*positions.length)]
        console.log('beginPos', beginPos)
        const beginFloor = Number(beginPos/11) + 1
        return beginFloor //시작층
    }


    whereToGo = () =>{
       const Manpositions = [0,11,22,33,44,55,66,77,88]
       const Elpositions = [4,14,24,34,44,54,64,74,84]
       const end =  Manpositions[Math.floor(Math.random()*Manpositions.length)]
       const destinationFloorPosition =  Elpositions[Manpositions.indexOf(end)]
       return destinationFloorPosition // 갈 층 리턴
    }

    passengerX = '-25'

    //wip
    getIn = (which) => {  
        console.log('getIn')
        // console.log('which',which)
        switch(which){
            case 'car1Pos': this.passengerX = '-366'
            break;
            case 'car2Pos': this.passengerX = '-242'
            break;
            case 'car3Pos': this.passengerX = '-115'
            break;
            default: this.passengerX = '-25'
        }
        // console.log('passengerX',this.passengerX)
        setTimeout(()=>{  //이건 야매야...이렇게 말고...
            document.querySelector('img').style.left = this.passengerX + 'px'
        },2000)
    }

    getOut = () => {
        console.log('out')
        document.querySelector('img').style.left = '-25px'
    }
        
    //머리위에 Store.destFloor 를 표시해주고 싶다
    render() {
        return (
            <ElevatorConsumer>
                {({state, actions})=> (
                    <div className="passenger" >
                        <img alt="man" style={{bottom: Number(state.calledFrom-1)*11 + '%', left: this.passengerX+'px', /*border:'solid 3px green'*/}}  src={require('../elvMan.png')}/>
                    </div>
                )}
            </ElevatorConsumer>
        )
  }
}
