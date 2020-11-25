import React, {Component, Fragment} from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import './gameplay.css'

class GamePlay extends Component{

    constructor(props){
        super(props);

        this.state = {
            gameData : null
        }
    }

    componentDidMount(){
        console.log(this.props);

        this.setState({
            gameData : this.props.gameData,
            gameId : this.props.gameId,
            gameBetweenInSeconds : 15
        })

        this.props.socket.on('selectCellResponse', (data) =>{
            this.setState({
                gameData : data
            })
        })

        this.props.socket.on('gameInterval', (data) =>{
            this.setState({
                gameBetweenInSeconds : data
            })
        })

        this.props.socket.on('nextGameData', (data) =>{
            this.setState({
                gameId : data.game_id,
                gameData : data.game_data,
                gameBetweenInSeconds : 15
            })
        })

        this.props.socket.on('opponentLeft', data => {
            this.props.opponentLeft();
        });
    }

    selectCell = (i, j) => {
        this.props.socket.emit('selectCell', {gameId : this.state.gameId, i : i, j : j})
    }

    generateCellDOM = () => {
        console.log(this.state.gameData);

        let table = []

        for(let i=0; i < 3; i++){
            let children = [];
            for(let j = 0; j < 3; j++){
                let showWinnerCell = false;
                
            }
        }
    }

    render(){
        return(
            <Row>
                <Col>
                    GamePlay!!
                </Col>
            </Row>
        )
    }

}

export default GamePlay