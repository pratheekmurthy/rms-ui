import React from 'react';

const Logo = props => {
  return (
    <img
      alt="Logo"
      src="/static/grassroots.png"
      {...props}
      style={{ height: '50px', width: '150px' }}
    />
  );
};

export default Logo;
