
import React, { Component } from 'react'
import AuthInterface from '../../utils/AuthInterface'
import DeleteBtn from '../../components/DeleteBtn'
import { Input, FormBtn } from '../../components/Form'

class TeamList extends Component {

  playTeam(args) {
    console.log("Play team..." + args.target.id);
  }

  render() {
    const { users } = this.props
    const userMe = AuthInterface.getUser()

    return (
      <div>
        {
          users.length ? (
            <div style={{ overflow: 'none' }}>
              {
                users.map( user => {
                  if (user.id == userMe.id) return;
                  return (
                    <div key={ user.id }  className='row'>
                        <div className='text-left col-md-10 col-md-offset-1'
                              style={{ paddingTop: 2, paddingBottom: 2, marginTop: 2, marginBottom: 2, borderRadius: 10 }}>
                              <strong>{ user.username }</strong>
                              <FormBtn id={user.id}
                                onClick={this.playTeam.bind(this)}
                              >
                                Play Match!
                              </FormBtn>
                        </div>
                    </div>
                  )}
                )
              }
            </div>
          ) : (
            <h2 className='text-center alert alert-warning'>
              No Other Teams to Play
            </h2>
          )
        }
      </div>
    )
  }
}

export default TeamList
