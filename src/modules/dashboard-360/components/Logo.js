import React from 'react';

const Logo = props => {
  return (
    <img
      alt="Logo"
      src="/static/merittrac.jpg"
      {...props}
      style={{ height: '50px', width: '110px' }}
    />
  );
};

export default Logo;
