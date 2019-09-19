import React from 'react'
import PropTypes from 'prop-types'
import sanitize from 'mongo-sanitize'

import get from 'lodash/get'

import './post.scss'

class Filter extends React.Component {
  static propTypes = {
    currentFilter: PropTypes.string,
    submitFilter: PropTypes.func.isRequired
  }
  static defaultProps = {
    currentFilter: ''
  }

  handleSubmit = (event) => {
    if(event) event.preventDefault()
    const { submitFilter } = this.props
    const filter = sanitize(get(this.refs, 'filter.value', ''))
    submitFilter(filter)
  }

  render() {
    const { currentFilter } = this.props
    return (
      <li>
        <form onSubmit={this.handleSubmit} method='POST'>
          <input className='input' type='string' name='filter' ref='filter' defaultValue={currentFilter} />
          <button className='button' type='submit' name='Log In'>Search</button>
        </form>
      </li>
    )
  }
}

export default Filter