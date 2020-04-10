import React from 'react';
import { Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom'

const NavLink = (props) => {
  var location = useLocation();
  const isActive = location.pathname === props.to;
  const className = isActive ? 'active' : '';

  return(
    <li className={className}>
      <Link className={className} {...props}>
        {props.children}
      </Link>
    </li>
  );
} 

export default NavLink;