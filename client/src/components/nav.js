import React from 'react'
import PropTypes from 'prop-types'

import Login from './login'
import Filter from './filter'

class Nav extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    filter: PropTypes.string,
    logIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    submitFilter: PropTypes.func.isRequired
  }
  static defaultProps = {
    user: {
      username: null,
      isAdmin: false
    },
    filter: ''
  }

  render() {
    const { user, logIn, logOut, submitFilter, filter } = this.props
    return (
      <ul>
        <Login user={user} logIn={logIn} logOut={logOut}/>
        <Filter submitFilter={submitFilter} currentFilter={filter}/>
        {/* <Create user={user}/> */}
        <li>Create Post</li>
      </ul>
    )
  }
}

export default Nav
