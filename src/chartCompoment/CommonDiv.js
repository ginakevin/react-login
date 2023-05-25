import React from 'react';
import { useState,useEffect } from 'react';

const styles={
    container:{
      border: '1px solid green',
      borderRadius: '8px',
      backgroundColor: 'green',
    },
    Inner:{
      minWidth: '250px',
      minHeight:'60px',
      display: 'flex',
      justifyContent: 'center' 
    }
  
  }
function CommonDiv(props) {
     /**每次resize 時重新計算DataGrid的寬高
   */
     const [width, setWidth] = useState((window.innerWidth>=600)?window.innerWidth/2-90:window.innerWidth-130);
     const [height, setHeight] = useState((window.innerWidth>=600)?(window.innerWidth/2-90)/2:(window.innerWidth-130)/2);
   
    
    useEffect(() => {
       const handleResize = () => {
       setWidth((window.innerWidth>=600)?window.innerWidth/2-90:window.innerWidth-130);
       setHeight((window.innerWidth>=600)?(window.innerWidth/2-90)/2:(window.innerWidth-130)/2);
   
     };
 
     window.addEventListener('resize', handleResize);
 
     return () => {
       window.removeEventListener('resize', handleResize);
     };
   }, []);
   /** end */

   const isShow=props.isVisible;
   const containerStyle={
         ...(isShow && styles.container),
        width,
        height,
        ...styles.Inner
    }
   

    return (
        <div style={containerStyle} >
                {/* {props.children(width, height)} */}
                {typeof props.children === 'function' ? props.children(width, height) : props.children}
        </div>
    );
}


export default CommonDiv;