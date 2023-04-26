import React from 'react';
import { useState,useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import  rows from '../StorageForTempt';
import CommonDiv from './CommonDiv';

const data = {
  labels: rows.map((data)=>{
    return data.productName.split("-")[0];
  }),
  datasets: [
    {
      label: 'Price',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: rows.map((data)=>data.price),
    }
  ]
};

const options = {
    scales: {
        y: {
          beginAtZero: true
        }
      }
  };

const LineChart = ({id}) =>{ 

    return(
        <>
        <Card>
          <CardContent>
              <CommonDiv>
                {(width, height) => (
                    <Line id={id} data={data} options={options} />
                )}
              </CommonDiv>
            <Typography  variant="h6" >
                show price chart
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is use line Chart to display
              </Typography>
          </CardContent>
        </Card>
            
            
        </>
    );
  
};

export default LineChart;
