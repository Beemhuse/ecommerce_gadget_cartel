import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';

const useLoggedInStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    // Check if the token exists in the cookie
    const token = cookies.get('GC_token');

    // Update the login status based on the presence of the token
    setIsLoggedIn(!!token);
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  return isLoggedIn;
};

export default useLoggedInStatus;
