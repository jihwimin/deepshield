import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postRes = await axios.get(`${API_BASE_URL}/api/forum/posts/${id}`);
        const commentsRes = await axios.get(`${API_BASE_URL}/api/forum/posts/${id}/comments`);
        setPost(postRes.data);
        setComments(commentsRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post or comments:", error);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("You must be logged in to comment.");
        return;
      }

      const newComment = { content: commentText, author: user.nickname };
      const res = await axios.post(`${API_BASE_URL}/api/forum/posts/${id}/comments`, newComment);

      setComments([...comments, res.data]);
      setCommentText("");
    } catch (error) {
      alert("Error posting comment.");
    }
  };

  const handleEditPost = async () => {
    const newTitle = prompt("Enter new title:", post.title);
    const newContent = prompt("Enter new content:", post.content);
    if (!newTitle || !newContent) return;

    try {
      const res = await axios.put(`${API_BASE_URL}/api/forum/posts/${post._id}`, {
        title: newTitle,
        content: newContent,
        category: post.category,
      });

      setPost(res.data);
      alert("Post updated successfully!");
    } catch (error) {
      alert("Error updating post.");
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/forum/posts/${post._id}`);
      alert("Post deleted!");
      navigate("/forum");
    } catch (error) {
      alert("Error deleting post.");
    }
  };

  const handleLikePost = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("You must be logged in to like a post.");
        return;
      }
  
      const res = await axios.post(`${API_BASE_URL}/api/forum/posts/${post._id}/like`, {
        userId: user.nickname, // ✅ Send the user's nickname
      });
  
      setPost((prevPost) => ({ ...prevPost, likes: res.data.likes }));
    } catch (error) {
      console.error("Error liking post:", error);
      alert(error.response?.data?.error || "Error liking post.");
    }
  };
  

  const handleEditComment = async (commentId, currentContent) => {
    const newContent = prompt("Edit your comment:", currentContent);
    if (!newContent) return;

    try {
      const res = await axios.put(`${API_BASE_URL}/api/forum/posts/${id}/comments/${commentId}`, {
        content: newContent,
      });

      setComments(comments.map(comment => comment._id === commentId ? res.data : comment));
      alert("Comment updated successfully!");
    } catch (error) {
      alert("Error updating comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/forum/posts/${id}/comments/${commentId}`);
      setComments(comments.filter(comment => comment._id !== commentId));
      alert("Comment deleted successfully!");
    } catch (error) {
      alert("Error deleting comment.");
    }
  };

  if (loading) return <p>Loading post...</p>;

  return (
    <div>
      {post && (
        <>
          <h2>{post.title}</h2>
          <p><strong>Category:</strong> {post.category}</p>
          <p>{post.content}</p>
          <p><strong>By:</strong> {post.author}</p>
          <p><strong>Likes:</strong> {post.likes}</p>
          <p><strong>Posted on:</strong> {new Date(post.createdAt).toLocaleString()}</p>

          {/* Like Post Button */}
          <button onClick={handleLikePost}>👍 Like ({post.likes || 0})</button>

          {/* Edit & Delete Post Buttons */}
          <button onClick={handleEditPost} style={{ marginLeft: "10px" }}>✏️ Edit</button>
          <button onClick={handleDeletePost} style={{ marginLeft: "10px", color: "red" }}>🗑 Delete</button>
        </>
      )}

      <h3>Comments</h3>
      {comments.length === 0 ? <p>No comments yet. Be the first to comment!</p> : (
        comments.map((comment) => (
          <div key={comment._id} style={{ borderBottom: "1px solid #ddd", padding: "5px 0" }}>
            <p><strong>{comment.author}:</strong> {comment.content}</p>
            <p><small>Posted on: {new Date(comment.createdAt).toLocaleString()}</small></p>

            {/* Edit & Delete Comment Buttons */}
            <button onClick={() => handleEditComment(comment._id, comment.content)}>✏️ Edit</button>
            <button onClick={() => handleDeleteComment(comment._id)} style={{ marginLeft: "10px", color: "red" }}>🗑 Delete</button>
          </div>
        ))
      )}

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          required
          style={{ width: "100%", height: "80px" }}
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default PostDetail;
