import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ScheduleBanner from '../ScheduleBanner';
import AttendanceBanner from '../AttendanceBanner';
import TasksBanner from '../TasksBanner';
import ProgressBanner from '../ProgressBanner';

const StudyGroupDetailPage = () => {
  const { id } = useParams();
  const [studyGroup, setStudyGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudyGroup = async () => {
      try {
        const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
        const response = await axios.get(`http://localhost:5000/api/groups/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStudyGroup(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch study group:', error);
        setLoading(false);
      }
    };

    fetchStudyGroup();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!studyGroup) {
    return <div>스터디 그룹을 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#4b5563' }}>{studyGroup.name}</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <ScheduleBanner studyGroup={studyGroup} />
        <ProgressBanner studyGroup={studyGroup} />
        <AttendanceBanner studyGroup={studyGroup} />
        <TasksBanner studyGroup={studyGroup} />
      </div>
    </div>
  );
};

export default StudyGroupDetailPage;
