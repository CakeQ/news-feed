import React from 'react'
import PropTypes from 'prop-types'
import sanitize from 'mongo-sanitize'

import get from 'lodash/get'

import './post.scss'

class Editor extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    createPost: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired
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

  handlePost = (event) => {
    if(event) event.preventDefault()
    const { createPost, closeEditor } = this.props
    const title = get(this.refs, 'title.value', null)
    const imageLink = get(this.refs, 'image.value', null)
    const body = get(this.refs, 'body.value', null)
    const tags = get(this.refs, 'tags.value', '')
    if(!title || !body) return
    createPost(sanitize(title), sanitize(imageLink), sanitize(body), sanitize(tags))
    closeEditor()
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
      <div className='post'>
        <form onSubmit={this.handlePost} method='POST'>
          <center>
            <div>Title</div>
            <input className='input-post' type='text' name='title' ref='title' />
            <div>Image Link (optional)</div>
            <input className='input-post' type='url' name='image' ref='image' />
            <div>Body</div>
            <textarea className='input-post-body' type='text' name='body' ref='body' />
            <div>Tags (separated with commas)</div>
            <input className='input-post' type='text' name='tags' ref='tags' />
            <div>
              <button className='button' type='submit' name='submit'>Post</button>
            </div>
          </center>
        </form>
      </div>
    )
  }
}

export default Editor