import React, { useState } from 'react';
import background from "../Images/background.jpg";
import axios from 'axios';
import config  from '../environment'; 
import { useNavigate} from 'react-router-dom';

function Login({ setAuthenticated }) {
  setAuthenticated(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const requestData = {
          username: username,
          password: password,
        };
        const response = await axios.post(`${config.baseApiUrl}/api/UsersController/LoginUser`, requestData);
       //const response = await axios.post(`https://localhost:7100/api/UsersController/LoginUser`, requestData);  
         
        try {
          if (response.data.isSuccess) {
            const token = response.data.result.token;
            setAuthenticated(true);
            localStorage.setItem('authToken', token);
            console.log(response.data.result.token);
            navigate('/dashboard');
          } else {
            setErrorMessage(response.data.message.join(', '));
            
          }
        } catch (error) {
          setErrorMessage('An error occurred during login.');
          console.error("Axios Error:", error);
        }
      };
   
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="login-form"
        style={{
          borderRadius: '25px',
          border: '1px solid rgb(10, 126, 235)',
          padding: '30px',
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        }}
      >
        <div className='text-center'>
        <h1
          className="login-heading"
          style={{
            color: 'rgb(10, 126, 235)',
            fontFamily: 'Bodoni',
            fontWeight: 'bolder',
            marginBottom: '20px',
          }}
        >
          LOGIN
        </h1>
        </div>

        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="text-danger" style={{ marginLeft: '150px' }}>{errorMessage}</div>}
          <div className={`form-group ${errorMessage ? 'has-error' : ''}`}>
            <input
              type="text"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
          {errorMessage && <div className="text-danger">Username is required.</div>}
          <br />
          <div className={`form-group ${errorMessage ? 'has-error' : ''}`}>
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          {errorMessage && <div className="text-danger">Password is required.</div>}
          <br />
          <div className="form-group">
            <button type="submit" className="btn btn-primary form-control" style={{ color: 'white' }}>
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;