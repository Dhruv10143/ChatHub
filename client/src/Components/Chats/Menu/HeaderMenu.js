import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const HeaderMenu = ({ setOpenDrawer, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <div>
      <MoreVertIcon onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setOpenDrawer(true);
          }}
          className="text-sm text-gray-600"
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout(); // Handle logout action here
          }}
          className="text-sm text-gray-600"
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default HeaderMenu;
