import * as React from 'react';
import { useState } from 'react';
import {
    Typography
  } from '@mui/material';
import ProductTable from './ProductTable';
import ProductFix from './ProductFix';
import TableRows from './AllTableData';

function AllTableContent(){
    // console.log("1");

    const [showAllTableContent, setShowAllTableContent]=useState(true);
    const [tableData, setTableData]=useState();

    const handleTableContent=(propsData)=>{
        setShowAllTableContent(propsData.showTable);
        setTableData(propsData.params);
    }

    return(
        <div>
            {
                showAllTableContent?<ProductTable  handleTableToggle={handleTableContent} />:
                <ProductFix handleTableToggle={handleTableContent} tableData={tableData}/>
            }
        </div>
    )
}

export default AllTableContent;