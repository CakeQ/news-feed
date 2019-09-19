import React from 'react'
import PropTypes from 'prop-types'

import Login from './login'
import Filter from './filter'
import Editor from './editor'

class Nav extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    filter: PropTypes.string,
    logIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    submitFilter: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired
  }
  static defaultProps = {
    user: {
      username: null,
      isAdmin: false
    },
    filter: ''
  }
  state = {
    showEditor: false,
    closeEditor: false
  }

  componentDidMount() {
    this.setState({ closeEditor: this.togglePostCreate.bind(this) })
  }

  togglePostCreate = (event) => {
    if(event) event.preventDefault()
    const { showEditor } = this.state
    this.setState({ showEditor: !showEditor})
  }

  render() {
    const { user, logIn, logOut, submitFilter, filter, createPost } = this.props
    const { showEditor, closeEditor } = this.state
    return (
      <div>
        <ul>
          <Login user={user} logIn={logIn} logOut={logOut}/>
          <Filter submitFilter={submitFilter} currentFilter={filter}/>
          <button className='button' type='submit' onClick={this.togglePostCreate} name='Create Post'>Create Post</button>
        </ul>
        {showEditor ? <Editor createPost={createPost} closeEditor={closeEditor} /> : ''}
      </div>
    )
  }
}

export default Nav
