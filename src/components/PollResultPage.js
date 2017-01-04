import React, { Component } from 'react';
import 'babel-polyfill';
import EventTimeBlock from './EventTimeBlock';
// import fetch from 'isomorphic-fetch';
import rd3 from 'rd3';

// const peopleCount = (userdata.available = true) . length
// const totalCount = usedata.length

const BarChart = rd3.BarChart;

const barData = [
  {
    name: 'Series A',
    values: [
      { x: 1, y: 91 },
      { x: 2, y: 80 },
      { x: 3, y: 75 },
      { x: 4, y: 69 },
      { x: 5, y: 61 },
      { x: 6, y: 55 },
      { x: 7, y: 50 },
      { x: 8, y: 44 },
      { x: 9, y: 42 },
      { x: 10, y: 39 },
      { x: 11, y: 35 },
      { x: 12, y: 24 },
    ]
  },
];

class PollTestChart extends Component {
  render() {
    return (
      <BarChart
        data={barData}
        width={500}
        height={200}
        fill={'#3182bd'}
        title="Bar Chart"
        yAxisLabel="Label"
        xAxisLabel="Value"
      />
    );
  }
}

class PollResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0, // count = (userdata.available = true) . length
      total: 10, // total = usedata.length
      bgColor: 'white',
    };
  }

  // Need to fix to fit db schema
  componentDidMount() {
    fetch('/api/result')
      .then(res => res.json())
      .then(json => {
        this.setState({
          pollreuslt: json,
        });
      });
  }

  handleCountChange = e => {
    this.setState({
      count: e.target.value,
    });
  }

  render() {
    const colorPcg = this.state.count / this.state.total;

// Math.round usage: To turn float into restricted float
    const redPcg = Math.round(255 * (((1 - colorPcg) * 10) / 10));
    const greenPcg = Math.round(255 * ((colorPcg * 10) / 10));

    let redResult = redPcg.toString(16);
    let greenResult = greenPcg.toString(16);

    if (redResult === '0') {
      redResult = '00';
    }
    if (greenResult === '0') {
      greenResult = '00';
    }
// TODO: filter: brightness(1~100%)

// To concatanate the color schema
    const colorResult = `#${redResult}${greenResult}00`;


// testing color code
/*
    console.log(redResult);
    console.log(greenResult);
    console.log(colorResult);
*/
    const btnstyle = {
      backgroundColor: colorResult,
    };


    return (
      <div className="pollResult">
        <h1>The result - without data flow</h1>
        <input type="text" value={this.state.count} onChange={this.handleCountChange} />

        <hr />

        <button style={btnstyle}>{this.state.count}</button>
        <button style={btnstyle}>{this.state.count}</button>
        <button style={btnstyle}>{this.state.count}</button>
        <button style={btnstyle}>{this.state.count}</button>

        <hr />
        <EventTimeBlock
          startDate="2017-01-03-08"
          endDate="2017-01-10-08"
          startHour={8}
          endHour={21}
        />
        <hr />
        <PollTestChart />
      </div>
    );
  }

}


export default PollResultPage;
