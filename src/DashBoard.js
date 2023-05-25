import React, { Component,useState,useEffect } from 'react';
import {useMediaQuery, Grid } from '@mui/material';
import BarChart from './chartCompoment/BarChart';
import LineChart from './chartCompoment/LineChart';
import PieChart from './chartCompoment/PieChart';
import PolarAreaChart from './chartCompoment/PolarAreaChart';
import BarEcharts from './ecChartsComponent/BarEcharts'



function DashBoard(){
    const isMobile = useMediaQuery('(max-width:600px)');
    const getSessionObj = sessionStorage.getItem("sessionAut");
    const auth = JSON.parse(getSessionObj);
    const [chartData,setChartData]=useState([]);


    useEffect(() => {
        const callTableData = async () => {
          
          try {
            const payload = {
              "token": auth.token,
              "name": auth.username
            };
      
            const response = await fetch('http://demo1.tsmc-ai.com:3009/products/total/all', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
            });
      
            const jsonData = await response.json();
            setChartData(jsonData);
            console.log(jsonData);
          } catch (error) {
            // console.error('获取数据时出错：', error);
          }
        }
        callTableData();
    }, []);

    return (
        <div style={{
           marginTop:40,
        }}>
            {/* <Grid container direction="column" spacing={2} justifyContent="center" alignItems="center" > */}
            <Grid container direction={isMobile ? 'column' : 'row'} spacing={2} >    
                <Grid item xs={12} sm={6} >
                    <BarChart  id='barchart1' chartData={chartData}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LineChart id='linechart1' chartData={chartData}/>
                </Grid>
                <Grid item xs={12} sm={6}  >
                    <PieChart  id='pieChart1' chartData={chartData}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <PolarAreaChart id='polarAreaChart1' chartData={chartData}/>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <BarEcharts id='barEcCharts1'/>
                </Grid> */}
            </Grid>
        </div>
    );

}

export default DashBoard;
