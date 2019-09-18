import React from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

class Post extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const { data } = this.props
    console.log('data', data)
    const imageLink = get(data, 'imageLink', null)
    const textContent = get(data, 'textContent', '')
    const postTitle = get(data, 'title')
    return (
      <div>
        <h1>{postTitle}</h1>
        <img src={imageLink} alt={postTitle}/>
        <div>{textContent}</div>
      </div>
    )
  }
}

export default Post