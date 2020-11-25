import React from "react";
import { Container } from 'react-bootstrap';
import socketIOClient from 'socket.io-client';

//components
import GetUserDetails from './components/getuserdetails/GetUserDetails';
import ShowUsers from './components/showusers/ShowUsers';
import GamePlay from './components/gameplay/GamePlay'

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      endpoint : 'http://localhost:8080',
      socket : null,
      isGameStarted : false,
      gameId : null,
      gameData : null
    }
  }

  componentDidMount() {
    const { endpoint } = this.state;

    //make a connection with the server
    const socket = socketIOClient(endpoint);

    socket.on('connected', (data) =>{
      this.setState({
        socket
      })
    })
  }

  render() {
    return (
      <Container>
        Welcome to the Game
      </Container>
    )
  }
}

export default App;
