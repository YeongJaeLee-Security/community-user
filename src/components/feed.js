import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function Feed({ posts }) {
  const router = useRouter();

  return (
    <Box>
      {posts.map((post) => (
        <Card
          key={post.id}
          sx={{ mb: 2, cursor: 'pointer', borderRadius: 2 }}
          onClick={() => router.push(`/post/${post.id}`)}
        >
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>
            {post.image_path && (
              <Box
                component="img"
                sx={{
                  display: 'block', // 이미지 블록 처리
                  margin: '0 auto', // 수평 가운데 정렬
                  width: '600px',
                  height: '500px',
                  objectFit: 'cover',
                }}
                src={`http://localhost:8000/${post.image_path}`}
              />
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
