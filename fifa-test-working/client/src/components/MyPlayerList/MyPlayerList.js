
import React, { Component } from 'react'
import AuthInterface from '../../utils/AuthInterface'
import DeleteBtn from '../../components/DeleteBtn'

class PlayerList extends Component {

  removePlayer(args) {
    console.log("Removing player...:", args.target.id);
    const playerId = args.target.id
    this.props.removePlayer(playerId);
  }

  render() {
    const { players } = this.props
    const user = AuthInterface.getUser()

    return (
      <div>
        {
          players.length ? (
            <div style={{ left: '41%', overflow: 'none' }}>
              {
                players.map( player => (
                  <div key={ player.id }  className='row'>
                      <div className='text-left col-md-7 col-md-offset-1'
                            style={{ paddingTop: 2, paddingBottom: 2, paddingRight: 20, marginTop: 2, marginBottom: 2, borderRadius: 10 }}>
                            <strong style={{ paddingRight: 20 }}>{ player.name }</strong>
                            <DeleteBtn id={player.id} onClick={this.removePlayer.bind(this)}/>
                      </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <h2 className='text-center alert alert-warning'>
              No players on my team.  Add some players.
            </h2>
          )
        }
      </div>
    )
  }
}

export default PlayerList
