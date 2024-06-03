import React, { useState, useEffect } from 'react';
import { fetchUserCreatedGroups, createStudyGroup, joinStudyGroup, leaveStudyGroup, deleteStudyGroup } from '../api/studyGroups';

const ManageStudyGroupPage = () => {
  const [studyGroups, setStudyGroups] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadStudyGroups = async () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);

        if (storedUserId) {
          const groups = await fetchUserCreatedGroups(storedUserId);
          console.log('Fetched study groups:', groups); // 데이터 로깅
          setStudyGroups(groups);
        }
      } catch (error) {
        console.error('Failed to fetch study groups:', error);
      }
    };

    loadStudyGroups();
  }, []);

  const handleCreateGroup = async () => {
    const groupName = prompt('추가할 스터디 그룹의 이름을 입력하세요:');
    if (groupName && userId) {
      try {
        const newGroup = await createStudyGroup(groupName, userId);
        setStudyGroups([...studyGroups, newGroup]);
      } catch (error) {
        console.error('Failed to create group:', error);
      }
    }
  };

  const handleJoinGroup = async (id) => {
    try {
      const updatedGroup = await joinStudyGroup(id, userId);
      setStudyGroups(studyGroups.map(group => group._id === id ? updatedGroup : group));
      localStorage.setItem(`joinedGroup_${id}`, true); // 로컬 스토리지에 가입 상태 저장
    } catch (error) {
      console.error('Failed to join group:', error);
    }
  };

  const handleLeaveGroup = async (id) => {
    try {
      const updatedGroup = await leaveStudyGroup(id, userId);
      setStudyGroups(studyGroups.map(group => group._id === id ? updatedGroup : group));
      localStorage.removeItem(`joinedGroup_${id}`); // 로컬 스토리지에서 가입 상태 삭제
    } catch (error) {
      console.error('Failed to leave group:', error);
    }
  };

  const handleDeleteGroup = async (id) => {
    if (window.confirm('정말로 이 스터디 그룹을 삭제하시겠습니까?')) {
      try {
        await deleteStudyGroup(id);
        setStudyGroups(studyGroups.filter(group => group._id !== id));
        localStorage.removeItem(`joinedGroup_${id}`); // 로컬 스토리지에서 삭제된 그룹의 가입 상태 삭제
      } catch (error) {
        console.error('Failed to delete group:', error);
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#4b5563' }}>스터디 그룹 관리</h2>
      <button style={{ marginBottom: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#4b5563', color: '#fff', border: 'none' }} onClick={handleCreateGroup}>새로운 스터디 그룹 추가하기</button>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {studyGroups.map(group => (
          <li key={group._id} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #d1d5db', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            {group.name}{' '}
            {localStorage.getItem(`joinedGroup_${group._id}`) ? (
              <button style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#ef4444', color: '#fff', border: 'none' }} onClick={() => handleLeaveGroup(group._id)}>탈퇴</button>
            ) : (
              <button style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#fde68a', border: 'none' }} onClick={() => handleJoinGroup(group._id)}>가입</button>
            )}
            <button style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#ef4444', color: '#fff', border: 'none' }} onClick={() => handleDeleteGroup(group._id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStudyGroupPage;
