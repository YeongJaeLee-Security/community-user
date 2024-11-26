import Entry from "./entry";

import Link from "next/link";

export default function Feed({ posts }) {
  return (
    <section class="feed">
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link
                href={{
                  pathname: "/post/[pid]",
                  query: { pid: post.id },
                }}
              >
                <Entry
                  post={post}
                ></Entry>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
