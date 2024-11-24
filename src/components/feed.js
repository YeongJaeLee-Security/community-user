import Entry from "./entry";

export default function Feed({ posts, query }) {

  return (
    <section class="feed">
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Entry
                post={post}
              ></Entry>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
