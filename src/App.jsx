
import React, { useState, useEffect } from 'react';
import './css/Reset.css';
import './css/App.css';
import BarChart from './components/BarChart';
import MonthPicker from './components/MonthPicker';
import useAsyncFetch from './useAsyncFetch';
import {UserData} from './Data';
//import MonthDisplay from './Month';

// where to call month display
// want to call on initialization of the chart

function App() {
  // this will be default date, setDate is a function to change the value 
  // default date to april.2022 
  
  const [showMore, setShowMore] = useState(false);
  const [date, setDate] = useState({ month: 4, year: 2022 });
  const [waterData, setWaterData] = useState([]);
  //let storage = [];
  
  let options = {
    responsive: true,
    maintainAspectRatio: true,
    barThickness: 40,
    x: {
      stacked: true,
      grid: {
        display: false
      }
    },
    y: {
      stacked: true,
      grid: {
        display: false
      }
    }
  }
  
  function thenFun(result) {
    console.log("returned from backend", result);
    
    for (let i = 0; i < 7; i++) {
      waterData[i] = ((result[i].currentStorage) / 100000);
    }
    console.log("this water data", [...waterData])
  }
  function catchFun (error) {
    console.log(error);
  }
  
  let params = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(date) 
  }
  useAsyncFetch("query/getData", params, thenFun, catchFun, date);
  function yearChange(newYear) {
    let m = date.month;
    setDate({year: newYear, month: m });
  }
  
  function monthChange(newMonth){
    let y = date.year;
    setDate({month: newMonth, year: y});
    // useAsyncFetch("query/getData", params, thenFun, catchFun, date);
  };
  
  // dark green - current storage level 
  // light blue - total capacity 
  const [chartData, setChartData] = useState({
    labels: [
      'Shasta',
      'Oroville',
      'Trinity Lake',
      'New Melones',
      'San Luis',
      'Don Pedro',
      'Berryessa',
    ],
    datasets: [{
      label: "Current Storage Level",
      data: waterData,
      backgroundColor: [
        "rgb(66, 145, 152)"
      ]
    }, {
      label: "Total Capacity",
      data: UserData.map((data) => (data.capacity) /100000),
      backgroundColor: [
        "rgb(120, 199, 227)"
      ]
    }]
  });

  
  return (
    <main>
      <div className="header">
        <h3>Water Storage in California reservoirs</h3>
      </div>
      
      <div className="body">
        <div className="left">
          <p>
            California's reservoirs are part of a <a className="anchor" href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
          </p>
          <p>
            California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
          </p>
          <button className="button" onClick={() => setShowMore(!showMore)}>
          {showMore ? "see less" : "see more"}
          </button>
        </div>
        <div className="right">
          <img className="image" src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg"/>
          <p className="caption">
            Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought. 
          </p>
        </div>
      </div>
      {showMore ? 
     <div className="bottom" id='bottom'>
        <div className="chart">
          <BarChart chartData={chartData} options={options} />
        </div>
        <div className="description">
          <p>
            Here's a quick look at some of the data on reservoirs from the <a className="anchor" href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and electric utilities. Select a month and year to see storage levels in the eleven largest in-state reservoirs.
          </p>
          <h4>Change month: </h4>
          <div className="month-picker">
            <MonthPicker 
              date = {date}
              yearFun = {yearChange}
              monthFun = {monthChange}   
            />
          </div>
        </div>
      </div>
: null}
    </main>
  )
}
export default App;
// need an use state befofre main to visible or not 
// const [visible, setVisible] = useState(false);
// {showMore ? <GetMonth />: null}