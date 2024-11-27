export default function EditorTitle({ title, setTitle}) {
  return (
    <>
      <section>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        ></input>
      </section>
    </>
  );
}
