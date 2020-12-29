import React, { Component } from 'react';
import moment from 'moment';
import Build from './Build';
import { getAstroInfo } from '../astro';


export default class Enter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sunPhase: null,
      opacity: 0,
      yCoor: 0,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);

    const today = moment().format("YYYY-MM-DD");
    getAstroInfo(today)
      .then((sunPhase) => this.setState({ sunPhase: sunPhase }));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    let y = evt.target.body.scrollTop || evt.target.documentElement.scrollTop;
console.log({ y})
    //srcElement deprecated; target.documentElement for Firefox, target.body for Chrome
    let lowerBound = (window.innerHeight);
    let opacity;
console.log('lower than lowerbound', y < lowerBound)
    // if (y < lowerBound) {
      opacity = y/lowerBound;
    //   if (y === 0) {
    //     evt.target.body.scrollTop = 1;
    //   }
    // } else {
    //   opacity = 1
    //   if (y === window.innerHeight) {
    //     evt.target.body.scrollTop -= 1;
    //   }
    // }

    this.setState({
      opacity: opacity,
      yCoor: y,
    })
  }

  render() {
    return (
      <div id="container">
        <Build
          sunPhase={this.state.sunPhase}
          handleScroll={this.handleScroll}
          opacity={this.state.opacity}
          yCoor={this.state.yCoor}
        />
      </div>
    );
  }
}
