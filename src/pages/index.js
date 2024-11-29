import React, { useState } from 'react';
import Head from 'next/head';
import Announcement from '@/components/announcement';
import Feed from '@/components/feed';


export default function Home({ posts, searchQuery, setSearchQuery }) {
  

  // 검색어로 필터링 (예시)
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Sesac Community</title>
      </Head>
      <Announcement />
      <Feed posts={filteredPosts.reverse()} />
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
