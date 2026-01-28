import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from '../../components/Auth/LoginForm';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSwitchToRegister = () => {
    navigate('/register');
  };

  return <LoginForm onSwitchToRegister={handleSwitchToRegister} />;
};

export default Login;