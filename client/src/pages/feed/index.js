import React from 'react'
import PropTypes from 'prop-types'
// import Post from './components/post'
import PostFeed from './components/feed'

class Feed extends React.Component {
  static propTypes = {
    user: PropTypes.object
  }
  static defaultProps = {
    user: {
      username: null,
      isAdmin: false
    }
  }
  render() {
    const { user } = this.props
    return (
      // <Post featured />
      <PostFeed user={user} />
    )
  }
}

export default Feed