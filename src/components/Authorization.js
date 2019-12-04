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
    <button className="" onClick={ toggleAuthorize }>{ isAuthorized ? 'Unauthorize' : 'Authorize' }</button>
  );
};

export default Authorization;
