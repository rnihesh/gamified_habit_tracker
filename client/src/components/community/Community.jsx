import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Heart from "../../assets/heart.svg";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext.jsx";
import { getBaseUrl } from "../utils/config.js";
import { motion } from "framer-motion";

function Community() {
  const [posts, setPosts] = useState([]);
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(userAuthorContextObj);

  async function getPosts() {
    try {
      const res = await axios.get(`${getBaseUrl()}/user-api/posts`);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async function handlePost() {
    if (!desc.trim()) return;
    try {
      await axios.post(`${getBaseUrl()}/user-api/post`, {
        firstName: currentUser.firstName,
        profileImageUrl: currentUser.profileImageUrl,
        desc,
        score: 0,
      });
      setDesc("");
      getPosts();
    } catch (error) {
      console.error("Error posting:", error);
    }
  }

  async function handleLike(id) {
    try {
      await axios.put(`${getBaseUrl()}/user-api/like/${id}`);
      getPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4 text-primary">Community Wall 🧠</h2>

      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="d-flex align-items-start gap-2">
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="📝 Share your thoughts, ideas, or questions..."
            className="form-control shadow-sm"
            rows={3}
            style={{ resize: "none", flex: 1 }}
          />
          <button
            className="btn btn-success shadow-sm"
            style={{ height: "100%" }}
            onClick={handlePost}
          >
            🚀 Post
          </button>
        </div>
      </motion.div>

      {posts.length === 0 ? (
        <p className="text-muted">
          No posts yet. Be the first to share something!
        </p>
      ) : (
        posts.map((post, index) => (
          <motion.div
            key={post._id}
            className="card mb-3 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <div className="card-body p-3">
  <div className="d-flex align-items-start mb-2">
    <img
      src={post.profileImageUrl}
      alt="avatar"
      className="rounded-circle me-3"
      width="40"
      height="40"
    />
    <div>
      <h6 className="mt-3 fw-semibold">{post.firstName}</h6>
    </div>
  </div>

  <p className="mb-3">{post.desc}</p>

  <div className="d-flex justify-content-end align-items-center gap-2">
    <button
      onClick={() => handleLike(post._id)}
      className="btn btn-sm btn-light border d-flex align-items-center"
    >
      <img src={Heart} alt="like" width="14px" />
    </button>
    <small className="text-muted">{post.likeCount} likes</small>
  </div>
</div>

          </motion.div>
        ))
      )}
    </div>
  );
}

export default Community;
