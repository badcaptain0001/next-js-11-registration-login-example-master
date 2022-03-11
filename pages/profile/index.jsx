import { useState, useEffect } from 'react';
import { userService } from 'services';
import { Link } from 'components';


export default Profile;
function Profile() {
  return (
    <div className="p-4">
      <div className="container">
      <h1 align="center">My Profile</h1>
      </div>
      <div className='mainProfileContainer'>
      <h3>UserName: {userService.userValue?.username}</h3>
      <h3>FirstName: {userService.userValue?.firstName} </h3>
      <h3>LastName: {userService.userValue?.lastName} </h3>
      <h3>Desination: {userService.userValue?.designation}</h3>
      </div>
    </div>
      );
}