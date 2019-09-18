import React from 'react'

import Feed from './pages/feed/index'

class App extends React.Component {
  state = {
    user: {
      username: null,
      isAdmin: false
    },
  }

  logIn(username, password) {
    if(password !== 'password' || password !== 'admin' || !username) return
    const setAdmin = (password === 'admin')
    this.setState({ user: { username: username, isAdmin: setAdmin } })
  }

  logOut() {
    this.setState({ user: { username: null, isAdmin: false } })
  }

  render() {
    const { user } = this.state
    return (
      <center>
        <h1>News Feed</h1>
        <Feed user={user} />
      </center>
    )
  }
}

export default App
