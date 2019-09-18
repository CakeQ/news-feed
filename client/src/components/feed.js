import React from 'react'
import PropTypes from 'prop-types'

import configs from '../config'

import map from 'lodash/map'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import filterFunc from 'lodash/filter'
import intersection from 'lodash/intersection'
import words from 'lodash/words'

import Post from './post'

import './feed.scss'

const apiAddress = configs.find(config => (config.id === 'api'))
const navBar = document.querySelector('nav')
const navTop = navBar.offsetTop

class Feed extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    filter: PropTypes.string
  }
  static defaultProps = {
    user: {
      username: null,
      isAdmin: false
    },
    filter: ''
  }
  state = {
    feed: [],
    featured: null,
    deletePost: false,
    featurePost: false
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
    this.getFeed()
    this.setState({ deletePost: this.handleDeletion.bind(this) })
    this.setState({ featurePost: this.handleFeatured.bind(this) })
    window.addEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(prevProps, prevState) {
    const { filter } = this.props
    const { featured } = this.state
    if(filter !== prevProps.filter || !isEqual(featured, prevState.featured)) {
      this.getFeed()
    }
  }

  handleDeletion(post) {
    this.setState({ featured: post })
  }

  handleFeatured(post) {
    this.setState({ featured: post })
  }

  getFeed = () => {
    const { filter } = this.props
    const filters = words(filter)
    fetch(`${apiAddress.value}/getPost`)
      .then((feed) => feed.json())
      .then((res) => {
        const data = res.data
        const dataFiltered = filter ? filterFunc(data, (post) => {
            const textContent = get(post, 'textContent', '')
            const title = get(post, 'title', '')
            const createdBy = get(post, 'createdBy', '')
            const tags = [ ...get(post, 'tags', []), ...words(title), ...words(textContent), ...words(createdBy)]
            return intersection(tags, filters).length
        }) : data
        this.setState({ feed: filter ? dataFiltered : data })
      })
      .catch(err => {
        console.log("Error Reading data " + err)
      })
  }

  render() {
    const { user } = this.props
    const { feed, featured, deletePost, featurePost } = this.state
    console.log('featured', featured)
    return (
      <div>
        {featured ? <Post user={user} key='featured' data={featured} deletePost={deletePost} featurePost={featurePost} featured /> : '' }
        {map(feed, (post) => {
          if(isEqual(post, featured)) return ''
          const id = get(post, '_id')
          return(
            <Post user={user} key={id} data={post} handleFeatured={this.handleFeatured} deletePost={deletePost} featurePost={featurePost} />
          )
        })}
      </div>
    )
  }
}

export default Feed