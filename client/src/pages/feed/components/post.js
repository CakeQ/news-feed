import React from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'
import map from 'lodash/map'

import './post.scss'

class Post extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object
  }
  static defaultProps = {
    user: {
      username: null,
      isAdmin: false
    }
  }

  render() {
    const { data } = this.props
    const imageLink = get(data, 'imageLink', null)
    const textContent = get(data, 'textContent', '')
    const postTitle = get(data, 'title')
    const postAuthor = get(data, 'createdBy', 'Anonymouse')
    const postDate = get(data, 'createdDate')
    const postTags = get(data, 'tags', [])
    return (
      <div className='post'>
        {imageLink ? <img src={imageLink} alt={postTitle}/> : ''}
        <h1>{postTitle}</h1>
        <i>By {postAuthor}</i>
        <div>{new Date(postDate).toLocaleDateString()}</div>
        <div>{textContent}</div>
        {postTags.length ? <b>Tags:</b> : ''}
        <i>{map(postTags, (tag) => {
          return (
            <a> {tag}</a>
          )
        })}</i>
      </div>
    )
  }
}

export default Post