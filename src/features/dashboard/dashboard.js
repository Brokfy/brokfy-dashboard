import React from 'react';
import ReactDOM from "react-dom";
import Sidebar from './sidebar';
import Topbar from './topbar';
import Footer from './footer';
import { useIsAuthenticated } from '../common/redux/hooks';
import Protected from './protected';
import { PageLogin } from '../common';

const Modal = ({ children }) => {
  const element = document.getElementById("overlay");
  if (children) {
    element.classList.remove("hidden");
    return ReactDOM.createPortal(children, element);
  }
  element.classList.add("hidden");
  return null;
};

const Dashboard = (props) => {  
  const { isAuthenticated } = useIsAuthenticated();

  return (
    <React.Fragment>
      <Modal>
        { !isAuthenticated ? <PageLogin /> : null }
      </Modal>
      <div id="wrapper">
        <Sidebar />
        <div id="page-wrapper" className="gray-bg">
          <Topbar />
            <Protected>
              {props.children}
            </Protected>
          <Footer />
        </div>
      </div >
    </React.Fragment>
  );
}

export default Dashboard;