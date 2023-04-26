import React from "react";
import { useState,useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import  rows from '../StorageForTempt'
import {
  Card,
  CardContent,
  Typography
} from '@mui/material';
import CommonDiv from './CommonDiv';
import {Chart as chartjs} from 'chart.js/auto';


const data = {
  labels: rows.map((data)=>{
    return data.productName.split("-")[0];
  }),
  datasets: [
    {
      label: "Amount",
      backgroundColor: [
        'rgba(255, 99, 132,0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
    ],
      borderColor: [
        "rgba(0,0,0,1)",
    ],
      borderWidth: 2,
      data: rows.map((data)=>data.amount),
    },
  ],
};
const options = {
  title: {
    display: false,
    text: "Sales Report",
    fontSize: 20,
    fontColor: 'blue'
  },
  legend: {
    display: false,
    position: "top",
    labels: {
      fontColor: 'white',
      color: 'white'
    },
  },
  scales: {
    y: {
      grid: {
        color: 'white'
      },
      ticks:{
        fontColor: 'white',
        color: 'white'
      },
      
  },
    x: {
      grid: {
        color: 'white'
      },
      ticks:{
        fontColor: 'white',
        color: 'white'
      }
    },
  },
};



const BarChart =({ id }) => {

  return (
    <Card>
      <CardContent>
        <CommonDiv isVisible={true}> 
            {(width, height) => (
               <Bar id={id} data={data} options={options} />
            )}
        </CommonDiv>
        <Typography  variant="h6" >
            show amount chart
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is use Bar Chart to display
          </Typography>
      </CardContent>
    </Card>
     
      
  );
};

export default BarChart;
