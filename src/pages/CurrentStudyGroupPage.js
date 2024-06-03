import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CurrentStudyGroupPage = () => {
  const [joinedStudyGroups, setJoinedStudyGroups] = useState([]);
  const userId = localStorage.getItem('userId');

  const fetchJoinedStudyGroups = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/groups/user/${userId}`);
      setJoinedStudyGroups(response.data);
    } catch (error) {
      console.error('Failed to fetch joined study groups:', error);
    }
  };

  const handleLeaveGroup = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/groups/${id}/leave`, { userId });
      fetchJoinedStudyGroups(); // 탈퇴 후 그룹 목록 갱신
    } catch (error) {
      console.error('Failed to leave group:', error);
    }
  };

  useEffect(() => {
    fetchJoinedStudyGroups();
  }, []);

  return (
    <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#4b5563' }}>현재 진행중인 스터디 그룹</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {joinedStudyGroups.length > 0 ? (
          joinedStudyGroups.map(group => (
            <li key={group._id} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #d1d5db', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <Link to={`/study_group/${group._id}`} style={{ color: '#4b5563' }}>
                {group.name}
              </Link>
              <button onClick={() => handleLeaveGroup(group._id)} style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#ef4444', color: '#fff', border: 'none' }}>탈퇴</button>
            </li>
          ))
        ) : (
          <p>가입된 그룹이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default CurrentStudyGroupPage;
