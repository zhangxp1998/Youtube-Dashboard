import React from "react"
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";
import {RadarChart, Radar, Legend, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from "recharts";
import Headline from "../components/Headline"


const placeholderUrl = 'https://www.youtube.com/watch?v=NWdc7PyZNLA';
const $ = require("jquery");
const moment = require('moment');

const colors = [
  {stroke: '#8884d8', fill: '#8884d8'},
  {stroke: '#82ca9d', fill: '#82ca9d'},
  {stroke: '#FFFF66', fill: '#FFFF66'},
  {stroke: '#CCFFFF', fill: '#CCFFFF'},
  {stroke: '#FFCCFF', fill: '#FFCCFF'},
  {stroke: '#FF9933', fill: '#FF9933'}
];

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
    this.state = {
        nextPageToken:"", emotions:[], data: [], data_sample:[],
        data_sum: [], data_display: [], videoUrl: placeholderUrl};
  }

  handleData = (result) =>
  {
    // console.log(moment(result['timestamp']).fromNow());
    // console.log(result);
    result.data.stats['page'] = moment(result['timestamp']).fromNow(true);
    var e_temp = this.state.emotions.concat(result.data.emotions.filter(x => this.state.emotions.indexOf(x)<0))
    var data_s = this.state.data_sum;
    // console.log(data_s)
    var data_dis = []
    for (var i = 0; i < e_temp.length; i++){
      var x = e_temp[i]
      if (typeof(data_s[x]) === 'undefined' && typeof(result.data.stats[x]) === 'undefined'){
        data_s[x] = 0;
      } else if (typeof(data_s[x]) === 'undefined' && typeof(result.data.stats[x]) !== 'undefined') {
        data_s[x] = result.data.stats[x];
      } else if (typeof(data_s[x]) !== 'undefined' && typeof(result.data.stats[x]) !== 'undefined'){
        data_s[x] += result.data.stats[x];
      }
      data_dis.push({"emotion": x, "rate":data_s[x]});
    }

    const data = this.state.data.concat(result.data.stats);
    var data_sample = data;
    if(data_sample.length > 16)
    {
        const step = data_sample.length >> 4;
        data_sample = data_sample.filter((x, i) => i % step == 0);
    }
    this.setState({
      nextPageToken: result.nextPageToken,
      emotions: e_temp,
      data: this.state.data.concat(result.data.stats),
      data_sum: data_s,
      data_sample: data_sample,
      data_display: data_dis
    });
    this.fetchData();
  }

  fetchData = () => {
    var regex = new RegExp("youtube.com\/.*=(.*)");
    const videoId = regex.exec(this.state.videoUrl)[1];
    var params = {method:'get', data: {videoId: videoId}, url: '/analyze/', success: result => this.handleData(result)};
    if(this.state.nextPageToken !== "")
      params.data['nextPageToken'] = this.state.nextPageToken;

    $.ajax(params);
  }

  handleSubmit = (event) => {
    this.fetchData();
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
        <input style={{marginLeft: "50px"}} type='text' name="videoUrl" id='videoUrl' onChange={this.handleType} value={placeholderUrl}/>
        <input type="submit" onClick={this.handleSubmit}/>
        </form>

        <br/><br/><br/>
        <AreaChart width={600} height={400} data={this.state.data_sample}
              margin={{top: 10, right: 30, left: 0, bottom: 0}} >
          <XAxis dataKey="page"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          {this.state.emotions.map((obj, index) =>
            <Area key={index} type='monotone' dataKey={obj} stackId='1' stroke={colors[index%colors.length].stroke} fill={colors[index%colors.length].fill}/>)}
        </AreaChart>

        <RadarChart outerRadius={90} width={400} height={400} data={this.state.data_display}>
          <PolarGrid />
          <PolarAngleAxis dataKey="emotion" />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Radar name="Sum" dataKey="rate" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </div>
    );
  }
}
