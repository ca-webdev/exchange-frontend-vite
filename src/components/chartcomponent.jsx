// import { useState } from 'react';
// import AreaSeries from "./Chart/areaseries";
import AreaSeries from "./Chart/areaseries";
import BarSeries from "./Chart/barseries";

const ChartComponent = (props) => {
  // const [selectedSeriesIndex, setSelectedSeriesIndex] = useState(0);

  // const handleSeriesChange = (index) => {
  //   setSelectedSeriesIndex(index);
  // };

  return (
    <>
      {/* <div>
        <label>Select Series: </label>
        <select
          onChange={(e) => handleSeriesChange(e.target.value)}
          value={selectedSeriesIndex}
        >
          {seriesDataList.map((_, index) => (
            <option key={index} value={index}>
              Series {index + 1}
            </option>
          ))}
        </select>
      </div> */}
      <BarSeries {...props} />
    </>
  );
};

export default ChartComponent;
