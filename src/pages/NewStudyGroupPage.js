import React, { useState, useEffect } from 'react';
import { searchStudyGroups, joinStudyGroup, leaveStudyGroup } from '../api/studyGroups';

const NewStudyGroupPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studyGroups, setStudyGroups] = useState([]);
  const userId = localStorage.getItem('userId');

  const handleSearchChange = async (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.length > 0) {
      try {
        const groups = await searchStudyGroups(event.target.value);
        setStudyGroups(groups);
      } catch (error) {
        console.error('Failed to search study groups:', error);
      }
    } else {
      setStudyGroups([]);
    }
  };

  const handleJoinGroup = async (id) => {
    try {
      const updatedGroup = await joinStudyGroup(id, userId);
      setStudyGroups(studyGroups.map(group => group._id === id ? updatedGroup : group));
      localStorage.setItem(`joinedGroup_${id}`, true);
    } catch (error) {
      console.error('Failed to join group:', error);
    }
  };

  const handleLeaveGroup = async (id) => {
    try {
      const updatedGroup = await leaveStudyGroup(id, userId);
      setStudyGroups(studyGroups.map(group => group._id === id ? updatedGroup : group));
      localStorage.removeItem(`joinedGroup_${id}`);
    } catch (error) {
      console.error('Failed to leave group:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#4b5563' }}>새로운 스터디 그룹 찾기</h2>
      <input
        type="text"
        placeholder="스터디 그룹 검색"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #d1d5db', width: '100%' }}
      />
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {studyGroups.length > 0 ? (
          studyGroups.map(group => (
            <li key={group._id} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #d1d5db', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              {group.name}{' '}
              {localStorage.getItem(`joinedGroup_${group._id}`) ? (
                <button style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#ef4444', color: '#fff', border: 'none' }} onClick={() => handleLeaveGroup(group._id)}>탈퇴</button>
              ) : (
                <button style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#fde68a', border: 'none' }} onClick={() => handleJoinGroup(group._id)}>가입</button>
              )}
            </li>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default NewStudyGroupPage;
