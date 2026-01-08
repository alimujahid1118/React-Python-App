import { useState } from "react";
import { Posts } from "../components/Posts";

export function HomePage({ isLoggedIn }) {
  const [posts, setPosts] = useState([]);

  return (
    <>
      <Posts isLoggedIn={isLoggedIn} setPosts={setPosts} posts={posts} />
    </>
  );
}
