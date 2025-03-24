import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext }  from './AuthContext';

function Logout()
{
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  return
( 
  <div>
    Disconnected
  </div>
);

}

export default Logout;