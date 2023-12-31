import { useState } from 'react';
import BarSeries from "./Chart/barseries";
import BaselineSeries from "./Chart/baselineseries";
import CandlestickSeries from "./Chart/candlestickseries";

import "../style/chart.css";

const ChartComponent = (props) => {
  const setSelectedSeriesList = ["Bar", "Baseline", "Candlestick"];
  const [selectedSeries, setSelectedSeries] = useState("Candlestick");

  const handleSeriesChange = (index) => {
    setSelectedSeries(index);
  };

  return (
    <div className="chart-content">
      <h3 className="chart-title">Chart</h3>
      <div>
        <label className="chart-title">Select Chart: </label>
        <select
          onChange={(e) => handleSeriesChange(e.target.value)}
          value={selectedSeries}
        >
          {setSelectedSeriesList.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      {selectedSeries === "Bar" && <BarSeries {...props} />}
      {selectedSeries === "Baseline" && <BaselineSeries {...props} />}
      {selectedSeries === "Candlestick" && <CandlestickSeries {...props} />}
    </div>
  );
};

export default ChartComponent;
