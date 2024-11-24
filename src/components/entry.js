import { useRef } from "react";
import Link from "next/link";

export default function Entry({ post }) {
  const articleRef = useRef(null);
  return (
    <>
      <article
        ref={articleRef}
        onMouseEnter={() =>  articleRef.current.focus()}
      >
        <Link
          href={{
            pathname: "/post/[pid]",
            query: { pid: post.pid },
          }}
        >
          <EntryHeader
            author={post.author}
            date={post.date}
          ></EntryHeader>
          <Content
            h={post.h}
            content={post.content}
          ></Content>
        </Link>
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

function Content({h, content}) {
  return (
    <section>
      <h2>{h}</h2>
      {content}
    </section>
  );
}

function Credit({author, date}) {
  const postTime = new Date(date);
  const currenTime = new Date();
  const diff = (currenTime - postTime)/(1000*60*60*24);
  return (
    <>
      {/* <Link
        href={{
          pathname: "/profile/[uid]",
          query: { uid: user.uid },
        }}
      > */}
        <span slot="authorName">{author}</span>
      {/* </Link> */}
      <span slot="separator"> </span>
      {/* <time dateTime={date}>{diff}</time> */}
      <time dateTime={date}>{date}</time>
    </>
  );
}

// export async function getStaticProps() {
//   const posts = await loadEntrys();

//   return {
//     props: {
//       posts,
//     },
//   };
// }

