import React, { useState } from 'react';

const Profile = () => {
    const [show, setShow] = useState(true);
  return (
    <div>
      
      <div style={{ display: show ? "block" : "none" }}>
         <button onClick={() => setShow((s) => !s)}>toggle</button> 
          hello
      
      </div>
      <div style={{ display: show ? "none" : "block" }}>
         <p>heeh</p>
      <button onClick={() => setShow((s) => !s)}>cambiar</button> 
      <p>hshshs</p>
      </div>
    </div>
  );
    /*return (
        <div>
            <p>This is the profile interface</p>
        </div>
    )*/
}

export default Profile;