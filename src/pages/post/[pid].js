import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Paper, Typography, TextField } from "@mui/material";
import { useAuth } from "@/context/authcontext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Post({ post }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [content, setContent] = useState(post.content);
  const [imageFile, setImageFile] = useState(null);
  const [prevImage, setPrevImage] = useState(post.image_path);
  const [removeImage, setRemoveImage] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const { isLoggedIn, authId } = useAuth();
  const router = useRouter();
  const isAuthor = post.author === authId;

  function enterEdit() {
    setIsEdit(true);
  }

  function cancelEdit() {
    setContent(post.content);
    setImageFile(null);
    setPrevImage(post.image_path);
    setRemoveImage(false);
    setIsEdit(false);
  }

  const editContent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);

    if (removeImage) {
      formData.append("remove_image", "true");
    }

    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      const response = await fetch(`http://localhost:8000/post/${post.id}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      alert("게시글이 수정되었습니다.");
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteImage = async () => {
    try {
      const response = await fetch(`http://localhost:8000/post/${post.id}/delete_image`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete image");
      }  
      setPrevImage(null);
      setRemoveImage(true);
      setImageFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`http://localhost:8000/post/${post.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitReport = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
  };

  return (
    <>
      <Head>
        <title>{post.title} : Community Sesac</title>
        <meta name="description" content={`Post by ${post.user.username} on ${post.date}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
          <Link href={`http://localhost:3000/profile/${post.user.id}`}>
            작성자: {post.user.username}
          </Link>
          | 날짜: {post.date}
        </Typography>

        {isEdit ? (
          <Box component="form" onSubmit={editContent} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              multiline
              rows={5}
              fullWidth
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Edit your content..."
            />
            {prevImage && !removeImage && (
              <Box sx={{ mt: 2 }}>
                <Box component="img" src={`http://localhost:8000/${prevImage}`} sx={{ maxWidth: "100%" }} />
                <Button variant="outlined" color="error" onClick={deleteImage}>
                  Remove Image
                </Button>
              </Box>
            )}
            <box sx={{ display: "flex", alignItems: "center", gap: 2,}}>
            <Button variant="contained" color="primary" component="label" sx={{ bgcolor: 'primary.main', width: "fit-content"}} >
            Attach image
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} hidden />
            </Button>
            </box>
            {imageFile && (
              <Typography sx={{ mt: 1, color: "gray" }}>Selected File: {imageFile.name}</Typography>
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={cancelEdit}>
                Cancel
              </Button>
            </Box>
          </Box>
        ) : isReporting ? (
          <Box component="form" onSubmit={submitReport} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              placeholder="Enter report reason..."
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" color="primary" type="submit">
                Submit Report
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setIsReporting(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Typography>{content}</Typography>
            {prevImage && (
              <Box component="img" src={`http://localhost:8000/${prevImage}`} sx={{ maxWidth: "100%" }} />
            )}
          </>
        )}
      </Paper>

      {/* 버튼들 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        {/* REPORT 버튼 */}
        {isLoggedIn && !isAuthor && !isReporting && (
          <Button variant="outlined" color="warning" onClick={() => setIsReporting(true)}>
            Report
          </Button>
        )}
        {/* EDIT & DELETE 버튼 */}
        {isAuthor && !isEdit && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={enterEdit}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={deletePost}>
              Delete
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:8000/post");
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { pid: post.id.toString() } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:8000/post/${params.pid}`);
  const post = await res.json();
  return { props: { post } };
}
