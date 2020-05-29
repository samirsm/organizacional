import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from '../src/org-chart/chart.component';
import Sun from '../src/sunburst/sunburst.component';

function App () {
  return (
    <div className="App">
      {/* <Chart /> */}
      <Sun />
    </div>
  );
}

export default App;
