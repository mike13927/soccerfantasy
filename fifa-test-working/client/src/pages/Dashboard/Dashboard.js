
import React, { Component } from 'react'
import API from '../../utils/API'
import io from 'socket.io-client'
import AuthInterface from '../../utils/AuthInterface'
import { Link } from 'react-router-dom'
import { Col, Row, Container } from '../../components/Grid'
import { List, ListItem } from '../../components/List'
import { Input, FormBtn } from '../../components/Form'
import MessageList from '../../components/MessageList'

class Dashboard extends Component {
  state = {
      user: {}
  };
  
  
    render() {
        return (
          <Container fluid>
          <Row>
            <Col size="md-12">
            <h2>Select 2 Players</h2>
            <input
            placeholder="Cristiano Ronaldo"
            />
            <input
            placeholder="Lionel Messi"
            />
            <input
            placeholder="Neymar"
            />
            <input
            placeholder="Sergio Ramos"
            />
            <input
            placeholder="Thiago Silva"
            />
            <input
            placeholder="Gerard Pique"
            />
            <input
            placeholder="Casemiro"
            />
            <input
            placeholder="Paul Pogba"
            />
            <input
            placeholder="Luka Modric"
            />
            <input
            placeholder="Kevin de Bruyne"
            />
            <input
            placeholder="Manuel Neuer"
            />
            <input
            placeholder="David de Gea"
            />
            
            </Col>
          </Row>
          <Row>
            <Col size="md-12">
            <h2>My Players</h2>
            </Col>
          </Row>
          <Row>
            <Col size="md-6">
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
