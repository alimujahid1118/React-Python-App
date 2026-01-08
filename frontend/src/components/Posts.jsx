import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

function Post({ isLoggedIn, setPosts, setAuthor, API_URL }) {
  const content = useRef("");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`${API_URL}/auth/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setAuthor(res.data.name);
    };

    fetchProfile();
  }, [setAuthor, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content_val = content.current.value;

    try {
      const res = await axios.post(
        `${API_URL}/auth/create-post`,
        {
          content: content_val,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const getRes = await axios.get(`${API_URL}/auth/get-all-posts`);

      setPosts([...getRes.data].reverse());

      Swal.fire({
        title: "Success!",
        text: "Post created successfully",
        icon: "success",
        confirmButtonText: "OK",
        position: "center",
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Unable to create post",
        icon: "error",
        confirmButtonText: "OK",
        position: "center",
      });
    }
  };

  return isLoggedIn ? (
    <div className="mt-[75px] p-6 bg-slate-100  ">
      <h1 className="text-black text-2xl mb-4 mt-[70px] text-center">
        Create a Post
      </h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center">
        <textarea
          placeholder="Content"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          ref={content}
        ></textarea>
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 max-w-[100px]"
        >
          Submit
        </button>
      </form>
    </div>
  ) : (
    ""
  );
}

export function Posts({ isLoggedIn, setPosts, posts, API_URL }) {
  const token = localStorage.getItem("access_token");
  const [author, setAuthor] = useState(null);
  const [openPostId, setOpenPostId] = useState(null);
  const postInput = useRef(null);

  const getPost = async (post_id) => {
    try {
      const res = await axios.get(`${API_URL}/auth/get-post/${post_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      setOpenPostId(post_id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // fetch all posts
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/get-all-posts`);
        setPosts([...res.data].reverse());
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [setPosts]);

  const updatePost = async (post_id) => {
    try {
      const res = await axios.put(
        `${API_URL}/auth/update-post/${post_id}`,
        {
          content: postInput.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === post_id
            ? { ...post, content: postInput.current.value }
            : post
        )
      );
      setOpenPostId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (post_id) => {
    try {
      const res = await axios.delete(`${API_URL}/auth/delete-post/${post_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setPosts((prevPost) => prevPost.filter((post) => post.id !== post_id));
      setOpenPostId(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-slate-100">
      {isLoggedIn ? (
        <Post
          isLoggedIn={isLoggedIn}
          setPosts={setPosts}
          posts={posts}
          author={author}
          setAuthor={setAuthor}
          setOpenPostId={setOpenPostId}
          API_URL={API_URL}
        />
      ) : (
        ""
      )}
      <h1 className="text-black text-2xl mb-4 mt-[70px] text-center">
        All Posts
      </h1>
      {posts.length === 0 ? (
        <p className="text-white">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div
            onClick={
              isLoggedIn
                ? author == post.author
                  ? () => {
                      getPost(post.id);
                    }
                  : undefined
                : undefined
            }
            key={post.id}
            className={
              author == post.author
                ? "bg-white hover:cursor-pointer p-4 mb-2 hover:p-6 hover:border-r-[2px] hover:border-b-[4px] hover:border-yellow-300 rounded break-words"
                : "bg-white p-4 mb-2 hover:p-6 hover:border-r-[2px] hover:border-b-[4px] hover:border-yellow-300 rounded break-words"
            }
          >
            {author === post.author && openPostId === post.id ? (
              <div className="inline-block">
                <label className="flex items-center space-x-6">
                  <b className="text-2xl text-slate-600">Enter Content:</b>
                  <div className="flex flex-row">
                    <textarea
                      type="text"
                      placeholder=" Here!"
                      className="bg-slate-200 rounded-md px-2 py-2"
                      ref={postInput}
                    />
                    <div className="flex flex-col ml-4">
                      <button
                        onClick={() => updatePost(post.id)}
                        className="bg-yellow-300 px-2 py-2 rounded-lg font-bold text-slate-600 hover:bg-white hover:border-2 hover:border-slate-600"
                      >
                        Update Post
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="bg-black px-2 py-2 mt-2 rounded-lg font-bold text-white hover:bg-white hover:text-black hover:border-2 hover:border-slate-600"
                      >
                        Delete Post
                      </button>
                    </div>
                  </div>
                </label>
                <p className="mt-2 text-sm text-gray-500 break-words">
                  By {post.author}
                </p>
              </div>
            ) : (
              <>
                <p>{post.content}</p>
                <p className="mt-2 text-sm text-gray-500 break-words">
                  By {post.author}
                </p>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
