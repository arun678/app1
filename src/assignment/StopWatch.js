import React, { Component } from 'react'
import "./StopWatch.css";

export class StopWatch extends Component {
  state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    isTimerStart: false
  };
  /*
initialize
start -> call fn
call increase second
setInterval -> keep incrementing after every 1 sec
When reached 60, clearInterval -> call increase minute 

Call increase minute
When minute has increased, then call increase second;
When minute reaches 60, -> call increase hour

call increse hour
When hours has increased, then then call seconds increase
When hours reached 24 -> call reset
*/

  increaseSeconds = () => {
    this.secondsInterval = setInterval(() => {
      this.setState(
        (prevState) => ({
          isTimerStart: true,
          seconds: prevState.seconds + 1,
        }),
        () => {
          if (this.state.seconds >= 5) {
            clearInterval(this.secondsInterval);
            this.increaseMinutes();
          }
        }
      );
    }, 1000);
  };

  increaseMinutes = () => {
    this.setState(
      (prevState) => ({
        seconds: 0,
        minutes: prevState.minutes + 1,
      }),
      () => {
        if (this.state.minutes >= 5) {
          this.increaseHours();
        } else {
          this.increaseSeconds();
        }
      }
    );
  };

  increaseHours = () => {
    this.setState(
      (prevState) => ({
        minutes: 0,
        hours: prevState.hours + 1,
      }),
      () => {
        if (this.state.hours >= 5) {
          this.clearTimer();
        } else {
          this.increaseSeconds();
        }
      }
    );
  };

  clearTimer = () => {
    this.setState(
      {
        hours: 0,
        minutes: 0,
        seconds: 0,
        isTimerStart: false
      },
      () => {
        clearInterval(this.secondsInterval);
      }
    );
  };

  startCounter = () => {
    this.increaseSeconds();
  };

  stopCounter = () => {
    this.setState({
      isTimerStart:false
    }, () => {
      clearInterval(this.secondsInterval);
    })
    
  };

  render() {
    const { hours, minutes, seconds, isTimerStart } = this.state;
    return (
      <div className="digi-timer">
        <div className="digi-timer__container">
          <div className="digi-timer__inner-block">
            <div id="time" className="digi-timer__display">
              {`${hours.length > 1 ? hours : "0" + hours}:${
                minutes.length > 1 ? minutes : "0" + minutes
              }:${seconds.length > 1 ? seconds : "0" + seconds}`}
            </div>
            <div className="digi-timer__controls">
              <button className="digi-timer__button" onClick={this.startCounter} disabled={isTimerStart}>Start</button>
              <button className="digi-timer__button" onClick={this.stopCounter}>Stop</button>
              <button className="digi-timer__button" onClick={this.clearTimer}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StopWatch;

