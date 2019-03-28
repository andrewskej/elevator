import React, { Component } from 'react'
import { ElevatorConsumer } from '../Contexts/ElevatorStore';

export default class Passenger extends Component {
    state ={
        passengerX:'-25',
        passengerY:'',
    }


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

    getIn = () => {
        console.log('getIn')
    }

    getOut = () => {
        console.log('out')
    }
        
    saybye = () => {
        console.log('bye')
    }

    render() {
        const {passengerX, destination} = this.state;
        return (
            <ElevatorConsumer>
                {({state, actions})=> (
                    <div className="passenger" >
                        <img alt="man" style={{bottom: Number(state.calledFrom-1)*11 + '%', left:passengerX+'px'}}  src={require('../elvMan.png')}/>
                    </div>
                )}
            </ElevatorConsumer>
        )
  }
}
