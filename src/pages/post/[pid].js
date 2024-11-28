import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function Post({ post }) {
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h4">{post.title}</Typography>
        <Typography variant="body1">{post.content}</Typography>
        <Typography variant="caption" color="text.secondary">
          작성자: {post.author}, 날짜: {post.date}
        </Typography>
      </Paper>
    </Box>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:8000/post`);
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { pid: post.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:8000/post/${params.pid}`);
  const post = await res.json();

  return { props: { post } };
}
