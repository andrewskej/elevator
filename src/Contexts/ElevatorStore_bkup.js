import React, { Component, createContext } from 'react'
const Context = createContext();
const {Provider, Consumer:ElevatorConsumer} = Context;


class ElevatorProvider extends Component {
    state = {
        positions:{
            man:[0,11,22,33,44,55,66,77,88],
            el:[4,14,24,34,44,54,64,74,84],
            floors:[1,2,3,4,5,6,7,8,9]
            }
        ,

        passenger:{
            beginFloor:'',
            endFloor:'',
        },

        passengerX:'-25',
        passengerY:'',

        car1Pos:'',
        car2Pos:'',
        car3Pos:'',
        
        calledFrom:'',
        selectedCar:'',
        direction:'',
        endFloor:'',

        elPositions:[4,14,24,34,44,54,64,74,84],
        levels:[1,2,3,4,5,6,7,8,9],
        manPositions:[0,11,22,33,44,55,66,77,88],

    }

    
    //엘베가 한층 올라와서 서야할때만 사라짐...!?
    //CSS, 코드 리팩토링까지

    actions = {

        positionConverter : (originalPos, from, to) => {
            const posFrom = this.state.positions[from]
            const posTo = this.state.positions[to]
            const result = posTo[posFrom.indexOf(originalPos)]
            return result
        },

        //elevator methods
        elevatorAppear:() => {
            const {elPositions} = this.state;
            const elevatorPos = [...elPositions]
            const [car1Pos] = elevatorPos.splice(Math.floor(Math.random()*elevatorPos.length),1)
            const [car2Pos] = elevatorPos.splice(Math.floor(Math.random()*elevatorPos.length),1)
            const [car3Pos] = elevatorPos.splice(Math.floor(Math.random()*elevatorPos.length),1)
            this.setState({
                car1Pos, car2Pos, car3Pos
            },()=>console.log(this.state))
        },

        buttonPress: (button) => {
            const [calledFrom, direction] = button.split('-')
            this.setState({
                calledFrom, direction
            }, () => this.actions.levelCalculator(calledFrom, direction))
        },

        levelCalculator : (calledPos, direction) => {
            const targetPos = this.actions.positionConverter(Number(calledPos), 'floors', 'el')
            const selectedCar = this.actions.findClosest(targetPos, direction)
            const howManyFloors = (targetPos - this.state[selectedCar])/10
            this.actions.moveCar(selectedCar,targetPos,howManyFloors)
        },

        findClosest : (targetPos) => {
            //this method is the key logic for this entire elevator app.!!
            const {car1Pos,car2Pos,car3Pos} = this.state
            const diff = [car1Pos,car2Pos,car3Pos].map(el => targetPos - el)
            const smallest = diff.reduce((prev,cur)=>{  
                return Math.abs(prev) > Math.abs(cur) ? cur : prev 
            })
            const moveThis = Number(diff.indexOf(smallest))+1
            let selected = `car${moveThis}Pos`
            return selected
        },

        moveCar: async (selectedCar, targetPos, howManyFloors) => {
            this.setState({ selectedCar })
            let updown = howManyFloors > 0 ? 'u' : 'd' 
            const moveFloor = Math.abs(howManyFloors)
            let elMove = moveFloor * 10
            console.log('elMove: ', elMove);

            if(elMove===0){
                this.actions.getIn(selectedCar);
                return;
            }else{
                for(let i=0; i<moveFloor; i++){
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
            }
        },


        //passenger methods
        passengerAppear : () => {
           const {manPositions} = this.state;
           const [beginPos] =  manPositions.splice(Math.floor(Math.random()*manPositions.length),1)
           const beginFloor = this.actions.positionConverter(beginPos, 'man', 'floors')
           const [endPos] = manPositions.splice(Math.floor(Math.random()*manPositions.length),1)
           const endFloor = this.actions.positionConverter(endPos, 'man', 'floors')

            this.setState({
                passengerY: beginPos,
                endFloor
            })
            console.log(`From level ${beginFloor} to level ${endFloor}`)
    
            const passengerInfo = {beginFloor, endFloor}
            return passengerInfo;
        },

        getIn : (selectedCar) => {  
            let passengerX;
            switch(selectedCar){
                case 'car1Pos': passengerX = '-370'
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
        },

        getOut:()=>{ 
           setTimeout(()=> {
               this.setState({
                passengerX: this.state.passengerX - 40
               })
           }, 200)
        },

        vanish: () => {
            setTimeout(()=> {
                
            }, 200)
        }
    }



    async componentDidMount (){
        this.actions.elevatorAppear()

        //랜덤 층에서 시작점, 목적지 가지고 생성
        const {beginFloor,endFloor} = this.actions.passengerAppear()

        //버튼 지정, 엘베호출
        const updown = beginFloor > endFloor ? 'd':'u' 
        const moveFloor = Math.abs(beginFloor - endFloor)
        const button = `${beginFloor}-${updown}`
        await this.actions.buttonPress(button)

        const manMove = moveFloor * 11
        const elveMove = moveFloor * 10

        //엘베 이동
        const checkIn = setInterval(()=>{
            if(this.state.passengerX !== '-25'){
                console.log(`moving ${updown==='u' ?  'up': 'down'}`)
                const {selectedCar} = this.state;
                clearInterval(checkIn)

                const {elPositions, endFloor} = this.state;
                const destPos = elPositions[endFloor-1]  //엘베좌표[목적지 층]  이게 맞나?
                for(let i=0; i<moveFloor; i++){
                    const movemove = setInterval(()=>{
                        this.setState({
                            passengerY:updown === 'u'? this.state.passengerY + manMove/moveFloor : this.state.passengerY - manMove/moveFloor ,  
                            [selectedCar]:updown === 'u'? this.state[selectedCar] + elveMove/moveFloor  : this.state[selectedCar] - elveMove/moveFloor
                        })   

                        if(this.state[selectedCar] === destPos) {
                            clearInterval(movemove)
                            console.log(`we're here.`)
                            this.actions.getOut()
                            setTimeout(()=>{ this.actions.vanish() },300)
                        }
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

