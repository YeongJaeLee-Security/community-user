import Entry from "./entry/entry";
import EntryHeader from "./entry/entryheader";
import EntryContent from "./entry/entrycontent";

import Link from "next/link";
import EntryTitle from "./entry/entrytitle";
import EntryBody from "./entry/entrybody";

export default function Feed({ posts }) {
  return (
    <section className="feed">
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
                <Entry>
                  <EntryHeader
                    author={post.author}
                    date={post.date}
                  ></EntryHeader>
                  <EntryContent>
                    <EntryTitle title={post.title}></EntryTitle>
                    <EntryBody body={post.content}></EntryBody>
                  </EntryContent>
                </Entry>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
