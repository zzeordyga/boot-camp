import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, CheckCircle, UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const result = await register(formData.email, formData.password, formData.role);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setTimeout(() => {
        navigate('/user/profile');
      }, 1500);
    } else {
      setMessage({ type: 'error', text: result.error });
    }

    setIsLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '12px', 
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <UserPlus size={48} color="#667eea" style={{ margin: '0 auto 15px' }} />
          <h2 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '28px' }}>Create Account</h2>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Sign up to get started</p>
        </div>

        {message.text && (
          <div style={{ 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: errors.email ? '2px solid #dc3545' : '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = errors.email ? '#dc3545' : '#e0e0e0'}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                {errors.email}
              </span>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: errors.password ? '2px solid #dc3545' : '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = errors.password ? '#dc3545' : '#e0e0e0'}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                {errors.password}
              </span>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: errors.confirmPassword ? '2px solid #dc3545' : '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = errors.confirmPassword ? '#dc3545' : '#e0e0e0'}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{ 
              width: '100%', 
              padding: '14px', 
              backgroundColor: isLoading ? '#9ca3af' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s',
              boxSizing: 'border-box'
            }}
            onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#5568d3')}
            onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#667eea')}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: '25px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;