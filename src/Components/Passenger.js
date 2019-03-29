import React, { Component } from 'react'
import { ElevatorConsumer } from '../Contexts/ElevatorStore';

export default class Passenger extends Component {

    constructor(){
        super()
        this.sayhi()
    }
    
    componentDidMount(){
        console.log('passenger mounted')
    }


    randomAppear = () => {
        const positions = [0,11,22,33,44,55,66,77,88]
        let beginPos = positions[Math.ceil(Math.random()*positions.length)]
        console.log('beginPos', beginPos)
        const beginFloor = Number(beginPos/11) + 1
        return beginFloor //시작층
    }

    sayhi = () => {
        console.log('hi')
    }

    whereToGo = () =>{
       const positions = [0,11,22,33,44,55,66,77,88]
       const end =  positions[Math.floor(Math.random()*positions.length)]
       return end // 갈 층 리턴
    }

       //같은층에 온 엘리베이터에 탑승, 목적지로 이동..
        //left -115px, -242px -366px   -25px initial
        //bottom 0% 부터 11%씩

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
        },3000)
    }

    getOut = () => {
        console.log('out')
        document.querySelector('img').style.left = '-25px'
    }
        
    saybye = () => {
        console.log('bye')
    }

    vanish = () =>{
        
    }

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
