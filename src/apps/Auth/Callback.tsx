import axios from 'axios';
import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import { UserContextType } from '../../@types/app';
import { url } from '../../data/url';

const Callback = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>(); // Ensure token is typed
  const { updateUser } = useContext(AppContext) as UserContextType;

  const fetchToken = async () => {
    if (!token) {
      console.log('Token is missing.');
      navigate('/login', { replace: true });
    } else {
      localStorage.setItem('token', token);
    }

    try {
      const response = await axios.get(`${url}/auth/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      updateUser(response.data);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  fetchToken();

  return <div>Callback</div>;
};

export default Callback;
