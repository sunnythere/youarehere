import React, { Component } from 'react'
import moment from 'moment'
import { getAstroInfo } from '../astro'


export default class Scrolly extends Component {

  constructor(props) {
    super(props)
    this.state = {
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
    evt.stopPropagation()
    let el = evt.target.body || evt.target.documentElement
    let y = el.scrollTop
console.log('scrolly y', y)
console.log('evt', evt.target.body.scrollTop)
let scrollDiv = document.getElementById('scrolly')
console.log(scrollDiv.scrollTop, scrollDiv.offsetHeight)
console.log('this', this.scrollTop)
    //srcElement deprecated; target.documentElement for Firefox, target.body for Chrome
    let lowerBound = (window.innerHeight) - 260
    let opacity

    if (y < lowerBound) {
      opacity = y/lowerBound
      if (y === 0) {
        evt.target.body.scrollTop = 1
        //scrollDiv
      }
    } else {
      opacity = 1
      if (y === window.innerHeight) {
        evt.target.body.scrollTop -= 1
      }
    }

    this.setState({
      opacity: opacity,
      yCoor: y
    })
  }


  render() {

    return (
      <div id="scrolly">

testing

      </div>

    )
  }
}
