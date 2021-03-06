import React from 'react';
import PropTypes from 'prop-types';
import { Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { useFetchRestricciones } from './redux/fetchRestricciones';

const NavLink = (props) => {

  const { restricciones, fetchRestricciones, fetchRestriccionesPending } = useFetchRestricciones();


  var location = useLocation();
  const isActive = location.pathname === props.data.to || props.data.active || (props.data.to === "/reportes" && /\/reportes\/(.*)/.test(location.pathname));
  const className = isActive ? 'active' : '';

  const activeLink = (evt, prevent) => {
    if( prevent ) {
      evt.preventDefault();
    }
    const menu = props.menu.map(item => {
      return { 
        ...item,
        active: (item.to === props.data.to) || ( props.data.to === "/reportes" && /\/reportes\/(.*)/.test(item.to) )
      };
    });
    props.setMenu(menu);
  }
  
  const LinkRoute = () => (<Link className={className} to={props.data.to} onClick={(evt) => { activeLink(evt, false); }}>
    {props.children}
  </Link>);

  const NotLinkRoute = () => (<a href="#!" onClick={(evt) => { activeLink(evt, true); }}>
    {props.children}
  </a>);

  const Item = !props.data.childrenRoutes || props.data.childrenRoutes.length === 0 ? LinkRoute : NotLinkRoute;
  
  return(
    <li className={className}>
      <Item />
      {
        props.data.childrenRoutes ?
          <ul className={`nav nav-second-level collapse ${props.data.active || className !== "" ? 'in' : ''}`} aria-expanded="true">
            {
              props.data.childrenRoutes.map((element, index) => {
                return restricciones.filter(res => res.idMenu === element.id).length > 0 ? null :
                //return (
                  <li key={`subitem_${props.data.to}_${index}`}>
                    <Link className={className} to={element.to} onClick={(evt) => { activeLink(evt, false); }}>
                      {element.label}
                    </Link>
                  </li>
                //);
              })
            }
          </ul> :
          null
      }
    </li>
  );
} 

NavLink.propTypes = {
  data: PropTypes.object.isRequired,
  menu: PropTypes.array.isRequired,
  setMenu: PropTypes.func.isRequired,
}

export default NavLink;