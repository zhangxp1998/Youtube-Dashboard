import React from "react"
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";
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


const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 3600, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 3000, amt: 2100},
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

  render() {
    return (
      <div>
        <HeadText text="Analyze YouTube Comment"/>
        <br/>
        <NormalText text = "Import Your YouTube URL Here:"/>
        <form action="/analyze/" method="GET">
        <input style={{marginLeft: "50px"}} type='text' id='videoUrl'/>
        <input type="submit"/>
        </form>

        <br/><br/><br/>
        <AreaChart style={{marginLeft: "50px"}} width={600} height={400} data={data}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Area type='monotone' dataKey='uv' stackId="1" stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='pv' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
          <Area type='monotone' dataKey='amt' stackId="1" stroke='#ffc658' fill='#ffc658' />
        </AreaChart>

      </div>
    );
  }
}
