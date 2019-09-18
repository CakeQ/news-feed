import React from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import './postpanel.scss'

class PostPanel extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    postAuthor: PropTypes.string,
    featured: PropTypes.bool,
    deletePost: PropTypes.func.isRequired,
    featurePost: PropTypes.func.isRequired
  }
  static defaultProps = {
    user: {
      username: null,
      isAdmin: false
    },
    postAuthor: 'Anonymous',
    featured: false
  }

  handleDelete = (event) => {
    if(event) event.preventDefault()
    const { deletePost } = this.props
    deletePost(this.props)
  }

  handleFeature = (event) => {
    if(event) event.preventDefault()
    const { featurePost } = this.props
    featurePost(this.props)
  }

  render() {
    const { user, postAuthor, featured } = this.props
    const username = get(user, 'username', null)
    const isAdmin = get(user, 'isAdmin', false)
    if(!username) return <div />
    return (
      <div className='post-panel'>
        {(isAdmin || username === postAuthor) ? <button className='button' type='submit' onClick={this.handleDelete} name='Delete'>Delete</button> : ''}
        {isAdmin ? <button className='button' type='submit' onClick={this.handleFeature} name='Feature'>{featured ? 'Un-Feature' : 'Feature'}</button> : ''}
      </div>
    )
  }
}

export default PostPanel