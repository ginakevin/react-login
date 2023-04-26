// Content.js
import React from 'react';
import CreateProduct from './CreateProduct';
import AllTableContent from './AllTableContent';
import DashBoard from './DashBoard';

function Content({ activeContent }) {
  switch (activeContent) {
    case 'Dashbord':
      return <DashBoard />;
    case 'Create products':
      return <CreateProduct />;
    case 'Table':
      return <AllTableContent  />;
    case 'Drafts':
      return <div></div>;
    default:
      return <div></div>;
  }
}

export default Content;
