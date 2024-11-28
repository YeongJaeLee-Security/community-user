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
          sx={{ mb: 2, cursor: 'pointer' }}
          onClick={() => router.push(`/post/${post.id}`)}
        >
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {post.content.slice(0, 100)}... {/* 내용 일부만 표시 */}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
