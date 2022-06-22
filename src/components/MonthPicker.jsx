import React, {useState} from 'react';
import MonthYearPicker from 'react-month-year-picker';

import '../css/MonthPicker.css';

function MonthPicker(props) {
  let date = props.date;
  
  const [visible, updateVisible] = useState(false);
  
  function showFun () {
    updateVisible(true);
  }
  
  function pickedYear (year) {
    updateVisible(false);
    props.yearFun(year);
  }
  
  function pickedMonth (month) {
    updateVisible(false);
    props.monthFun(month);
  }

  if (visible) {
    return (
      <div id="monthDiv">
        <MonthYearPicker
          caption=""
          selectedMonth={date.month}
          selectedYear={date.year}
          minYear={2000}
          maxYear={2022}
          onChangeYear = {pickedYear}
          onChangeMonth = {pickedMonth}
        />
      </div> 
    );
  } else {
    return (
      <button className="btn" onClick={showFun}>{date.month+"/"+date.year}</button>
    )
  }
}

export default MonthPicker;
