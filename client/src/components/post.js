import React from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'
import map from 'lodash/map'

import PostPanel from './postpanel'
import Comments from './comments'

import './post.scss'

class Post extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object,
    featured: PropTypes.bool
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
    featurePost: false,
    deleteComment: false,
    createComment: false
  }

  componentDidMount() {
    this.setState({ deletePost: this.handleDelete.bind(this) })
    this.setState({ featurePost: this.handleFeature.bind(this) })
    this.setState({ deleteComment: this.handleDeleteComment.bind(this) })
    this.setState({ createComment: this.handleCreateComment.bind(this) })
  }

  handleDelete() {
    const { deletePost, data } = this.props
    deletePost(data)
  }

  handleFeature() {
    const { featurePost, data } = this.props
    featurePost(data)
  }

  handleDeleteComment(comment) {
    const { deleteComment, data } = this.props
    deleteComment(data, comment)
  }

  handleCreateComment(comment) {
    const { createComment, data } = this.props
    createComment(data, comment)
  }

  render() {
    const { user, data, featured } = this.props
    const { createComment, deleteComment } = this.state
    const { deletePost, featurePost } = this.state
    const imageLink = get(data, 'imageLink', null)
    const textContent = get(data, 'textContent', '')
    const postTitle = get(data, 'title')
    const postAuthor = get(data, 'createdBy', 'Anonymous')
    const postDate = get(data, 'createdDate')
    const postTags = get(data, 'tags', [])
    const comments = get(data, 'comments', [])
    return (
      <div className='post'>
        {featured ? <h1>Featured Post</h1>: ''}
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
        <Comments user={user} comments={comments} createComment={createComment} deleteComment={deleteComment} />
        <PostPanel user={user} postAuthor={postAuthor} deletePost={deletePost} featurePost={featurePost} featured={featured}/>
      </div>
    )
  }
}

export default Post