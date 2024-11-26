import { useRef } from "react";
import Link from "next/link";

import Credit from "./credit";
import Content from "./content";

export default function Entry({ post }) {
  const articleRef = useRef(null);
  return (
    <>
      <article
        ref={articleRef}
        onMouseEnter={() =>  articleRef.current.focus()}
      >
        <EntryHeader
          author={post.author}
          date={post.date}
        ></EntryHeader>
        <Content
          title={post.title}
          content={post.content}
        ></Content>
      </article>
      <hr></hr>
    </>
  );
}

function EntryHeader(props) {
  return (
    <section>
      <Credit {...props}></Credit>
    </section>
  );
}
