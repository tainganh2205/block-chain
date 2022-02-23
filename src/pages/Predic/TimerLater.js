import React from 'react'

class TimerLater extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: parseInt(props.startTimeInSeconds, 10) || 0
    }
  }

  // eslint-disable-next-line react/sort-comp
  tick() {
    this.setState(state => ({
      seconds: state.seconds - 1 > 300 ? state.seconds - 1 : 600
    }))
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  formatTime(secs) {
    if (secs <= 0) {
      return '05:00'
    }

    const minutes = Math.floor(secs / 60) % 60
    const seconds = secs % 60

    const m = minutes < 10 ? `0${minutes}` : minutes
    const s = seconds < 10 ? `0${seconds}` : seconds

    return `${m}:${s}`
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    return `~${this.formatTime(this.state.seconds)}`
  }
}

export default TimerLater