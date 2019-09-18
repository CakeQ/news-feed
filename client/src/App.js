import React from 'react'

import logo from './logo.svg'
import Feed from './pages/feed/index'

class App extends React.Component {  
  render() {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <Feed />
      </div>
    )
  }
}

export default App
