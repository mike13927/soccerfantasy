
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
import TeamList from '../../components/TeamList'

class Dashboard extends Component {
  state = {
      user: {},
      users: [],
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
    console.log("************ Updating state...");
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
    console.log("************ Getting users...");
    API.getUsers().then( res => {
      console.log(res);
      this.setState({ users: res.data.users })
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
              <Col size="md-12">
                <h2>Select Players</h2>
                <PlayerList players={this.state.players} addPlayer={this.addPlayer.bind(this)}/>
              </Col>
            </Row>
          <Row>
            <Col size="md-12">
            <h2>My Players</h2>
            <MyPlayerList players={this.state.myPlayers} removePlayer={this.removePlayer.bind(this)}/>
            </Col>
          </Row>
          <Row>
            <Col size="md-6">
              <h2>Play Teams</h2>
              <TeamList users={this.state.users}/>
            </Col>
          </Row>
        </Container>
        );
    }
}

export default Dashboard;
