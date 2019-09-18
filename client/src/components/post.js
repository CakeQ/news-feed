import React from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'
import map from 'lodash/map'

import PostPanel from './postpanel'

import './post.scss'

class Post extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object,
    featured: PropTypes.bool,
    deletePost: PropTypes.func.isRequired,
    featurePost: PropTypes.func.isRequired
  }
  static defaultProps = {
    user: {
      username: null,
      isAdmin: false
    },
    featured: false
  }
  state = {
    deletePost: false,
    featurePost: false
  }

  componentDidMount() {
    this.setState({ deletePost: this.handleDelete.bind(this) })
    this.setState({ featurePost: this.handleFeature.bind(this) })
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
    const { user, data, featured } = this.props
    const { deletePost, featurePost } = this.state
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
        {map(postTags, (tag) => {
          const searchUrl = `search=${tag}`
          return (
            <i key={postTitle + tag}> <a href={searchUrl}>{tag}</a></i>
          )
        })}
        <PostPanel user={user} postAuthor={postAuthor} deletePost={deletePost} featurePost={featurePost} featured={featured}/>
      </div>
    )
  }
}

export default Post