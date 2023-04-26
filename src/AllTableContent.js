import * as React from 'react';
import { useState } from 'react';
import {
    Typography
  } from '@mui/material';
import ProductTable from './ProductTable'
import ProductFix from './ProductFix'

function AllTableContent(){

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