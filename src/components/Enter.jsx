import React, { Component } from 'react';
import moment from 'moment';
import Build from './Build';
import { getAstroInfo, gradientSwitchCase } from '../sky/astro';

export default class Enter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0,
      yCoor: 0,
      bg: ''
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.setBackground = this.setBackground.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);

    const today = moment().format("YYYY-MM-DD");
    getAstroInfo(today)
      .then(sunPhase => this.setBackground(sunPhase));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  setBackground(sunPhase) {
    const { bg, reverse } = gradientSwitchCase(sunPhase);
    this.setState({
      bg: ['buildBG', bg].join(' '),
      reverse,
      opacity: reverse ? 1 : 0,
    });
  }

  handleScroll(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const y = evt.target.body.scrollTop || evt.target.documentElement.scrollTop;
    //srcElement deprecated; target.documentElement for Firefox, target.body for Chrome

    const lowerBound = (window.innerHeight);
    const opacity = this.state.reverse ?
      1 - y/lowerBound : y/lowerBound

    this.setState({
      opacity,
      yCoor: y,
    })
  }

  render() {
    return (
      <div id="bgGradient" className={this.state.bg}>
        <Build
          handleScroll={this.handleScroll}
          opacity={this.state.opacity}
          yCoor={this.state.yCoor}
          reverse={this.state.reverse}
          bg={this.state.bg}
        />
      </div>
    );
  }
}
