import React from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import './postpanel.scss'

class Comment extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    comment: PropTypes.object
  }
  static defaultProps = {
    user: {
      username: null,
      isAdmin: false
    },
    comment: {
      createdBy: 'Anonymous',
      textContent: ''
    }
  }

  handleDelete = (event) => {
    if(event) event.preventDefault()
    const { deleteComment, comment } = this.props
    deleteComment(comment)
  }

  render() {
    const { user, comment } = this.props
    const username = get(user, 'username', null)
    const isAdmin = get(user, 'isAdmin', false)
    const createdDate = get(comment, 'createdDate', null)
    const createdBy = get(comment, 'createdBy', 'Anonymous')
    const textContent = get(comment, 'textContent', '')
    return (
      <div className='comment'>
        <b>{createdDate ? <i>{new Date(createdDate).toLocaleDateString()} | </i> : ''}{createdBy}</b>: {textContent}
        {(isAdmin || username === createdBy) ? <button className='button' type='submit' onClick={this.handleDelete} name='Delete'>Delete</button> : ''}
      </div>
    )
  }
}

export default Comment