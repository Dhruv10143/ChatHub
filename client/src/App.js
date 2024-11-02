import React, { useState } from 'react';
import Messenger from './Components/Messenger';
import AccountProvider from './Components/Context/AccountProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  const [error, setError] = useState(null);

  return (
    <div>
      <AccountProvider>
      <GoogleOAuthProvider clientId="479097973289-selvfgkimlogk60mgga4kfd0tq2fd9cj.apps.googleusercontent.com">
        <Messenger />
      </GoogleOAuthProvider>;
      </AccountProvider>
    </div>
  );
}

export default App;
