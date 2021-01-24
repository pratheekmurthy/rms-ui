import React from 'react';

const Logo = props => {
  return (
    <img
      alt="Logo"
      src="/static/merittrac.png"
      {...props}
      style={{ height: '50px', width: '50px' }}
    />
  );
};

export default Logo;
