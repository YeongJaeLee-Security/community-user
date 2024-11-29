import Feed from "@/components/feed";
import { Typography } from "@mui/material";

export default function Profile({ user }) {
  return (
    <>
      <Typography variant="body1">
        u/{user.username}
      </Typography>
      <Feed posts={[...user.posts].reverse()} />
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:8000/auth/profile`);
  const users = await res.json();

  const paths = users.map((user) => ({
    params: {
      uid: user.id.toString(),
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:8000/auth/profile/${params.uid}`);
  const user = await res.json();

  return { props: { user } };
}
