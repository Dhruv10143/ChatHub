import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';

const Search = ({ setText }) => {
  return (
    <div 
      style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Partially transparent black
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        
        height: '45px',
        padding: '0 10px',
      }}
    >
      <div 
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: '10px',
        }}
      >
        <SearchIcon style={{ color: 'lightgray' }} fontSize="small" />
        <InputBase 
          style={{
            color: 'white',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            flex: 1,
            paddingLeft: '5px',
          }}
          placeholder="Search or start new chat" 
          onChange={(e) => setText(e.target.value)} 
        />
      </div>
    </div>
  );
};

export default Search;
