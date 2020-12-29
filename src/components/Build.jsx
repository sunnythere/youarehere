import React, { Component } from 'react'
import { randomInt } from '../random'
import meow from '../meow.json';
import "../style/main.scss";

export default class Build extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showMsg0: false,
      showMsg1: false,
      showInfo: false,
      buildMove: false,
      catSays: null,
      showContextMenu: false,
      innerHeight: 0,
      innerWidth: 0,
      build2position: '-2000px',
      theTime: '',
      timeOffSet: 0,
      bg: '',
      textClass: '',
      touches: [],
      touchLength: 0
    }

    this.handleContextMenu = this.handleContextMenu.bind(this)
    this.contextMenuClose = this.contextMenuClose.bind(this)
    this.checkViewport = this.checkViewport.bind(this)
    this.setBackground = this.setBackground.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)

    this.toggleMsg = (msg) => (evt) => {
      evt.preventDefault()
      evt.stopPropagation()
      this.setState({ [msg]: !this.state[msg] })
    }
  }

  componentDidMount() {
    this.setBackground(this.props.sunPhase)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sunPhase !== this.props.sunPhase) {
      this.setBackground(this.props.sunPhase)
    }
  }

  checkViewport() {
    let position = (-(window.innerHeight * 0.5)  - (window.pageYOffset * 0.5)) + "" + "px"
    //this.setState({ build2position: position })
    this.setState({
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth
    })
  }

  handleContextMenu(evt) {
    evt.preventDefault()
    const num = meow.length;
    const randomIdx = randomInt(num);

    this.setState({
      showContextMenu: true,
      catSays: meow[randomIdx],
    });

    document.body.addEventListener('click', this.contextMenuClose, false)
    document.body.addEventListener('touchend', this.contextMenuClose, false)
  }

  contextMenuClose(evt) {
    evt.preventDefault()
    this.setState({
      showContextMenu: false
    })
    document.body.removeEventListener('click', this.contextMenuClose)
    document.body.removeEventListener('touchend', this.contextMenuClose)
  }

  setBackground(sunPhase) {
    let bground = 'buildBG'
    let textClass = 'text'
    switch (sunPhase) {
      case 'astronomical_twilight_begin':
        bground += ' yellowBlue'
        break;
      case 'nautical_twilight_begin':
        bground += ' yellowBlue'
        break;
      case 'civil_twilight_begin':
        bground += ' yellowPink'
        break;
      case 'sunrise':
        bground += ' blueYellow'
        break;
      case 'sunset':
        bground += ' pinkYellow'
        break;
      case 'civil_twilight_end':
        bground += ' darkBlue'
        textClass += ' white'
        break;
      case 'nautical_twilight_end':
        bground += ' darkBlue'
        textClass += ' white'
        break;
      case 'astronomical_twilight_end':
        bground += ' darkBlueRev'
        textClass += ' white'
        break;
      default:
        bground += ' blueYellow'
        break;
    }
    this.setState({
      bg: bground,
      textClass: textClass
    });
  }

  handleTouchStart(evt) {
    evt.preventDefault()
    let startTime = new Date()
    this.setState({ touchLength: startTime})
  }

  handleTouchEnd(evt) {
    let endTime = new Date()
    console.log('endTime:' , endTime)
    let diff = Number(endTime) - Number(this.state.touchLength)
    if (diff >= 900) {
      this.handleContextMenu(evt)
    }
  }

  render() {

    const style = {
      // build2: {
      //   bottom: this.state.build2position
      // }
    }

    if (!this.props.sunPhase) return null;

    return (
      <div id="bgGradient" className={this.state.bg}>

        <div id="click0" onClick={this.toggleMsg('showMsg0')} />
        <div id="click1" onClick={this.toggleMsg('showMsg1')} />

        <div id="build0" />
        <div id="build0b-light" style={{ opacity: this.props.opacity }} className={this.buildMove} />
        <div id="build0b" className={this.buildMove} />
        <div id="build0c" />
        <div id="build01" />
        <div id="build02" />

        {
        this.state.showMsg0 &&
        <div id="hello" style={{ opacity: this.props.opacity }}>

          <span className={this.state.textClass}>hi. my name is Alice.
          </span>

        </div>
        }

        <div id="calico-divsm" onContextMenu={this.handleContextMenu} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} />

        {
        this.state.showContextMenu &&
        <div className="catSay"><span className="text">{this.state.catSays}</span>
        </div>
        }

{
//          <div id="build2img" style={style.build2} />

//          <div id="build2aimg" />
}

          { this.state.showMsg1 &&
          <div id="links" style={{ opacity: this.props.opacity }}>
            <span className={this.state.textClass}>
                here are some places you can find me:<br />
                <i className="fa fa-github pad-right-05" aria-hidden="true" /> 
                <a href="http://www.github.com/sunnythere" target="_blank">github</a><br />
                <i className="fa fa-linkedin-square pad-right-05" aria-hidden="true" /> 
                <a href="http://www.linkedin.com/in/yawenalice" target="_blank">linkedin</a><br/>
                 <i className="fa fa-instagram pad-right-05" aria-hidden="true" /> 
                 <a href="http://www.instagram.com/hyphenlowercase" target="_blank">instagram</a>
            </span>
          </div>
          }


          <div id="infostar">
            <a onClick={this.toggleMsg('showInfo')} className="nostylelink">*</a>
              { this.state.showInfo &&
              <div id="infobubble">
                 * The cityscape cutouts were created from pages of a 2010 edition (the Work issue) of one of my favorite periodicals, <a href="https://www.good.is/" className="darkgrey">Good Magazine</a>.
                 <br />
                 * The background gradient uses <a href="https://sunrise-sunset.org/api" className="darkgrey">the sunrise and sunset API</a>.
                 <br />
                 <span className="bottom">--> hyphenlowercase at gmail</span>
              </div>
              }
          </div>

      </div>

    )
  }
}
