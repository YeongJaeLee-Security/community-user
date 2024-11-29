export default function EntryImage({ imagePath, alt }) {
    if (!imagePath) return null;
  
    return (
      <img src={`http://localhost:8000/${imagePath}`}  />
    );
  }
  