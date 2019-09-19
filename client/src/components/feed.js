import React from 'react'
import PropTypes from 'prop-types'

import map from 'lodash/map'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'

import Post from './post'

import './feed.scss'

const navBar = document.querySelector('nav')
const navTop = navBar.offsetTop

class Feed extends React.Component {
  static propTypes = {
    feed: PropTypes.array,
    featured: PropTypes.object,
    user: PropTypes.object,
    filter: PropTypes.string
  }
  static defaultProps = {
    feed: [],
    featured: null,
    user: {
      username: null,
      isAdmin: false
    },
    filter: '',
    update: false
  }

  handleScroll() {
    if (window.scrollY > navTop) {
      navBar.classList.add('fixed-nav')
      document.body.style.paddingTop = navBar.offsetHeight+'px'
    } else {
      navBar.classList.remove('fixed-nav')
      document.body.style.paddingTop = 0
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  render() {
    const { feed, featured, user, deletePost, featurePost, createComment, deleteComment } = this.props
    return (
      <div>
        {featured ? <Post user={user} key='featured' data={featured} deletePost={deletePost} featurePost={featurePost} createComment={createComment} deleteComment={deleteComment} featured /> : '' }
        {map(feed, (post) => {
          if(isEqual(post, featured)) return ''
          const id = get(post, '_id')
          return(
            <Post user={user} key={id} data={post} deletePost={deletePost} featurePost={featurePost} createComment={createComment} deleteComment={deleteComment} />
          )
        })}
      </div>
    )
  }
}

export default Feed