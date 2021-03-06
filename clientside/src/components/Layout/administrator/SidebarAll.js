import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import * as GIIcons from 'react-icons/gi';
import * as HiIcons from 'react-icons/hi';
import React from 'react';
import {

  MdDashboard,
  MdExtension,
  
  MdKeyboardArrowDown,
 
  MdReport,

  MdWeb,

} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


const navItemsAdmin = [
  { to: '/', name: 'dashboard Admin', exact: true, Icon: MdDashboard },
  { to: '/cpdP', name: 'CPD Reports', exact: false, Icon: HiIcons.HiDocumentReport },
  { to: '/courseP', name: 'Courses', exact: false, Icon: FaIcons.FaGraduationCap },
  { to: '/lecCourse', name: 'Lecturing', exact: false, Icon: FaIcons.FaGraduationCap },
  { to: '/widgets', name: 'Workshops', exact: false, Icon: GIIcons.GiTeacher  },
  { to: '/blogs', name: 'Blogs', exact: false, Icon: FaIcons.FaBloggerB },
  { to: '/widgets', name: 'Forum', exact: false, Icon: AiIcons.AiFillFileText },
  { to: '/job', name: 'Jobs', exact: false, Icon: FaIcons.FaUserAlt  },
  { to: '/cards', name: 'cards', exact: false, Icon: MdWeb },

  { to: '/charts', name: 'reports', exact: false, Icon: MdReport },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
      
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>

          <Nav vertical>
            {navItemsAdmin.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Courses</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
           
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
