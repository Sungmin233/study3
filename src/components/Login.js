import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });
      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('userId', response.data.userId); // userId 저장
        localStorage.setItem('token', response.data.token); // token 저장
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setLoginError(err.response.data.message);
      } else {
        setLoginError('서버 오류');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '10px' }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '10px' }}
      />
      <button onClick={handleLogin} style={{ width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: '#FFF' }}>
        로그인
      </button>
      {loginError && <div style={{ color: 'red', marginTop: '10px' }}>{loginError}</div>}
    </div>
  );
};

export default Login;
