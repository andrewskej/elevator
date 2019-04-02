import React, { Component, createContext } from 'react'
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

        levels:[1,2,3,4,5,6,7,8,9],
        manPositions:[0,11,22,33,44,55,66,77,88],
        elPositions:[4,14,24,34,44,54,64,74,84],

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
            const {levels, elPositions} = this.state
            const targetPos = elPositions[levels.indexOf(Number(calledFrom))]
            const selectedCar = this.actions.findClosest(targetPos, direction)
            console.log('t',targetPos, 's', this.state[selectedCar])
            const howManyFloors = (targetPos - this.state[selectedCar])/10
            this.actions.moveCar(selectedCar,targetPos,howManyFloors)
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


        moveCar: async (selectedCar,targetPos, howManyFloors) => {
            this.setState({
                selectedCar
            })

            let updown = howManyFloors > 0 ? 'u' : 'd' 
            const moveFloor = Math.abs(howManyFloors)
            let elMove = moveFloor * 10
            for(let i=0; i<Math.abs(howManyFloors);i++){
                const move = setInterval(()=>{
                    if(this.state[selectedCar] === targetPos){
                        clearInterval(move)
                        console.log('arrived')
                        this.actions.getIn(selectedCar) 
                        return;
                    };
                    this.setState({
                        [selectedCar]:updown==='u'? this.state[selectedCar] + elMove/moveFloor
                                                  : this.state[selectedCar] - elMove/moveFloor
                    })
                },500)
                return;
            }


        },


        //passenger methods
        randomAppear : () => {
            const {manPositions} = this.state;
            let beginPos = manPositions[Math.ceil(Math.random()*(manPositions.length-1))]
            const beginFloor = Number(beginPos/11) + 1
            console.log('beginFloor', beginFloor)
            this.setState({
                passengerY: beginPos
            })
            return beginFloor //시작층
        },

        whereToGo : () =>{
            const {manPositions,elPositions} = this.state;
            const end = manPositions[Math.floor(Math.random()*manPositions.length)]
            const destinationFloorPosition = elPositions[manPositions.indexOf(end)]
            return destinationFloorPosition // 갈 층 리턴
        },

        getIn : (selectedCar) => {  
            console.log('getIn')
            // console.log('selectedCar',selectedCar)
            let passengerX;
            switch(selectedCar){
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

    componentDidUpdate(){
        // console.log(this.state)
    }

    async componentDidMount (){
        const currentFloor = this.actions.randomAppear()

        // 사람이 서있는 위치까지 엘베가 오고, 탑승까지..
        let direction = 'u' // needs condition with 'd'
        let button = `${currentFloor}-${direction}`
        await this.actions.buttonPress(button)


        //목적지 정하기
        const destPos = this.actions.whereToGo() 
        const destFloor = Math.floor(Number(destPos) / 11)
        this.setState({destFloor})
        console.log(`From level ${currentFloor} to level ${destFloor}`)
        let updown = currentFloor > destFloor ? 'd':'u' 
        let moveFloor = Math.floor(Math.abs(currentFloor - destFloor))
        const manMove = moveFloor * 11
        const elveMove = moveFloor * 10

        //엘베 이동
        const checkIn = setInterval(()=>{
            if(this.state.passengerX !== '-25'){
                console.log(`moving ${updown}`)
                const {selectedCar} = this.state;
                clearInterval(checkIn)
                for(let i=0; i<moveFloor; i++){
                    const {elPositions} = this.state;
                    const destPos = elPositions[this.state.destFloor]
                    const movemove = setInterval(()=>{
                        if(this.state[selectedCar] === destPos) {
                            clearInterval(movemove)
                            //getout here
                        }
                        this.setState({
                            passengerY:updown === 'u'? this.state.passengerY + manMove/moveFloor : this.state.passengerY - manMove/moveFloor ,  
                            [selectedCar]:updown === 'u'? this.state[selectedCar] + elveMove/moveFloor  : this.state[selectedCar] - elveMove/moveFloor
                        })                
                    },500)
                    return;
                }
            }

        },100)

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

