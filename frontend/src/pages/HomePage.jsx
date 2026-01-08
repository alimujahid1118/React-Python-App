import { useState } from "react";
import { Posts } from "../components/Posts";

export function HomePage({ isLoggedIn, API_URL }) {
  const [posts, setPosts] = useState([]);

  return (
    <>
      <Posts
        isLoggedIn={isLoggedIn}
        setPosts={setPosts}
        posts={posts}
        API_URL={API_URL}
      />
    </>
  );
}
