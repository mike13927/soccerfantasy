
import React, { Component } from 'react'
import API from '../../utils/API'
import io from 'socket.io-client'
import AuthInterface from '../../utils/AuthInterface'
import { Link } from 'react-router-dom'
import { Col, Row, Container } from '../../components/Grid'
import { List, ListItem } from '../../components/List'
import { Input, FormBtn } from '../../components/Form'
import MessageList from '../../components/MessageList'
import CreatePlayer from '../../pages/CreatePlayer'
import PlayerList from '../../components/PlayerList'
import MyPlayerList from '../../components/MyPlayerList'

class Dashboard extends Component {
  state = {
      user: {},
      players: [],
      myPlayers: [],
      team: {}
  };

  componentDidMount() {
    this.updatePlayers()
  }

  addPlayer(playerId) {
    const user = AuthInterface.getUser()
    API.addPlayerToTeam(user.id, playerId).then(res => {
        console.log("Added player to team");
        this.updatePlayers()
    })
  }

  removePlayer(playerId) {
    const user = AuthInterface.getUser()
    API.removePlayerFromTeam(user.id, playerId).then(res => {
        console.log("Removing player from team");
        this.updatePlayers()
    })
  }

  updatePlayers() {
    const user = AuthInterface.getUser()
    console.log(user);
    // Find or create the teams
    API.getMyTeam(user.id).then (res => {
      const team = res.data;
      console.log("Team: ", res);
      if (!team) {
        console.log("Creating team...");
        API.createMyTeam({uid: user.id, title: user.username}).then(res => {
            console.log("Created team");
            this.setState({ team: res.data })
            API.getMyPlayers(user.id).then( res => {
              this.setState({ myPlayers: res.data })
            })
            .catch(console.error)
        })
      }
      else {
        this.setState({ team: res.data })
        API.getMyPlayers(user.id).then( res => {
          console.log("My players: ", res.data)
          this.setState({ myPlayers: res.data })
        })
        .catch(console.error)
      }
    })
    API.getPlayers().then( res => {
      this.setState({ players: res.data })
    })
    .catch(console.error)

  }

    render() {
        return (
          <Container fluid>
            <Row>
              <CreatePlayer updatePlayers={this.updatePlayers.bind(this)}/>
            </Row>
            <Row>
              <h2>Select Players</h2>
              <PlayerList players={this.state.players} addPlayer={this.addPlayer.bind(this)}/>
            </Row>
          <Row>
            <Col size="md-12">
            <h2>My Players</h2>
            <MyPlayerList players={this.state.myPlayers} removePlayer={this.removePlayer.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col size="md-6">
            <h2>Select Match Team</h2>
            
            <FormBtn
              // disabled={!(this.state.players && this.state.title)}
              onClick={this.handleFormSubmit}
            >
              Play Match!
            </FormBtn>
            </Col>
          </Row>
        </Container>
        );
    }
}

export default Dashboard;
