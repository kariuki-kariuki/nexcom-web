import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  if (token) {
    localStorage.setItem('token', token);
  }

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    };

    fetchToken();
  }, []);
  return <div>Callback</div>;
};

export default Callback;
