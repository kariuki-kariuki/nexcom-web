import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import { UserContextType } from '../../@types/app';

const Callback = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { updateUser } = useContext(AppContext) as UserContextType;

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
    const fetchToken = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        navigate('/', { replace: true });
        updateUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchToken();
  }, []);
  return <div>Callback</div>;
};

export default Callback;
