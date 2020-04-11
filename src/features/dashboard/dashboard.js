import React from 'react';
import Sidebar from './sidebar';
import Topbar from './topbar';
import Footer from './footer';
import { useIsAuthenticated } from '../common/redux/hooks';
import Protected from './protected';

const Dashboard = (props) => {  
  const { isAuthenticated } = useIsAuthenticated();

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="page-wrapper" className="gray-bg">
        <Topbar />
        <div className="wrapper wrapper-content animated fadeInRight">
          <Protected>
            {props.children}
          </Protected>
        </div>
        <Footer />
      </div>
    </div >
  );
}

export default Dashboard;