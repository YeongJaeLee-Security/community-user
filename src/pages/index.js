import React from 'react';
import Head from 'next/head';
import Announcement from '@/components/announcement';
import Feed from '@/components/feed';

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Sesac Community</title>
      </Head>
      <Announcement />
      <Feed posts={posts} />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:8000/post');
  const posts = await res.json();

  return {
    props: { posts },
  };
}
