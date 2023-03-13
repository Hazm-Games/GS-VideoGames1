import React from 'react';


const User = ({auth})=> {
    


 

    return (
      <ul>
        {userInfo.map((auth) => {
          return (
            <li key={userInfo.id}>
              <h3>
              <li>{userInfo.name}</li>
              </h3>
            </li>
          );
        })}
        </ul>
      );
    };
  
  

  export default User
 