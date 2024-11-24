export async function loadPosts() {
  const res = await fetch('');
  const data = await res.json();

  return data;
}
