import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import split from 'lodash/split'
import trim from 'lodash/trim'
import get from 'lodash/get'
import map from 'lodash/map'
import find from 'lodash/find'
import filterFunc from 'lodash/filter'
import intersection from 'lodash/intersection'
import words from 'lodash/words'
import lowerCase from 'lodash/lowerCase'
import reverse from 'lodash/reverse'
import isEqual from 'lodash/isEqual'
import remove from 'lodash/remove'

import configs from './config'

import Feed from './components/feed'
import Nav from './components/nav'

const apiAddress = configs.find(config => (config.id === 'api'))

class App extends React.Component {
  state = {
    user: {
      username: null,
      isAdmin: false
    },
    feed: [],
    featured: null,
    filter: '',
    update: false,
    logIn: false,
    logOut: false,
    submitFilter: false,
    createPost: false,
    deletePost: false,
    featurePost: false
  }

  componentDidMount() {
    this.setState({ logIn: this.handleLogIn.bind(this) })
    this.setState({ logOut: this.handleLogOut.bind(this) })
    this.setState({ submitFilter: this.handleFilter.bind(this) })
    this.setState({ createPost: this.handleCreation.bind(this) })
    this.setState({ deletePost: this.handleDeletion.bind(this) })
    this.setState({ featurePost: this.handleFeatured.bind(this) })
    this.setState({ createComment: this.handleCommentCreation.bind(this) })
    this.setState({ deleteComment: this.handleCommentDeletion.bind(this) })
    this.getFeed()
  }

  componentDidUpdate(prevProps, prevState) {
    const { filter, featured, update } = this.state
    if(filter !== prevState.filter || !isEqual(featured, prevState.featured) || update) {
      this.getFeed()
    }
    this.renderNav()
  }

  getFeed = () => {
    const { filter } = this.state
    const filters = words(lowerCase(filter))
    fetch(`${apiAddress.value}/getPost`)
      .then((feed) => feed.json())
      .then((res) => {
        const data = res.data
        const featuredPost = find(data, { featured: true })
        const dataFiltered = filter ? filterFunc(data, (post) => {
            const textContent = get(post, 'textContent', '')
            const title = get(post, 'title', '')
            const createdBy = get(post, 'createdBy', '')
            const tags = [ ...get(post, 'tags', []), ...words(lowerCase(title)), ...words(lowerCase(textContent)), ...words(lowerCase(createdBy))]
            return intersection(tags, filters).length
        }) : data
        this.setState({ feed: reverse(filter ? dataFiltered : data), featured: featuredPost })
      })
      .catch(err => {
        console.log("Error Reading data " + err)
      })
    this.setState({ update: false })
  }

  handleLogIn(username, password) {
    if((password !== 'password' && password !== 'admin') || !username) return
    const setAdmin = (password === 'admin')
    this.setState({ user: { username: username, isAdmin: setAdmin } })
  }

  handleLogOut() {
    this.setState({ user: { username: null, isAdmin: false } })
  }

  handleFilter(filter) {
    this.setState({ filter, update: true })
  }

  handleUpdate(post, update) {
    axios.post(`${apiAddress.value}/updatePost`, {
      post,
      update
    })
    .then(() =>{
      this.setState({ update: true })
    })
  }

  handleCommentCreation(post, comment) {
    axios.post(`${apiAddress.value}/updatePost`, {
      post,
      update: { comments: [ comment, ...post.comments] }
    })
    .then(() => {
      this.setState({ update: true })
    })
  }

  handleCommentDeletion(post, comment) {
    const comments = get(post, 'comments', [])
    axios.post(`${apiAddress.value}/updatePost`, {
      post,
      update: { comments: remove(comments, (existing) => {
        return !isEqual(existing, comment)
      }) }
    })
    .then(() => {
      this.setState({ update: true })
    })
  }

  handleFeatured(post) {
    const { featured } = this.state
    axios.post(`${apiAddress.value}/updatePost`, {
      post,
      update: { featured: true }
    })
    .then(() => {
      if(featured) {
        axios.post(`${apiAddress.value}/updatePost`, {
          post: featured,
          update: { featured: false }
        })
      }
    })
    .then(() => {
      this.setState({ update: true })
    })
  }

  handleDeletion(post) {
    axios.delete(`${apiAddress.value}/deletePost`, {
      data: { post }
    })
    .then(() => {
      this.setState({ update: true })
    })
  }

  handleCreation(title, imageLink, textContent, tags) {
    const { user } = this.state
    const username = get(user, 'username')
    const createdBy = (username) ? username : 'Anonymous'
    const tagsSplit = map(split(tags, ','), trim)
    axios.post(`${apiAddress.value}/createPost`, {
      post: {
        createdBy,
        title,
        imageLink,
        textContent,
        tags: tagsSplit
      }
    })
    .then(() => {
      this.setState({ update: true })
    })
  }

  renderNav() {
    const { user, logIn, logOut, submitFilter, filter, createPost } = this.state
    ReactDOM.render(<Nav user={user} logIn={logIn} logOut={logOut} submitFilter={submitFilter} filter={filter} createPost={createPost} />, document.getElementById('nav'))
  }

  render() {
    const { feed, user, filter, featured, deletePost, featurePost, createComment, deleteComment } = this.state
    return (
      <center>
        <h1>News Feed</h1>
        <Feed feed={feed} user={user} filter={filter} featured={featured} deletePost={deletePost} createComment={createComment} deleteComment={deleteComment} featurePost={featurePost} />
      </center>
    )
  }
}

export default App
