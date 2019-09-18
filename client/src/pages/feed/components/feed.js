import React from 'react'
// import axios from 'axios'

import configs from '../../../config'

import map from 'lodash/map'
// import get from 'lodash/get'

import Post from './post'

const apiAddress = configs.find(config => (config.id === 'api'))

class PostFeed extends React.Component {
  state = {
    feed: []
  }

  componentDidMount() {
    this.getFeed()
    // if (!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getFeed, 1000);
    //   this.setState({ intervalIsSet: interval });
    // }
  }

  componentWillUnmount() {
    // if (this.state.intervalIsSet) {
    //   clearInterval(this.state.intervalIsSet);
    //   this.setState({ intervalIsSet: null });
    // }
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
    console.log('feed', feed)
    return (
      <div>
        {map(feed, (post) => {
          return(
            <Post data={post}/>
          )
        })}
      </div>
    )
  }
}

export default PostFeed