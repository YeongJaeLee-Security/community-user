import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Announcement() {
  return (
    <Box sx={{ bgcolor: '#FF4500', color: 'white', p: 2, borderRadius: 2, mb: 2 }}>
      <Typography variant="h6">공지사항</Typography>
      <Typography variant="body1">
        커뮤니티에 오신 것을 환영합니다! 새로운 공지사항을 확인하세요.
      </Typography>
    </Box>
  );
}
