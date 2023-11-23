import { createChart, ColorType } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

const Baseline = (props) => {
  const {
    recentTrade,
    colors: { backgroundColor = 'gray', textColor = 'white' } = {},
  } = props;

  const chartContainerRef = useRef();
  const chartRef = useRef(null);
  const baselineSeriesRef = useRef(null);

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

      // Add a single baseline series with a fixed color
      baselineSeriesRef.current = chartRef.current.addBaselineSeries({
        lineColor: '#008000',
        baselineTopColor: '#008000',
        baselineBottomColor: '#008000',
        lastValueVisible: false,
        priceLineVisible: false,
      });
    }

    // Sort recentTrade data by time
    recentTrade.sort((a, b) => a.tradeTime - b.tradeTime);

    // Update existing series or add new series if needed
    recentTrade.forEach((trade) => {
      const data = {
        time: trade.tradeTime,
        value: trade.price,
      };

      const existingData = baselineSeriesRef.current.data() || [];
      const existingDataIndex = existingData.findIndex((item) => item.time === data.time);

      if (existingDataIndex !== -1) {
        existingData[existingDataIndex] = data;
      } else {
        existingData.push(data);
      }

      baselineSeriesRef.current.setData(existingData);
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

export default Baseline;