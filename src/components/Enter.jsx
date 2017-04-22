import React, { Component } from 'react'
import moment from 'moment'
import Build from './Build'
import { getAstroInfo } from '../astro'


export default class Enter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sunPhase: 'sunrise',
      opacity: 0,
      yCoor: 0
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);

    let today = moment().format("YYYY-MM-DD")
    getAstroInfo(today)
    .then((sunPhase) => this.setState({ sunPhase: sunPhase }))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(evt) {
    evt.preventDefault()
    let y = evt.target.body.scrollTop || evt.target.documentElement.scrollTop
    //srcElement deprecated; target.documentElement for Firefox, target.body for Chrome

    let lowerBound = (window.innerHeight) - 260
    let opacity
    if (y < lowerBound) opacity = y/lowerBound
    else opacity = 1

    this.setState({
      opacity: opacity,
      yCoor: y
    })
  }

  render() {

    return (
      <div>
{
          <Build
            sunPhase={this.state.sunPhase}
            opacity={this.state.opacity}
            yCoor={this.state.yCoor} />

          //this.props.children
          }

      </div>

    )
  }
}
