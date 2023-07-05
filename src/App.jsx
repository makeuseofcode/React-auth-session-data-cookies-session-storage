import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './components/Login';

const ProtectedPage = ({ ...rest }) => {
  const isAuthenticated = !!Cookies.get('auth');
  const navigate = useNavigate();

  const handleLogout = () => {
    
    Cookies.remove('auth');
    navigate('/login'); 
  };

  if (!isAuthenticated) {
    navigate('/login'); 
    return null; // Return null to prevent rendering anything else
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', color: 'blue' }}>Hello, World!</h1>
      <button style={{ marginTop: '10px' }} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/protected/*" element={<ProtectedPage />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
