import React from "react"
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";
import Headline from "../components/Headline"

const cookie = require('react-cookie');
var $ = require("jquery");


const colors = [
  {stroke: '#8884d8', fill: '#8884d8'}, 
  {stroke: '#82ca9d', fill: '#82ca9d'},
  {stroke: '#FFFF66', fill: '#FFFF66'},
  {stroke: '#CCFFFF', fill: '#CCFFFF'},
  {stroke: '#FFCCFF', fill: '#FFCCFF'},
  {stroke: '#FF9933', fill: '#FF9933'}
];

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;
  
  return toPercent(ratio, 2);
};

const toPercent = (decimal, fixed = 0) => {
  return `${(decimal * 100).toFixed(fixed)}%`;
};
const renderTooltipContent = (o) => {
  const { payload, label } = o;
  const total = payload.reduce((result, entry) => (result + entry.value), 0);
  
  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
        {
          payload.map((entry, index) => (
            <li key={`item-${index}`} style={{color: entry.color}}>
              {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

class HeadText extends React.Component {
  render() {
    return (
      <div style={{textAlign:'center' , color:'Tomato', fontSize: '50px',
        fontFamily: '"Times New Roman", Times, serif'}}>
        <em>{this.props.text}</em>
        </div>
      )
  }
}

class NormalText extends React.Component {
  render() {
    return (
      <div style={{marginLeft: '50px' , color:'Black', fontSize: '20px',
        fontFamily: '"Times New Roman", Times, serif'}}>
        <em>{this.props.text}</em>
        </div>
      )
  }
}

export default class SampleAppContainer extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {nextPageToken:"", emotions:[], data: [], videoUrl: ""};
  }

  handleData = (result) =>
  {
    console.log(result);
    result.data.stats['page'] = this.pages++;
    console.log(this.state.emotions);
    this.setState({
      nextPageToken: result.nextPageToken, 
      emotions: this.state.emotions.concat(result.data.emotions.filter(x => this.state.emotions.indexOf(x)<0)), 
      data: this.state.data.concat(result.data.stats)
    });
  }

  handleSubmit = (event) => {
    var regex = new RegExp("youtube.com\/.*=(.*)");
    const videoId = regex.exec("https://www.youtube.com/watch?v=d6c6uIyieoo")[1];
    console.log(videoId);
    var params = {method:'get', data: {videoId: videoId}, url: '/analyze/', success: this.handleData};
    if(this.state.nextPageToken !== "")
      params.data['nextPageToken'] = this.state.nextPageToken;

    params.csrfmiddlewaretoken = cookie.load('csrftoken');
    $.ajax(params);
    event.preventDefault();
  }

  handleType = (event) => {
    this.setState({videoUrl: event.target.value});
  }

  
  pages = 0;
  render() {
    return (
      <div>
        <HeadText text="Analyze YouTube Comment"/>
        <br/>
        <NormalText text = "Import Your YouTube URL Here:"/>
        <form>
        <input style={{marginLeft: "50px"}} type='text' name="videoUrl" id='videoUrl' onChange={this.handleType} value='https://www.youtube.com/watch?v=NWdc7PyZNLA'/>
        <input type="submit" onClick={this.handleSubmit}/>
        </form>

        <br/><br/><br/>
      <AreaChart width={600} height={400} data={this.state.data} stackOffset="expand"
            margin={{top: 10, right: 30, left: 0, bottom: 0}} >
        <XAxis dataKey="page"/>
        <YAxis tickFormatter={toPercent}/>
        <CartesianGrid strokeDasharray="3 3"/>
        {this.state.emotions.map((obj, index) => 
          <Area key={index} type='monotone' dataKey={obj} stackId='1' stroke={colors[index%colors.length].stroke} fill={colors[index%colors.length].fill}/>)}
      </AreaChart>
      </div>
    );
  }
}
