import React from "react"
import Radium from "radium"

import { connect } from "react-redux"

import * as counterActions from "../actions/counterActions"
import Headline from "../components/Headline"

const styles = {
  button: {
    cursor: "pointer",
  },
  counter: {
    color: "blue",
    fontSize: "20px",
  }
}

@connect(state => ({
  counters: state.counters,
}))
@Radium
export default class SampleAppContainer extends React.Component {
  handleClick() {
    let {dispatch} = this.props;
    dispatch(counterActions.increaseCounter())
  }

  render() {
    let {counters} = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Headline>Sample App!</Headline>
            <div style={[styles.button]} onClick={() => this.handleClick()}>INCREASE</div>
            <code style={[styles.counter]}>{counters.clicks}</code>
            <p>{process.env.BASE_API_URL}</p>
            <p>Hello World~</p>
          </div>
        </div>
      </div>
    )
  }
}
