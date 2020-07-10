import React, { Component } from "react";
import { connect } from "react-redux";
import {screenActions}  from "../../_store/actions/screenActions";
class Timeout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds - 1
    }));
    // console.log("seconds: ", this.state.seconds);
    if (this.state.seconds == 0) {
        clearInterval(this.interval);
        this.props.dispatch(
          screenActions.removePopup({ name: "Timeout" })
        );
    }
  }

  componentDidMount() {
    this.setState({
      seconds: this.props.timeLimit
    });
    this.interval = setInterval(() => this.tick(), 1000);
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>Seconds: {this.state.seconds}</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch
});
export default connect(null, mapDispatchToProps)(Timeout);
