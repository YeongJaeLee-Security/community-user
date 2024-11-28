import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

export default function Announcement() {
  const [notice, setNotice] = useState('공지사항을 불러오는 중입니다...');
  const [error, setError] = useState(null);
  const isCancelled = useRef(false); // useRef로 상태 관리

  const fetchNotice = async () => {
    try {
      const response = await fetch('http://localhost:8000/notice');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!isCancelled.current) {
        setNotice(data.detail || data.message || '새로운 공지가 없습니다.');
      }
    } catch (err) {
      if (!isCancelled.current) {
        setError('공지사항을 가져오는 데 실패했습니다.');
      }
      console.error(err);
    }
  };

  useEffect(() => {
    isCancelled.current = false; // 컴포넌트 마운트 시 초기화
    fetchNotice();

    return () => {
      isCancelled.current = true; // 언마운트 시 상태 업데이트
    };
  }, []);

  return (
    <Box sx={{ bgcolor: '#FF4500', color: 'white', p: 2, borderRadius: 2, mb: 2 }}>
      <Typography variant="h6">공지사항</Typography>
      <Typography variant="body1">
        {error || notice}
      </Typography>
    </Box>
  );
}
