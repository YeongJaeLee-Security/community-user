export default function EditorContent({ content, setContent }) {
  return (
    <>
    <section>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}>
      </textarea>
    </section>
    </>
  );
}
