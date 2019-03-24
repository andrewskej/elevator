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
    }

    actions = {

        buttonPress: (button) => {
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
            this.actions.findClosest(targetPos, direction)
        },

        findClosest : (targetPos, direction) => {
            const {car1Pos,car2Pos,car3Pos} = this.state
            console.log('target:', targetPos)
            console.log('up/down:', direction)
            const diff = [car1Pos,car2Pos,car3Pos].map(el => targetPos - el)
            const smallest = diff.reduce((prev,cur)=>{
                return prev > cur ? cur : prev 
            })
            const moveThis = Number(diff.indexOf(smallest))+1

            //up or down?, move how many floors?
            this.actions.moveOneUp('car'+moveThis+'Pos')
            
        },



        //현재 위치에 10% 더하기
        moveOneUp:(target) => {
            this.setState({
                [target]:this.state[target] + 10
            })
        },

        moveOneDown:(target)=>{
            this.setState({
                [target]:this.state[target] - 10
            })
        },

    }

    componentDidMount(){
        // setInterval(()=> {
        //     this.actions.moveOneUp('car1Pos')
        // },1000)
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

