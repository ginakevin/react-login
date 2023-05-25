// Content.js
import React from 'react';
import CreateProduct from './CreateProduct';
import AllTableContent from './AllTableContent';
import DashBoard from './DashBoard';
import TableRows from './AllTableData';
import SettingPage from './SettingPage';
import ContactUsPage from './ContactUsPage';

function Content({ activeContent }) {

  switch (activeContent) {
    case 'Dashbord':
      return <DashBoard />;
    case 'Create products':
      return <CreateProduct />;
    case 'Table':
      // console.log("enter");
      return <AllTableContent  />;
    case 'ContactUs':
      return <ContactUsPage/>;
    case 'Setting':
      return <SettingPage />;
    default:
      return <div></div>;
  }
}

export default Content;
