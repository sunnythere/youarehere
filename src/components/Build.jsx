import React, { Component } from "react";
import { randomInt } from "../utils";
import meow from "../meow.json";
import "../style/main.scss";

export default class Build extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMsg: [],
      catSays: null,
      showContextMenu: false,
      innerHeight: 0,
      innerWidth: 0,
      build2position: "-2000px",
      theTime: "",
      timeOffSet: 0,
      bg: "",
      textClass: "",
      touches: [],
      touchLength: 0,
    };

    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.contextMenuClose = this.contextMenuClose.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    this.toggleMsg = (idx) => (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      const updatedShowMsg = Array.from(this.state.showMsg);
      updatedShowMsg[idx] = !this.state.showMsg[idx];
      console.log({ updatedShowMsg });
      this.setState({ showMsg: updatedShowMsg });
    };
  }

  handleContextMenu(evt) {
    evt.preventDefault();
    const num = meow.length;
    const randomIdx = randomInt(num);

    this.setState({
      showContextMenu: true,
      catSays: meow[randomIdx],
    });

    document.body.addEventListener("click", this.contextMenuClose, false);
    document.body.addEventListener("touchend", this.contextMenuClose, false);
  }

  contextMenuClose(evt) {
    evt.preventDefault();
    this.setState({
      showContextMenu: false,
    });
    document.body.removeEventListener("click", this.contextMenuClose);
    document.body.removeEventListener("touchend", this.contextMenuClose);
  }

  handleTouchStart(evt) {
    evt.preventDefault();
    let startTime = new Date();
    this.setState({ touchLength: startTime });
  }

  handleTouchEnd(evt) {
    let endTime = new Date();
    console.log("endTime:", endTime);
    let diff = Number(endTime) - Number(this.state.touchLength);
    if (diff >= 900) {
      this.handleContextMenu(evt);
    }
  }

  renderText() {
    return (
      <>
        {this.state.showMsg[0] && (
          <div id="hello">
            <span className="text white">hi. my name is Alice.</span>
          </div>
        )}
         {this.state.showMsg[1] && (
          <div id="links">
            <span className="text white">
              here are some places you can find me:
              <br />
              <i className="fa fa-github pad-right-05" aria-hidden="true" />
              <a href="http://www.github.com/sunnythere" target="_blank">
                github
              </a>
              <br />
              <i
                className="fa fa-linkedin-square pad-right-05"
                aria-hidden="true"
              />
              <a href="http://www.linkedin.com/in/yawenalice" target="_blank">
                linkedin
              </a>
              <br />
              <i className="fa fa-instagram pad-right-05" aria-hidden="true" />
              <a
                href="http://www.instagram.com/hyphenlowercase"
                target="_blank">
                instagram
              </a>
            </span>
          </div>
        )}
      </>
    )
  }

  render() {
    const opacityStyle = { opacity: this.props.opacity };

    if (!this.props.bg) return null;

    return (
      <>
        <div id="build0" />

        {/* cat */}
        <div
          id="calico-divsm"
          onContextMenu={this.handleContextMenu}
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
        />

        {this.state.showContextMenu && (
          <div className="catSay">
            <span className="text">{this.state.catSays}</span>
          </div>
        )}

        <div id="build0b" />
        <div id="build0c" />

        {/* lights */}
        <div id="build0b-light" style={opacityStyle} />
        <div id="click0" className="click" onClick={this.toggleMsg(0)} />
        <div id="click1" className="click" onClick={this.toggleMsg(1)} />

        <div id="build01" />
        <div id="build02" />

        {/* text */}
        {this.renderText()}

        <div id="infostar">
          <a onClick={this.toggleMsg(2)} className="nostylelink">
            *
          </a>
          {this.state.showMsg[2] && (
            <div id="infobubble">
              * The background gradient uses{" "}
              <a href="https://sunrise-sunset.org/api" className="darkgrey">
                the sunrise and sunset API
              </a>
              .
              <br />
              <span className="bottom">--> hyphenlowercase at gmail</span>
            </div>
          )}
        </div>
      </>
    );
  }
}
