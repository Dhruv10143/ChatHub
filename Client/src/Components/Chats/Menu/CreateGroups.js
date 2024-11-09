import React from 'react'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { IconButton } from '@mui/material';
import { bgcolor } from '@mui/system';


function CreateGroups()
{
    return(
        <div style={{
            flex:'.7',
            alignSelf:'center',
            padding:'20px 10px',
            margin:'10px',
            bgcolor:'white',
            borderRadius:'20px',
            display:'flex',
            justifyContent:'space-between'
        }}>

<input placeholder='Enter the group name'></input>
<IconButton>
    <DoneOutlineIcon></DoneOutlineIcon>
</IconButton>

        </div>
    )
}

export default CreateGroups;