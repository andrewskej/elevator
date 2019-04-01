import React, { Component, createContext } from 'react'
import Passenger from '../Components/Passenger';
const Context = createContext();
const {Provider, Consumer:ElevatorConsumer} = Context;

class ElevatorProvider extends Component {
    state = {

        car1Pos:[4,14,24,34,44,54,64,74,84][Math.ceil(Math.random()*8)],
        car2Pos:[4,14,24,34,44,54,64,74,84][Math.ceil(Math.random()*8)],
        car3Pos:[4,14,24,34,44,54,64,74,84][Math.ceil(Math.random()*8)],

        calledFrom:'',
        selectedCar:'',
        destFloor:'',
        direction:'',

        passengerX:'-25',
        passengerY:''
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
            // console.log('calledFrom, direction: ', calledFrom, direction);
            const levels = [1,2,3,4,5,6,7,8,9]
            const positions = [4,14,24,34,44,54,64,74,84]
            const targetPos = positions[levels.indexOf(Number(calledFrom))]
            const selectedCar = this.actions.findClosest(targetPos, direction)
            const howManyFloors = (targetPos - this.state[selectedCar])/10

            this.actions.moveCar(selectedCar,direction,targetPos,howManyFloors)
        },

        findClosest : (targetPos, direction) => {
            const {car1Pos,car2Pos,car3Pos} = this.state
            const diff = [car1Pos,car2Pos,car3Pos].map(el => targetPos - el)
            const smallest = diff.reduce((prev,cur)=>{  
                return Math.abs(prev) > Math.abs(cur) ? cur : prev 
            })
            const moveThis = Number(diff.indexOf(smallest))+1
            let selected = `car${moveThis}Pos`
            return selected
        },


        moveCar: async (selectedCar,direction,targetPos,howManyFloors) => {
            this.setState({
                selectedCar
            })
            // 목적지의 좌표값이 더 크면 + 아니면 - 
            let dir =this.state[selectedCar] < targetPos ? 10 : (-10)
            for(let i=0; i<Math.abs(howManyFloors);i++){
                const move = setInterval(()=>{
                    this.setState({
                        [selectedCar]:(this.state[selectedCar] + dir)
                    },async ()=>{
                        // console.log('a',this.state[selectedCar])
                        // console.log('b',targetPos)
                        if(this.state[selectedCar] === targetPos){
                            console.log('arrived')
                            await this.actions.getIn(selectedCar) 
                            return;
                        };
                    })
                    clearInterval(move)
                },500)
            }


        },


        //passenger methods
        randomAppear : () => {
            const positions = [11,22,33,44,55,66,77,88]
            let beginPos = positions[Math.ceil(Math.random()*(positions.length-1))]
            console.log('beginPos', beginPos)
            const beginFloor = Number(beginPos/11) + 1
            this.setState({
                passengerY: beginPos,
            })
            return beginFloor //시작층
        },

        whereToGo : () =>{
            const Manpositions = [0,11,22,33,44,55,66,77,88]
            const Elpositions = [4,14,24,34,44,54,64,74,84]
            const end =  Manpositions[Math.floor(Math.random()*Manpositions.length)]
            const destinationFloorPosition =  Elpositions[Manpositions.indexOf(end)]
            return destinationFloorPosition // 갈 층 리턴
        },

        getIn : (which) => {  
            console.log('getIn')
            // console.log('which',which)
            let passengerX;
            switch(which){
                case 'car1Pos': passengerX = '-366'
                break;
                case 'car2Pos': passengerX = '-242'
                break;
                case 'car3Pos': passengerX = '-115'
                break;
                default: passengerX = '-25'
            }
            setTimeout(()=>{  
                this.setState({
                    passengerX
                })
            },1000)
        }





    }

    async componentDidMount (){
        // const man = new Passenger();
        const currentFloor = this.actions.randomAppear()
        //BALLGAME 참조해서 몇초마다 생성되게 바꾸기

        // 사람이 서있는 위치까지 엘베가 오고, 탑승까지..
        let direction = 'u' // needs condition with 'd'
        let button = `${currentFloor}-${direction}`
        await this.actions.buttonPress(button)


        //목적지
        const destPos = this.actions.whereToGo() 
        const destFloor = Math.floor(Number(destPos) / 11)
        this.setState({destFloor})
        console.log(`From level ${currentFloor} to level ${destFloor}`)
        let updown = currentFloor > destFloor ? 'd':'u' 
        let moveDistance = Math.floor(Math.abs(currentFloor - destFloor))
        // console.log('moveD', moveDistance)
        // console.log('this.state.passengerX', this.state.passengerX)
        
        //엘베 이동(타이밍이 안맞네....)
        // setTimeout(async ()=>{
        //     await this.actions.moveCar(selectedCar,updown,destPos,moveDistance)
        //     await this.setState({
        //         passengerY:updown=== 'u' 
        //             ? this.state.passengerY + (moveDistance*11) 
        //             : this.state.passengerY - (moveDistance*11)
        //     })
        // },1500)



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

