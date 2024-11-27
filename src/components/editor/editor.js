export default function Editor({ children, onSubmit }) {
  return (
    <>
      <form onSubmit={onSubmit}>
        {children}
        <button>Submit</button>
      </form>
    </>
  );
}
