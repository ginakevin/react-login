import React, { useRef, useEffect } from "react";
import * as echarts from 'echarts';
import CommonDiv from '../chartCompoment/CommonDiv';

function BarEcharts() {
  const chartRef = useRef(null);

  useEffect(() => {
    // if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      // 使用 ECharts API 设置图表配置项和数据
      myChart.setOption({
        // 图表配置项
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      });
    // }
    
  }, []);

  return (
    <>
      <CommonDiv >
          <div ref={chartRef}style={{ width: "100%", height: "500px" }}></div> 
      </CommonDiv>
       
    </>
    
  );
}

export default BarEcharts;
