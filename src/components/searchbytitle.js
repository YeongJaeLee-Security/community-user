function SearchByTitle ({ posts }){
    console.log(posts); // 데이터를 확인
    return (
      <div>
        <h2>Search Results</h2>
        <ul>
          {posts.map((post, index) => (
            <li key={index}>{post.title}</li> // 예시로 제목 출력
          ))}
        </ul>
      </div>
    );
  }
  
  export default SearchByTitle;