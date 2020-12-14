import React, { Component, Fragment } from 'react';
import { ListGroup } from 'react-bootstrap';
import './showUsers.css';

class showUsers extends Component{
    constructor(props){
        super(props);

        this.state = {
            opponents : []
        }
    }

    componentDidMount(){
        this.props.socket.on('getOpponents', data =>{
            console.log('get opponent data',data);
            this.setState({
                opponents : data
            });
        })

        this.props.socket.on('newOpponentAdded', data =>{
            console.log('new opponent added data',data);
            this.setState({
                opponents : [...this.state.opponents, data]
            });
        })

        this.props.socket.on('opponentDisconnected', data =>{
            let flag = false;
            let i = 0;

            for(i=0; i < this.state.opponents.length; i++){
                if(this.state.opponents[i].id === data.id){
                    flag = true;
                    break;
                }
            }

            if(flag){
                let arr = [...this.state.opponents];
                arr.splice(i,1);
                this.setState({
                    opponents : arr
                });
            }
        })

        this.props.socket.on('excludePlayers', data =>{
            console.log(data);
            for(let i=0; i < data.length; i++){
                let flag = false;
                let j = 0;
                for(j = 0; j < this.state.opponents.length; j++){
                    if(this.state.opponents[j].id === data[i]){
                        flag = true;
                        break;
                    }
                }
                if(flag){
                    let arr = [...this.state.opponents];
                    arr.splice(i,1);
                    this.setState({
                        opponents : arr
                    });
                }
            }
        })

        this.props.socket.on('gameStarted', data =>{
            console.log(data);
            this.props.gameStartConfirmation(data)
        })

        this.props.socket.emit('getOpponents', {});
    }

    selectOpponent = (index) =>{
        this.props.socket.emit('selectOpponent', {
            "id" : this.state.opponents[index].id
        });
    }

    render(){
        return(
            <Fragment>
                <h2>Please select an opponent from the following list</h2>
                <ListGroup
                    onSelect = {this.selectOpponent}
                >
                    {
                        this.state.opponents.map((opponent,index) => (
                            <ListGroup.Item
                                action={true}
                                className='opponent-item'
                                key={index}
                                eventKey={index}
                            >
                                {opponent.mobile_number} | Played : {opponent.played}  | Won : {opponent.won}  | Draw : {opponent.draw}
                            </ListGroup.Item>
                        ) )
                    }
                </ListGroup>
            </Fragment>
        )
    }
}

export default showUsers;