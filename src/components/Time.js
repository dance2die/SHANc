import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { getLocaleDateString } from '../util/Format'

class Time extends React.Component {
  constructor(props) {
    super(props)
    const { date } = this.props
    const relativeTime = moment(date).fromNow()
    const absoluteTime = `[${getLocaleDateString(date)}]`

    this.state = {
      relativeTime,
      absoluteTime,
      time: relativeTime,
    }
  }

  handleMouseOver = () => this.setState({ time: this.state.absoluteTime })
  handleMouseOut = () => this.setState({ time: this.state.relativeTime })

  render() {
    const { time } = this.state
    return (
      <span onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        {time}
      </span>
    )
  }
}

export default Time
