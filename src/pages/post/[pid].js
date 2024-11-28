import { useState } from "react";
import Head from "next/head";

import Entry from "@/components/entry/entry";
import EntryHeader from "@/components/entry/entryheader";
import EntryContent from "@/components/entry/entrycontent";
import Editor from "@/components/editor/editor";
import EditorContent from "@/components/editor/editorcontent";
import EntryTitle from "@/components/entry/entrytitle";
import EntryBody from "@/components/entry/entrybody";
import { useAuth } from "@/context/authcontext";
import { useRouter } from "next/router";

export default function Post({ post }) {
  const { authId } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(post.content);

  const isAuthor = post.author === authId;
  const router = useRouter();

  async function enterEdit() {
    setIsEdit(true);
  }

  function cancelEdit() {
    setContent(post.content);
    setIsEdit(false);
  }

  const url = `http://localhost:8000/post/${post.id}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const options = {
    headers,
    post_id: post.id,
  }

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
  }

  async function deletePost() {
    const response = await fetch(url, {
      ...options,
      method: "DELETE",
    });
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>{post.title} : Community Sesac</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {(isAuthor) &&
        <section>
          <button onClick={enterEdit}>Edit</button>
          <button onClick={deletePost}>Delete</button>
        </section>
      }
      <Entry>
        <EntryHeader
          author={post.author}
          date={post.date}
        ></EntryHeader>
        <EntryContent>
          <EntryTitle title={post.title}></EntryTitle>
          {isEdit ?
            <Editor onSubmit={editContent}>
              <EditorContent content={content} setContent={setContent}></EditorContent>
              <button onClick={cancelEdit}>Cancel</button>
            </Editor>
          :
            <EntryBody body={post.content}></EntryBody>
          }
        </EntryContent>
      </Entry>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:8000/post`);
  const posts = await res.json();

  const paths = posts.map((post) => {
      return {
          params: { pid: post.id.toString() },
      };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:8000/post/${params.pid}`);
  const post = await res.json();

  return { props: { post }, };
}
