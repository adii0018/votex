import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setFieldErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await register(formData);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
      if (result.errors) {
        setFieldErrors(result.errors);
      }
    }
    
    setLoading(false);
  };

  return (
    <PageWrapper>
      <StyledWrapper>
        <div className="container">
          <div className="heading">Sign Up</div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form className="form" onSubmit={handleSubmit}>
            <div className="name-row">
              <input
                className="input half"
                type="text"
                name="first_name"
                id="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
              />
              <input
                className="input half"
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            
            <input
              required
              className="input"
              type="text"
              name="username"
              id="username"
              placeholder="Username *"
              value={formData.username}
              onChange={handleChange}
            />
            {fieldErrors.username && <span className="field-error">{fieldErrors.username}</span>}
            
            <input
              required
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail *"
              value={formData.email}
              onChange={handleChange}
            />
            {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
            
            <div className="password-wrapper">
              <input
                required
                className="input"
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Password *"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <div className="password-wrapper">
              <input
                required
                className="input"
                type={showPassword ? 'text' : 'password'}
                name="password2"
                id="password2"
                placeholder="Confirm Password *"
                value={formData.password2}
                onChange={handleChange}
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <button
              className="login-button"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="social-account-container">
            <span className="title">Or Sign up with</span>
            <div className="social-accounts">
              <button className="social-button google" type="button">
                <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
              </button>
              <button className="social-button apple" type="button">
                <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
              </button>
              <button className="social-button twitter" type="button">
                <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </button>
            </div>
          </div>
          
          <span className="agreement">
            Already have an account? <Link to="/login">Sign in here</Link>
          </span>
        </div>
      </StyledWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const StyledWrapper = styled.div`
  .container {
    max-width: 400px;
    background: #F8F9FD;
    background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
    margin: 20px;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: rgb(16, 137, 211);
  }

  .error-message {
    margin-top: 15px;
    padding: 12px;
    background: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 15px;
    color: #dc2626;
    font-size: 14px;
    text-align: center;
  }

  .field-error {
    display: block;
    color: #dc2626;
    font-size: 11px;
    margin-top: 5px;
    margin-left: 10px;
  }

  .form {
    margin-top: 20px;
  }

  .password-wrapper {
    position: relative;
    margin-top: 15px;
  }

  .eye-button {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: rgb(100, 116, 139);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    transition: color 0.2s;
    z-index: 10;
  }

  .eye-button:hover {
    color: rgb(16, 137, 211);
  }

  .name-row {
    display: flex;
    gap: 10px;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }

  .form .input.half {
    flex: 1;
  }

  .form .input::-moz-placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input::placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input:focus {
    outline: none;
    border-inline: 2px solid #12B1D1;
  }

  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .form .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
  }

  .form .login-button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
  }

  .form .login-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .social-account-container {
    margin-top: 25px;
  }

  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(170, 170, 170);
  }

  .social-account-container .social-accounts {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 5px;
  }

  .social-account-container .social-accounts .social-button {
    background: linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(112, 112, 112) 100%);
    border: 5px solid white;
    padding: 5px;
    border-radius: 50%;
    width: 40px;
    aspect-ratio: 1;
    display: grid;
    place-content: center;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 12px 10px -8px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .social-account-container .social-accounts .social-button .svg {
    fill: white;
    margin: auto;
  }

  .social-account-container .social-accounts .social-button:hover {
    transform: scale(1.2);
  }

  .social-account-container .social-accounts .social-button:active {
    transform: scale(0.9);
  }

  .agreement {
    display: block;
    text-align: center;
    margin-top: 15px;
    font-size: 12px;
    color: #64748b;
  }

  .agreement a {
    text-decoration: none;
    color: #0099ff;
    font-weight: 600;
  }
`;
