import React from 'react';
import { useState,useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography
  } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import  rows from '../StorageForTempt';
import CommonDiv from './CommonDiv';
import {Chart as chartjs} from 'chart.js/auto';

const generateColors = (numColors) => {
    let colors = [];
  
    for (let i = 0; i < numColors; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      colors.push(`rgb(${r}, ${g}, ${b},0.8)`);
    }
  
    return colors;
  };

const data = {
    labels: rows.map((data)=>{
        return data.productName.split("-")[0];
      }),
  datasets: [
    {
      label: 'Category',
      data: rows.map((data)=>data.category),
      backgroundColor: generateColors(150),
      hoverOffset: 4,
    },
  ],
};

const PieChart = () => {

  return ( 

    <Card>
        <CardContent>
             <CommonDiv isVisible={false}>
                {(width, height) => (
                     <Pie data={data} width={width} height={height} />
                )}
            </CommonDiv>
            {/* </div> */}
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

export default PieChart;
