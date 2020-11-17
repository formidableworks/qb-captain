import { IconButton, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutThunk } from '../authentication/authThunks';

export function NavMenu(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
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
      default:
        break;
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
      </Menu>
    </div>
  );
}
