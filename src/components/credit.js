export default function Credit({ author, date }) {
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
