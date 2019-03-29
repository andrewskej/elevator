import React, { Component, createContext } from 'react'
import Passenger from '../Components/Passenger';
const Context = createContext();
const {Provider, Consumer:ElevatorConsumer} = Context;

class ElevatorProvider extends Component {
    state = {
        car1Pos:4,
        car2Pos:14,
        car3Pos:24,

        calledFrom:'',
        selectedCar:'',
        direction:'',
        destination:'',
        getIn:'',

    }

    actions = {

        buttonPress: (button) => {
            console.log('button:',button)
            const [calledFrom, direction] = button.split('-')
            this.setState({
                calledFrom, direction
            }, () => this.actions.levelCalculator(calledFrom, direction))
        },

        levelCalculator : (calledFrom, direction) => {
            console.log('calledFrom, direction: ', calledFrom, direction);
            const levels = [1,2,3,4,5,6,7,8,9]
            const positions = [4,14,24,34,44,54,64,74,84]
            const targetPos = positions[levels.indexOf(Number(calledFrom))]
            const selectedCar = this.actions.findClosest(targetPos, direction)
            // console.log('seletedCar:',selectedCar)
            const howManyFloors = (targetPos - this.state[selectedCar])/10

            this.actions.moveCar(selectedCar,direction,targetPos,howManyFloors)
        },

        findClosest : (targetPos, direction) => {
            const {car1Pos,car2Pos,car3Pos} = this.state
            // console.log('target:', targetPos)
            // console.log('up/down:', direction)

            const diff = [car1Pos,car2Pos,car3Pos].map(el => targetPos - el)
            const smallest = diff.reduce((prev,cur)=>{  
                return Math.abs(prev) > Math.abs(cur) ? cur : prev 
            })
            // console.log('diff:', diff) 
            // console.log('smallest',smallest)
            const moveThis = Number(diff.indexOf(smallest))+1
            //up or down?, move how many floors?
            let selected = `car${moveThis}Pos`
            return selected
            
        },


        moveCar:(selectedCar,direction,targetPos,howManyFloors) => {
            // console.log(selectedCar, howManyFloors, direction, targetPos)
            // 목적지의 좌표값이 더 크면 + 아니면 - 
            this.setState({
                selectedCar
            })
            let dir =this.state[selectedCar] < targetPos ? 10 : (-10)
            // console.log(dir)
            for(let i=0; i<Math.abs(howManyFloors);i++){
                setTimeout(()=>{
                    this.setState({
                        [selectedCar]:this.state[selectedCar] + dir 
                    },
                        // ()=>console.log('moveresult:',this.state[selectedCar])
                        )
                },1500)
            }
        },

        passengerAction : () => {
         
        },

    }

    componentDidMount(){
        console.log('store mounted')
        const man = new Passenger();
        const currentFloor = man.randomAppear()
        //BALLGAME 참조해서 몇초마다 생성되게 바꾸기

        setTimeout(()=>{
            // const destPos = man.whereToGo()
            // const destFloor = Number(destPos) / 11
            // this.setState({destination:destPos})

            // 사람이 서있는 위치까지 엘베가 와야돼
            // console.log('currentFloor', currentFloor)
            let direction = 'u' // needs condition with 'd'
            let button = `${currentFloor}-${direction}`
            this.actions.buttonPress(button)


            //엘베를 골라서 탑승 wip....
            const {selectedCar} = this.state;  
            man.getIn(selectedCar) 
        },100)



        //elevator move
        // man.getOut()
        // man.saybye()
        //random으로 생성
        //floor 선택
        //탑승
        //이동
        //내리고 사라짐
        //반복

    }


    componentDidUpdate(){
        // console.log(this.state)
    }

    render() {
        const {state, actions} = this;
        const value = {state, actions}
            return (
                <Provider value={value}>
                    {this.props.children}
                </Provider>
            )
    }
}

export {ElevatorConsumer, ElevatorProvider}

