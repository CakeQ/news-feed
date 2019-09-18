import React from 'react'
import ReactDOM from 'react-dom'

import Feed from './components/feed'
import Nav from './components/nav'

class App extends React.Component {
  state = {
    user: {
      username: null,
      isAdmin: false
    },
    filter: '',
    logIn: false,
    logOut: false,
    submitFilter: false
  }

  componentDidMount() {
    this.setState({ logIn: this.handleLogIn.bind(this) })
    this.setState({ logOut: this.handleLogOut.bind(this) })
    this.setState({ submitFilter: this.handleFilter.bind(this) })
  }

  componentDidUpdate() {
    this.renderNav()
  }

  handleLogIn(username, password) {
    if((password !== 'password' && password !== 'admin') || !username) return
    const setAdmin = (password === 'admin')
    this.setState({ user: { username: username, isAdmin: setAdmin } })
  }

  handleLogOut() {
    this.setState({ user: { username: null, isAdmin: false } })
  }

  handleFilter(filter) {
    this.setState({ filter: filter })
  }

  renderNav() {
    const { user, logIn, logOut, submitFilter, filter } = this.state
    ReactDOM.render(<Nav user={user} logIn={logIn} logOut={logOut} submitFilter={submitFilter} filter={filter} />, document.getElementById('nav'))
  }

  render() {
    const { user, filter } = this.state
    return (
      <center>
        <h1>News Feed</h1>
        <Feed user={user} filter={filter} />
      </center>
    )
  }
}

export default App
