import React from 'react';

import { signIn, signOut } from '../apis/googleCalendarApi';

const Authorization = ({ signedIn }) => {

  const toggleAuthorize = () => {

    if (!signedIn)
      signIn();
    else
      signOut();

    // we have a listener on the sign in state through the api so no need to
    // set signedIn here
  }

  return (
    <>
      <p>Welcome to Digital Dashboard!</p>
      <p>This application shows your Google calendar events happening over the next week. To get started, you'll
        have to allow the application to retrieve your calendar data.</p>
      <button onClick={ toggleAuthorize }>{ signedIn ? 'Unauthorize' : 'Authorize this application' }</button>
    </>
  );
};

export default Authorization;
