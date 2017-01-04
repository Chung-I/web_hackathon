import React, { Component } from 'react';
import 'babel-polyfill';

// import fetch from 'isomorphic-fetch';

// const peopleCount = [1, 2, 3, 4];

// const totalCount = [3, 2, 5, 6];

class PollResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0, // count = (userdata.available = true) . length
      total: 10, // total = usedata.length
      bgColor: 'white',
    };
  }

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

      </div>
    );
  }

}


export default PollResultPage;
