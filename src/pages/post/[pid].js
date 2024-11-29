import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Paper, Typography, TextField } from '@mui/material';
import { useAuth } from "@/context/authcontext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Post({ post }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isReporting, setIsReporting] = useState(false); // 신고 상태
  const [content, setContent] = useState(post.content);
  const [reportContent, setReportContent] = useState(""); // 신고 내용
  const { isLoggedIn, authId } = useAuth();
  const [ prevContent, setPrevContent ] = useState(post.content);

  const isAuthor = post.author === authId;
  const router = useRouter();

  function enterEdit() {
    setIsEdit(true);
  }

  function cancelEdit() {
    setContent(prevContent);
    setIsEdit(false);
  }

  const url = `http://localhost:8000/post/${post.id}`;
  const headers = {
    "Content-Type": "application/json",
  };
  const options = {
    headers,
    post_id: post.id,
  };

  async function editContent(e) {
    e.preventDefault();

    const updated = {
      ...post,
      content
    };
    delete updated.id;

    const response = await fetch(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(updated),
    });
    setIsEdit(false);
    setPrevContent(content);
  }

  async function deletePost() {
    const response = await fetch(url, {
      ...options,
      method: "DELETE",
    });
    router.push("/");
  }

  async function submitReport(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/report", {
        method: "POST",
        headers,
        credentials: "include", // 필요하지 않다면 제거
        body: JSON.stringify({
          user_id: post.author,
          report_content: reportContent,
        }),
      });

      if (response.status === 201) {
        alert("신고 접수가 완료되었습니다.");
        setReportContent("");
        setIsReporting(false);
      } else {
        alert("잘못된 접근입니다.");
      }
    } catch (error) {
      alert("잘못된 접근입니다.");
    }
  }

  return (
    <>
      <Head>
        <title>{post.title} : Community Sesac</title>
        <meta name="description" content={`Post by ${post.user.usename} on ${post.date}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 게시글 내용 */}
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
          {/* <Link href={`http://localhost:3000/profile/${post.user.username}`}> */}
          <Link href={`http://localhost:3000/profile/${post.user.id}`}>
          작성자: {post.user.username}
          </Link>
          | 날짜: {post.date}
        </Typography>
        {isEdit ? (
          <Box component="form" onSubmit={editContent} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              multiline
              rows={5}
              fullWidth
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Edit your content..."
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" type="submit" sx={{ bgcolor: 'primary.main' }}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={cancelEdit}>
                Cancel
              </Button>
            </Box>
          </Box>
        ) : isReporting ? (
          <Box component="form" onSubmit={submitReport} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              placeholder="Enter report reason..."
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" type="submit" sx={{ bgcolor: 'primary.main' }}>
                Submit Report
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setIsReporting(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1">
            {typeof content === 'string' ? content : JSON.stringify(content)}
          </Typography>
        )}
      </Paper>

      {/* 버튼들 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
        }}
      >
        {/* REPORT 버튼 */}
        {isLoggedIn && !isAuthor && !isReporting && (
          <Button
            variant="outlined"
            color="warning"
            sx={{ borderColor: 'warning.main', color: 'warning.main' }}
            onClick={() => setIsReporting(true)}
          >
            Report
          </Button>
        )}

        {/* EDIT & DELETE 버튼 */}
        {isAuthor && (
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={enterEdit}
              sx={{ bgcolor: 'primary.main' }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={deletePost}
              sx={{ borderColor: 'error.main', color: 'error.main' }}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>
    </>
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
