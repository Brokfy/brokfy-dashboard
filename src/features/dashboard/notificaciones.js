import React from 'react';

const Notificaciones = () => {
  return(
    <li className="dropdown">
      <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#!">
          <i className="fa fa-bell"></i>  <span className="label label-primary">8</span>
      </a>
      <ul className="dropdown-menu dropdown-alerts">
          <li>
              <a href="mailbox.html" className="dropdown-item">
                  <div>
                      <i className="fa fa-envelope fa-fw"></i> You have 16 messages
                      <span className="float-right text-muted small">4 minutes ago</span>
                  </div>
              </a>
          </li>
          <li className="dropdown-divider"></li>
          <li>
              <a href="profile.html" className="dropdown-item">
                  <div>
                      <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                      <span className="float-right text-muted small">12 minutes ago</span>
                  </div>
              </a>
          </li>
          <li className="dropdown-divider"></li>
          <li>
              <a href="grid_options.html" className="dropdown-item">
                  <div>
                      <i className="fa fa-upload fa-fw"></i> Server Rebooted
                      <span className="float-right text-muted small">4 minutes ago</span>
                  </div>
              </a>
          </li>
          <li className="dropdown-divider"></li>
          <li>
              <div className="text-center link-block">
                  <a href="notifications.html" className="dropdown-item">
                      <strong>See All Alerts</strong>
                      <i className="fa fa-angle-right"></i>
                  </a>
              </div>
          </li>
      </ul>
    </li>
  )
}

export default Notificaciones;