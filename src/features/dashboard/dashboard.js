import React from 'react';
import Sidebar from './sidebar';
import Topbar from './topbar';
import Footer from './footer';

const Dashboard = (props) => {
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="page-wrapper" className="gray-bg">
        <Topbar />
        <div className="wrapper wrapper-content animated fadeInRight">
          {props.children}
        </div>
        <Footer />
      </div>
    </div >
  );
}

export default Dashboard;