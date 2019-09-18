import React from 'react'
import PropTypes from 'prop-types'
// import axios from 'axios'

import configs from '../../../config'

import map from 'lodash/map'
import get from 'lodash/get'
// import debounce from 'lodash/debounce'

import Post from './post'

import './feed.scss'

const apiAddress = configs.find(config => (config.id === 'api'))

class PostFeed extends React.Component {
  static propTypes = {
    user: PropTypes.object
  }
  static defaultProps = {
    user: {
      username: null,
      isAdmin: false
    }
  }
  state = {
    feed: []
  }

  // window.onscroll = debounce(() => {

  // })

  componentDidMount() {
    this.getFeed()
  }

  getFeed = () => {
    fetch(`${apiAddress.value}/getPost`)
      .then((feed) => feed.json())
      .then((res) => this.setState({ feed: res.data }))
      .catch(err => {
        console.log("Error Reading data " + err)
      })
  }

  render() {
    const { feed } = this.state
    // Add scrollstate here and cap feed based on scrollstate
    return (
      <div>
        {map(feed, (post) => {
          const id = get(post, '_id')
          return(
            <Post key={id} data={post}/>
          )
        })}
      </div>
    )
  }
}

export default PostFeed