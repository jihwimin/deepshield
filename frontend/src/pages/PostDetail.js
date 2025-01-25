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
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

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

  const handleEditPost = async () => {
    if (!user || user.nickname !== post.author) return; // Restrict access

    const newTitle = prompt("Enter new title:", post.title);
    const newContent = prompt("Enter new content:", post.content);
    if (!newTitle || !newContent) return;

    try {
      const res = await axios.put(`${API_BASE_URL}/api/forum/posts/${post._id}`, {
        title: newTitle,
        content: newContent,
        category: post.category,
        userId: user.nickname,
      });

      setPost(res.data);
      alert("Post updated successfully!");
    } catch (error) {
      alert(error.response?.data?.error || "Error updating post.");
    }
  };

  const handleDeletePost = async () => {
    if (!user || user.nickname !== post.author) return; // Restrict access

    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/forum/posts/${post._id}`, {
        data: { userId: user.nickname },
      });

      alert("Post deleted!");
      navigate("/forum");
    } catch (error) {
      alert(error.response?.data?.error || "Error deleting post.");
    }
  };

  const handleLikePost = async () => {
    if (!user) {
      alert("You must be logged in to like a post.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/forum/posts/${post._id}/like`, {
        userId: user.nickname,
      });

      setPost((prevPost) => ({ ...prevPost, likes: res.data.likes }));
    } catch (error) {
      alert(error.response?.data?.error || "Error liking post.");
    }
  };

  const handleEditComment = async (commentId, currentContent, commentAuthor) => {
    if (!user || user.nickname !== commentAuthor) return; // Restrict access

    const newContent = prompt("Edit your comment:", currentContent);
    if (!newContent) return;

    try {
      const res = await axios.put(`${API_BASE_URL}/api/forum/posts/${post._id}/comments/${commentId}`, {
        content: newContent,
        userId: user.nickname,
      });

      setComments(comments.map(comment => comment._id === commentId ? res.data : comment));
      alert("Comment updated successfully!");
    } catch (error) {
      alert(error.response?.data?.error || "Error updating comment.");
    }
  };

  const handleDeleteComment = async (commentId, commentAuthor) => {
    if (!user || user.nickname !== commentAuthor) return; // Restrict access

    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/forum/posts/${post._id}/comments/${commentId}`, {
        data: { userId: user.nickname },
      });

      setComments(comments.filter(comment => comment._id !== commentId));
      alert("Comment deleted successfully!");
    } catch (error) {
      alert(error.response?.data?.error || "Error deleting comment.");
    }
  };

  if (loading) return <p>Loading post...</p>;

  return (
    <div>
      <button onClick={() => navigate("/forum")} style={{ marginBottom: "15px" }}>⬅ Back</button>
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

          {/* ✅ Only show edit & delete buttons for post owner */}
          {user && user.nickname === post.author && (
            <>
              <button onClick={handleEditPost} style={{ marginLeft: "10px" }}>✏️ Edit</button>
              <button onClick={handleDeletePost} style={{ marginLeft: "10px", color: "red" }}>🗑 Delete</button>
            </>
          )}
        </>
      )}

      <h3>Comments</h3>
      {comments.length === 0 ? <p>No comments yet. Be the first to comment!</p> : (
        comments.map((comment) => (
          <div key={comment._id} style={{ borderBottom: "1px solid #ddd", padding: "5px 0" }}>
            <p><strong>{comment.author}:</strong> {comment.content}</p>
            <p><small>Posted on: {new Date(comment.createdAt).toLocaleString()}</small></p>

            {/* ✅ Only show edit & delete buttons for comment owner */}
            {user && user.nickname === comment.author && (
              <>
                <button onClick={() => handleEditComment(comment._id, comment.content, comment.author)}>✏️ Edit</button>
                <button onClick={() => handleDeleteComment(comment._id, comment.author)} style={{ marginLeft: "10px", color: "red" }}>🗑 Delete</button>
              </>
            )}
          </div>
        ))
      )}

      {/* Comment Form */}
      <form onSubmit={(e) => {
        e.preventDefault();
        if (!user) {
          alert("You must be logged in to comment.");
          return;
        }

        axios.post(`${API_BASE_URL}/api/forum/posts/${post._id}/comments`, {
          content: commentText,
          author: user.nickname,
        }).then((res) => {
          setComments([...comments, res.data]);
          setCommentText("");
        }).catch((error) => {
          alert("Error posting comment.");
        });
      }}>
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
