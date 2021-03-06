import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';
import { notificationsData } from 'demos/header';
import withBadge from 'hocs/withBadge';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import { useHistory } from 'react-router-dom';

import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdInsertChart,
  MdMessage,
  MdNotificationsActive,
  MdNotificationsNone,
  MdPersonPin,
  MdSettingsApplications,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  Badge,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from 'utils/bemnames';

const bem = bn.create('header');

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>5</small>,
})(MdNotificationsActive);

function Header(props) {
  const [isOpenNotificationPopover, setisOpenNotificationPopover] =
    useState(false);
  const [isNotificationConfirmed, setisNotificationConfirmed] = useState(false);
  const [isOpenUserCardPopover, setisOpenUserCardPopover] = useState(false);
  const { authState } = useContext(AuthContext);

  const toggleNotificationPopover = () => {
    setisOpenNotificationPopover(!isOpenNotificationPopover);

    if (isNotificationConfirmed) {
      setisNotificationConfirmed(true);
    }
  };

  const toggleUserCardPopover = () => {
    setisOpenUserCardPopover(!isOpenUserCardPopover);
  };

  const handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();
    
    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
    setisOpenUserCardPopover(false);
  };

  let history = useHistory();
  const { setAuthState } = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({
      fname: '',
      lname: '',
      progileImg: '',
      role: '',
      id: 0,
      email: '',
      status: false,
    });
    history.push('/');
  };
  const profile = () => {
    setisOpenUserCardPopover(false);
    history.push('/profile');
  };

  return (
    <>
      <Navbar light expand>
        <Nav navbar className="collapsss">
          <div className="collaps">
            <MdClearAll
              outline
              size={35}
              onClick={handleSidebarControlButton}
            />
          </div>
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          <NavItem>
            <NavLink id="Popover2">
              {/* //profile image */}
              <Avatar onClick={toggleUserCardPopover} className="can-click" />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={isOpenUserCardPopover}
              toggle={toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title={authState.fname + ' ' + authState.lname}
                  subtitle={authState.role}
                  subtitle={authState.email}
                  className="border-light"
                >
                  <ListGroup flush>
                    <ListGroupItem
                      onClick={profile}
                      tag="button"
                      action
                      color="light"
                      className="text-dark"
                    >
                      <MdPersonPin /> Profile
                    </ListGroupItem>

                    <ListGroupItem
                      color="light"
                      tag="button"
                      onClick={logout}
                      to="/login"
                      action
                      className="text-dark"
                    >
                      <MdExitToApp /> Logout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;
