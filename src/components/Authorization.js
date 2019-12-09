import React from 'react';

const Authorization = ({ isAuthorized }) => {

  const toggleAuthorize = () => {

    if (!isAuthorized)
      window.gapi.auth2.getAuthInstance().signIn();
    else
      window.gapi.auth2.getAuthInstance().signOut();

    // we have a listener on the sign in state through the api so no need to
    // set isAuthorized here
  }

  return (
    <>
      <p className="text-center">Welcome to Digital Dashboard! This application shows your Google calendar events happening over the next week.</p>
      <p className="text-center">To get started, you'll have to allow the application to retrieve your calendar data. Don't worry&#8211;we'll never log this information.</p>
      <button onClick={ toggleAuthorize }>{ isAuthorized ? 'Unauthorize' : 'Authorize this application' }</button>
    </>
  );
};

export default Authorization;
