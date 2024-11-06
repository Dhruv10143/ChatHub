import React from 'react';

const Box = ({ width, height, backgroundColor, children }) => {
  const boxStyle = {
    width: width || '700px',
    height: height || '870px',
    backgroundColor: backgroundColor || 'lightblue',
    border: '0px solid black',
    borderRadius: '5px',
  };

  return (
    <div style={boxStyle}>
      {children}
    </div>
  );
};

export default Box;