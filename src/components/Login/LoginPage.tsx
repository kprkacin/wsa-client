import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth/api';
import { useAuth } from '../../services/auth/AuthProvider';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logIn } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleLoginClicked = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      const user = await loginUser('guest');
      logIn(user, () => navigate(from));
    } catch (error) {
      // ignore
    }
  };

  console.log('env', import.meta.env.VITE_API_URL);

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleLoginClicked}>
        <label>
          Username: <input name="username" type="text" />
        </label>{' '}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginPage;
