import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../config";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/forum/posts/${id}`).then((res) => setPost(res.data));
    axios.get(`${API_BASE_URL}/api/forum/posts/${id}/comments`).then((res) => setComments(res.data));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("You must be logged in to comment.");
        return;
      }

      await axios.post(`${API_BASE_URL}/api/forum/posts/${id}/comments`, {
        content: commentText,
        author: user.nickname, // Use user's nickname
      });

      setComments([...comments, { content: commentText, author: user.nickname }]);
      setCommentText("");
    } catch (error) {
      alert("Error posting comment.");
    }
  };

  return (
    <div>
      {post && (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p><strong>By:</strong> {post.author}</p>
        </>
      )}

      <h3>Comments</h3>
      {comments.map((comment, index) => (
        <p key={index}><strong>{comment.author}:</strong> {comment.content}</p>
      ))}

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default PostDetail;
