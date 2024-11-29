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
              {post.content}
            </Typography>
            {post.image_path && (
              <Box component="img" sx={{width: '600px', height: '500px', objectFit: 'cover'}} src={`http://localhost:8000/${post.image_path}`}></Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
