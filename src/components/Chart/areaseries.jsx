import { createChart, ColorType } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

const AreaSeries = (props) => {
  const {
    recentTrade,
    colors: { backgroundColor = 'rgb(90, 90, 90, 0.1)', textColor = 'white' } = {},
  } = props;

  const chartContainerRef = useRef();
  const chartRef = useRef(null);
  const seriesListRef = useRef([]);

  useEffect(() => {
    const handleResize = () => {
      chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    if (!chartRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
          rightPriceScale: {
            scaleMargins: {
              top: 0.2,
              bottom: 0.2,
            },
          },
        },
        width: chartContainerRef.current.clientWidth,
        height: 300,
      });
      chartRef.current.timeScale().fitContent();
    }

    // Sort recentTrade data by time
    recentTrade.sort((a, b) => a.tradeTime - b.tradeTime);

    // Clear existing series before updating
    seriesListRef.current.forEach((series) => chartRef.current.removeSeries(series));
    seriesListRef.current = [];

    // Update existing series or add new series if needed
    recentTrade.forEach((series) => {
      const newSeries = chartRef.current.addAreaSeries({
        lineColor: '#2962FF',
        areaTopColor: '#2962FF',
        areaBottomColor: 'rgba(41, 98, 255, 0.28)',
        lastValueVisible: false,
        priceLineVisible: false,
      });

      const data = {
        time: series.tradeTime, // Assuming series.tradeTime is a timestamp
        value: series.price,
      };

      const existingData = newSeries.data() || [];
      const existingDataIndex = existingData.findIndex((item) => item.time === data.time);

      if (existingDataIndex !== -1) {
        existingData[existingDataIndex] = data;
      } else {
        existingData.push(data);
      }

      newSeries.setData(existingData);
      seriesListRef.current.push(newSeries);
    });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [recentTrade, backgroundColor, textColor]);

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default AreaSeries;