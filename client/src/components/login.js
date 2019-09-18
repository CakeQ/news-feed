import React from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import './post.scss'

class Login extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    logIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired
  }
  static defaultProps = {
    user: {
      username: null,
      isAdmin: false
    }
  }

   validateEmail(email) {
    const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    return emailValid
  }

  handleLogIn = (event) => {
    if(event) event.preventDefault()
    const { logIn } = this.props
    const username = get(this.refs, 'username.value', null)
    const password = get(this.refs, 'password.value', '')
    if(!this.validateEmail(username)) return
    logIn(username, password)
  }

  render() {
    const { user, logOut } = this.props
    const username = get(user, 'username', null)
    const isAdmin = get(user, 'isAdmin', false)
    if(username) return (
      <li>
        <div>Welcome, {isAdmin ? 'Admin ' : ''}{username}</div>
        <button className='button' type='submit' onClick={logOut} name='Log Out'>Log Out</button>
      </li>
    )
    else return (
      <li>
        <form onSubmit={this.handleLogIn} method='POST'>
          <input type='email' name='username' ref='username' />
          <input type='password' name='password' ref='password' />
          <button className='button' type='submit' name='Log In'>Log In</button>
        </form>
      </li>
    )
  }
}

export default Login