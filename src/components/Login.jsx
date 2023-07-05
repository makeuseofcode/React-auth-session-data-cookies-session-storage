import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const testAuthData = {
    username: 'test',
    password: 'test',
  };
  
  const authenticateUser = (username, password) => {
  
    if (username === testAuthData.username && password === testAuthData.password) {
      
      const userData = {
        username,
        password,
      };
      
      sessionStorage.setItem('auth', JSON.stringify(userData));

      
      const expirationTime = new Date(new Date().getTime() + 60000);
      Cookies.set('auth', JSON.stringify(userData), { expires: expirationTime });

      return true;
    }

    return false;
  };

  const handleLogin = (e) => {
    e.preventDefault();
   
    const isAuthenticated = authenticateUser(username, password);

    if (isAuthenticated) {
      // Redirect to protected route after successful login
      navigate('/protected');
    } else {
      // Show error message or perform other actions for failed authentication
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
