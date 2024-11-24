import Form from "next/form";

export default function Editor({ onSubmit, isLoading }) {
  return (
    <>
    <form onSubmit={onSubmit}>
      <input type="text" required></input>
      <input type="text" name="name" required/>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </form>
    </>
  );
}
