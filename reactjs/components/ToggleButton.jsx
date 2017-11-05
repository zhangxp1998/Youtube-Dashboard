import React from "react"

class ToggleButton extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {toggle: true}
	}

	clickListener = (event) =>
	{
		if(this.state.toggle)
			this.props.onStart(event);
		else
			this.props.onStop(event);
		this.setState({toggle: !this.state.toggle});
	}

	render()
	{
		return <button type="button" onClick={this.clickListener}>{this.state.toggle ? this.props.onText : this.props.offText}</button>;
	}
}

export default ToggleButton;