import React, { Component, createContext } from 'react'
const Context = createContext();
const {Provider, Consumer:ElevatorConsumer} = Context;

class ElevatorProvider extends Component {
    state = {
        car1Pos:4,
        car2Pos:14,
        car3Pos:24,

        calledFrom:'',
        direction:'',

        destination:'',
        passengerX:'-25',
        passengerY:'0',
    }

    actions = {


        randomPassenger:()=>{
            // const positions =[1,2,3,4,5,6,7,8,9]
            const positions = [0,11,22,33,44,55,66,77,88]
            const begin = positions[Math.floor(Math.random()*positions.length)]
            const end = positions.splice(begin)[0] //랜덤 다시 찾기..피곤해 오늘은..
            console.log('begin:',begin)
            console.log('end', end)
            this.setState({
                passengerY: begin,  //저중에서 랜덤으로 한층 뽑아서 시작
                destination: end //이것도 랜덤(곂치지 않게)
            })
        },

        //같은층에 온 엘리베이터에 탑승, 목적지로 이동..
        //left -115px, -242px -366px   -25px initial
        //bottom 0% 부터 11%씩

        getInElevator:()=>{

        },



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
            console.log('seletedCar:',selectedCar)
            const howManyFloors = (targetPos - this.state[selectedCar])/10

            this.actions.moveCar(selectedCar,direction,targetPos,howManyFloors)
        },

        findClosest : (targetPos, direction) => {
            const {car1Pos,car2Pos,car3Pos} = this.state
            console.log('target:', targetPos)
            console.log('up/down:', direction)

            const diff = [car1Pos,car2Pos,car3Pos].map(el => targetPos - el)
            const smallest = diff.reduce((prev,cur)=>{  
                return Math.abs(prev) > Math.abs(cur) ? cur : prev 
            })
            console.log('diff:', diff) 
            console.log('smallest',smallest)
            const moveThis = Number(diff.indexOf(smallest))+1
            //up or down?, move how many floors?
            let selected = `car${moveThis}Pos`
            return selected
            
        },


        moveCar:(selectedCar,direction,targetPos, howManyFloors) => {
            // console.log(selectedCar, howManyFloors, direction, targetPos)
            // 목적지의 좌표값이 더 크면 + 아니면 - 
            let dir =this.state[selectedCar] < targetPos ? 10 : (-10)
            // console.log(dir)
            for(let i=0; i<Math.abs(howManyFloors);i++){
                setTimeout(()=>{
                    this.setState({
                        [selectedCar]:this.state[selectedCar] + dir 
                    },()=>console.log('moveresult:',this.state[selectedCar]))
                },1500)
            }
        }

    }

    componentDidMount(){
        this.actions.randomPassenger()
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

