import React from 'react'

import get from 'lodash/get'
import sanitize from 'mongo-sanitize'

class CommentEditor extends React.Component {
  handlePost = (event) => {
    if(event) event.preventDefault()
    const { createComment } = this.props
    const comment = get(this.refs, 'body.value', null)
    if(!comment) return
    createComment(sanitize(comment))
  }

  render() {
    return (
      <form onSubmit={this.handlePost} method='POST'>
        <div><b>Leave a Comment</b></div>
        <textarea className='input' type='text' name='body' ref='body' />
        <div>
          <button className='button' type='submit' name='submit'>Post</button>
        </div>
      </form>
    )
  }
}

export default CommentEditor