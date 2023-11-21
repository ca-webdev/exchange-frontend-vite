import { useState } from 'react';
import AreaSeries from "./Chart/areaseries";
import BarSeries from "./Chart/barseries";
import BaselineSeries from "./Chart/baselineseries";
import CandlestickSeries from "./Chart/candlestickseries";
import HistogramSeries from "./Chart/histogramseries";

const ChartComponent = (props) => {
  const setSelectedSeriesList = ["Area", "Bar", "Baseline", "Candlestick", "Histogram"];
  const [selectedSeries, setSelectedSeries] = useState("Area");

  const handleSeriesChange = (index) => {
    setSelectedSeries(index);
  };

  return (
    <>
      <div>
        <label>Select Series: </label>
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
      {selectedSeries === "Area" && <AreaSeries {...props} />}
      {selectedSeries === "Bar" && <BarSeries {...props} />}
      {selectedSeries === "Baseline" && <BaselineSeries {...props} />}
      {selectedSeries === "Candlestick" && <CandlestickSeries {...props} />}
      {selectedSeries === "Histogram" && <HistogramSeries {...props} />}
    </>
  );
};

export default ChartComponent;
