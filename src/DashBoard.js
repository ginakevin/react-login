import React, { Component } from 'react';
import {useMediaQuery, Grid } from '@mui/material';
import BarChart from './chartCompoment/BarChart';
import LineChart from './chartCompoment/LineChart';
import PieChart from './chartCompoment/PieChart';
import PolarAreaChart from './chartCompoment/PolarAreaChart'



function DashBoard(){
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <div style={{
           marginTop:40,
        }}>
            {/* <Grid container direction="column" spacing={2} justifyContent="center" alignItems="center" > */}
            <Grid container direction={isMobile ? 'column' : 'row'} spacing={2} >    
                <Grid item xs={12} sm={6} >
                    <BarChart  id='barchart1'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LineChart id='linechart1'/>
                </Grid>
                <Grid item xs={12} sm={6}  >
                    <PieChart  id='pieChart1'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <PolarAreaChart id='polarAreaChart1'/>
                </Grid>
            </Grid>
        </div>
    );

}

export default DashBoard;
