import React from 'react';
import Button from 'react-bootstrap/Button';

const Authorization = ({ isAuthorized }) => {

  const toggleAuthorize = () => {

    if (!isAuthorized)
      window.gapi.auth2.getAuthInstance().signIn();
    else
      window.gapi.auth2.getAuthInstance().signOut();

    // we have a listener on the sign in state through the api so no need to
    // set a new isAuthorized state here
  }

  return (
    <Button className="" onClick={ toggleAuthorize }>{ isAuthorized ? 'Unauthorize' : 'Authorize' }</Button>
  );
};

export default Authorization;
