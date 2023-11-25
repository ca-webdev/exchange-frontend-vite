import { createChart, ColorType } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

const BarSeries = (props) => {
  const { ohlc, colors: { backgroundColor = 'rgb(90, 90, 90, 0.1)', textColor = 'white' } = {} } = props;

  const chartContainerRef = useRef();

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        width: chartContainerRef.current.clientWidth,
        height: 300,
      });

      const series = chart.addBarSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderDownColor: '#ef5350',
        borderUpColor: '#26a69a',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      // Assuming ohlc is an array containing both historical and latest data
      const sortedData = ohlc
        .map(item => ({
          time: item.time, // Assuming time is a timestamp
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }))
        .sort((a, b) => a.time - b.time);

      // Update existing data or add new data
      const newData = [];
      sortedData.forEach(item => {
        const existingIndex = newData.findIndex(data => data.time === item.time);
        if (existingIndex !== -1) {
          // If timestamp exists, override the old data
          newData[existingIndex] = item;
        } else {
          // Otherwise, add new data
          newData.push(item);
        }
      });

      series.setData(newData);

      return () => {
        chart.remove();
      };
    }
  }, [ohlc, backgroundColor, textColor]);

  return <div style={{ width: '100%', height: '300px' }} ref={chartContainerRef} />;
};

export default BarSeries;