import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import RegisterForm from '../../components/Auth/RegisterForm';

const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSwitchToLogin = () => {
    navigate('/login');
  };

  return <RegisterForm onSwitchToLogin={handleSwitchToLogin} />;
};

export default Register;