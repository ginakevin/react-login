import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { useState,useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography
  } from '@mui/material';
import  rows from '../StorageForTempt';
import CommonDiv from './CommonDiv';

const data = {
    labels: rows.map((data)=>{
        return data.productName.split("-")[0];
      }),
  datasets: [
    {
      label: 'My First Dataset',
      data: rows.map((data)=>data.category),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(255, 205, 86, 0.5)',
        'rgba(201, 203, 207, 0.5)',
        'rgba(54, 162, 235, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(201, 203, 207, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    r: {
      angleLines: {
        display: false,
      },
      suggestedMin: 0,
      suggestedMax: 20,
    },
  },
};

const PolarAreaChart = () => {
    return(
        <Card>
            <CardContent>
                <CommonDiv>
                  {(width, height) => (
                      <PolarArea data={data} options={options} />
                  )}
                </CommonDiv>
                <Typography  variant="h6" >
                    show amount chart
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This is use PolarArea Chart to display
                </Typography>
            </CardContent>
        </Card>
    )

 
};

export default PolarAreaChart;
