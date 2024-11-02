import React from 'react';
import Drawer from '@mui/material/Drawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';
import Profile from './Profile';

const drawerStyle = {
    left: 20,
    top: 20,
    height: '95%',
    width: '24.6%',
    boxShadow: 'none'
};

const InfoDrawer = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: drawerStyle }}
        >
            <div className='bg-emerald-500 h-[107px] text-white flex'>
                <div className='mt-auto flex p-[15px] gap-4' style={{ fontWeight: 700 }}>
                    <ArrowBackIcon onClick={handleClose} style={{ fontWeight: 700 }} />
                    <Typography className='text-base' sx={{ fontWeight: 700 }}>Profile</Typography>
                </div>
            </div>
            <div className="bg-zinc-200 h-[90%]">
              <Profile />
            </div>
        </Drawer>
    );
};

export default InfoDrawer;
