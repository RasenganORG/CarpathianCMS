import React from 'react';

const PermissionFrame = ({children}) => {

  return(
    <div
      style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'250px',
      }}
    >
      {children}
    </div>
  )
}

export default PermissionFrame
