import React from 'react';

const Logo = props => {
  return (
    <img
      alt="Logo"
      src="/static/merittrac.png"
      {...props}
      style={{ height: '100px', width: '100px' }}
    />
  );
};

export default Logo;