import React, { useState, useEffect } from 'react';
import { fetchStudyGroups, joinStudyGroup, leaveStudyGroup } from '../api/studyGroups';
import StudyBanner from './StudyBanner';
import './PopularStudyGroups.css'; // CSS 파일 import

const PopularStudyGroups = () => {
  const [studyGroups, setStudyGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(4); // 페이지 당 그룹 수
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const loadStudyGroups = async () => {
      try {
        const groups = await fetchStudyGroups();
        setStudyGroups(groups);
      } catch (error) {
        console.error('Failed to fetch study groups:', error);
      }
    };

    loadStudyGroups();
  }, []);

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

  // 페이지네이션 구현
  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = studyGroups.slice(indexOfFirstGroup, indexOfLastGroup);

  const totalPages = Math.ceil(studyGroups.length / groupsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="popular-study-groups">
      <h3 className="popular-study-groups-title">스터디 그룹 목록</h3>
      <div className="study-groups-list">
        {currentGroups.length > 0 ? (
          currentGroups.map((group) => (
            <div key={group._id} className="study-group-card">
              <StudyBanner title={group.name} />
              {localStorage.getItem(`joinedGroup_${group._id}`) ? (
                <button
                  className="leave-button"
                  onClick={() => handleLeaveGroup(group._id)}
                >
                  탈퇴
                </button>
              ) : (
                <button
                  className="join-button"
                  onClick={() => handleJoinGroup(group._id)}
                >
                  가입
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="no-study-groups">등록된 스터디 그룹이 없습니다.</p>
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handleClick(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularStudyGroups;
