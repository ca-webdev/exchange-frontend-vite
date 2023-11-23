import { createChart, ColorType } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

const HistogramSeries = (props) => {
  const {
    recentTrade,
    colors: { backgroundColor = 'gray', textColor = 'white' } = {},
  } = props;

  const chartContainerRef = useRef();
  const chartRef = useRef(null);
  const seriesListRef = useRef({});

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
    Object.values(seriesListRef.current).forEach((series) => chartRef.current.removeSeries(series));
    seriesListRef.current = {};

    // Update existing series or add new series if needed
    recentTrade.forEach((trade) => {
      const takerSide = trade.takerSide || 'default';
      const lineColor = takerSide === 'S' ? '#FF0000' : '#008000';

      if (!seriesListRef.current[takerSide]) {
        seriesListRef.current[takerSide] = chartRef.current.addHistogramSeries({
          lineColor,
          histogramTopColor: lineColor,
          histogramBottomColor: lineColor,
          lastValueVisible: false,
          priceLineVisible: false,
        });
      }

      const series = seriesListRef.current[takerSide];

      const data = {
        time: trade.tradeTime, // Assuming trade.tradeTime is a timestamp
        value: trade.price,
      };

      const existingData = series.data() || [];
      const existingDataIndex = existingData.findIndex((item) => item.time === data.time);

      if (existingDataIndex !== -1) {
        existingData[existingDataIndex] = data;
      } else {
        existingData.push(data);
      }

      series.setData(existingData);
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

export default HistogramSeries;