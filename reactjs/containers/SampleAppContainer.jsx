import React from "react"
import Radium from "radium"

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
          <div>
            <Headline>Sample App!</Headline>
            <p>{process.env.BASE_API_URL}</p>
            <p>Hello World~</p>
          </div>
        </div>
      </div>
    )
  }
}
