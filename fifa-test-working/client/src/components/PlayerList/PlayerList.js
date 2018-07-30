
import React, { Component } from 'react'
import AuthInterface from '../../utils/AuthInterface'
import AddBtn from '../../components/AddBtn'

class PlayerList extends Component {

  addPlayer(args) {
    console.log("Adding player...:", args.target.id);
    const playerId = args.target.id
    this.props.addPlayer(playerId);
  }

  render() {
    const { players } = this.props
    const user = AuthInterface.getUser()

    return (
      <div>
        {
          players.length ? (
            <div style={{ left: '41%', overflowY: 'scroll' }}>
              {
                players.map( player => (
                  <div key={ player.id }  className='row'>
                      <div className='text-left col-md-7 col-md-offset-1'
                            style={{ paddingTop: 2, paddingBottom: 2, marginTop: 2, marginBottom: 2, borderRadius: 10 }}>
                            <strong>{ player.name }</strong>
                      </div>
                      <AddBtn id={player.id} onClick={this.addPlayer.bind(this)}/>
                  </div>
                ))
              }
            </div>
          ) : (
            <h2 className='text-center alert alert-warning'>
              No Players
            </h2>
          )
        }
      </div>
    )
  }
}

export default PlayerList
