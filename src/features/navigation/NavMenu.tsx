import { IconButton, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import SettingsIcon from '@material-ui/icons/Settings';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutThunk } from '../authentication/authThunks';
import { toggleThemeType } from '../theme/themeActions';
import { selectThemeType } from '../theme/themeSelectors';

export function NavMenu(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const themeType = useSelector(selectThemeType);
  const [anchorEl, setAnchorEl] = React.useState<undefined | HTMLElement>(undefined);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(undefined);
  };

  const handleItemClick = (item: string): void => {
    handleClose();
    switch (item) {
      case 'settings':
        history.push({ pathname: '/settings' });
        break;
      case 'logout':
        dispatch(logoutThunk());
        break;
      case 'toggleThemeType':
        dispatch(toggleThemeType());
        break;
      default:
        throw new Error(`NavMenu: unexpected choice ${item}`);
    }
  };

  return (
    <div>
      <IconButton
        aria-label="navigation menu"
        aria-controls="nav-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu id="nav-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleItemClick('settings')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleItemClick('logout')}>
          <ListItemIcon>
            <MeetingRoomIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        <MenuItem onClick={() => handleItemClick('toggleThemeType')}>
          <ListItemIcon>
            {themeType === 'light' ? <NightsStayIcon /> : <WbSunnyIcon />}
          </ListItemIcon>
          {themeType === 'light' ? 'Dark' : 'Light'} mode
        </MenuItem>
      </Menu>
    </div>
  );
}
