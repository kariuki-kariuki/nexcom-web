import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>(); // Ensure token is typed

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      navigate('/', { replace: true });
    }
  }, [token]);
  return <div>Success</div>;
};

export default Callback;
