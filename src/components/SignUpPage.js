import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../api/auth';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mbti, setMbti] = useState('');
  const [gender, setGender] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        password,
        mbti,
        gender
      });
      if (response.status === 201) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('userId', response.data.userId); // userId 저장
        setToken(response.data.token); // 토큰 저장
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setSignUpError(err.response.data.message);
      } else {
        setSignUpError('서버 오류');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>회원가입</h2>
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
      <select
        value={mbti}
        onChange={(e) => setMbti(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '10px' }}
      >
        <option value="">MBTI 선택</option>
        <option value="INTJ">INTJ</option>
        <option value="INTP">INTP</option>
        <option value="ENTJ">ENTJ</option>
        <option value="ENTP">ENTP</option>
        <option value="INFJ">INFJ</option>
        <option value="INFP">INFP</option>
        <option value="ENFJ">ENFJ</option>
        <option value="ENFP">ENFP</option>
        <option value="ISTJ">ISTJ</option>
        <option value="ISFJ">ISFJ</option>
        <option value="ESTJ">ESTJ</option>
        <option value="ESFJ">ESFJ</option>
        <option value="ISTP">ISTP</option>
        <option value="ISFP">ISFP</option>
        <option value="ESTP">ESTP</option>
        <option value="ESFP">ESFP</option>
      </select>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '10px' }}
      >
        <option value="">성별 선택</option>
        <option value="male">남성</option>
        <option value="female">여성</option>
        <option value="other">기타</option>
      </select>
      <button onClick={handleSignUp} style={{ width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: '#FFF' }}>
        회원가입
      </button>
      {signUpError && <div style={{ color: 'red', marginTop: '10px' }}>{signUpError}</div>}
    </div>
  );
};

export default SignUpPage;
