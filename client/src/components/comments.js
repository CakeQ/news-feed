import React from 'react'
import PropTypes from 'prop-types'

import map from 'lodash/map'
import get from 'lodash/get'

import Comment from './comment'
import CommentEditor from './commenteditor'

import './postpanel.scss'

class Comments extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    comments: PropTypes.array
  }
  static defaultProps = {
    user: {
      username: null,
      isAdmin: false
    },
    comments: []
  }
  state = {
    expanded: false,
    deleteComment: false,
    createComment: false
  }

  componentDidMount() {
    this.setState({ deleteComment: this.handleDelete.bind(this) })
    this.setState({ createComment: this.handleCreate.bind(this) })
  }

  handleDelete(comment) {
    const { deleteComment } = this.props
    deleteComment(comment)
  }

  handleCreate(comment) {
    const { createComment, user } = this.props
    const username = get(user, 'username')
    const createdBy = username ? username : 'Anonymous'
    const newComment = {
      createdDate: new Date(),
      createdBy: createdBy,
      textContent: comment
    }
    console.log(newComment)
    createComment(newComment)
  }

  handleExpand = (event) => {
    if(event) event.preventDefault()
    const { expanded } = this.state
    this.setState({ expanded: !expanded })
  }

  render() {
    const { user, comments } = this.props
    const { expanded, deleteComment, createComment } = this.state
    return (
      <div className='comments'>
        {comments.length ?
          <div className='comment'>
            {comments.length} comments <button className='button' type='submit' onClick={this.handleExpand} name='Expand'>{expanded ? 'hide' : 'show'}</button>
            {expanded ? map(comments, (comment) => {
              const createdDate = get(comment, 'createdDate', null)
              const createdBy = get(comment, 'createdBy', 'Anonymous')
              const commentId = `comment-${createdBy}-${createdDate}`
              return <Comment user={user} comment={comment} deleteComment={deleteComment} key={commentId} /> })
              : ''}
          </div>
          : ''
        }
        <CommentEditor createComment={createComment} />
      </div>
    )
  }
}

export default Comments