import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "../styles/PostDetail.css";
import likeIcon from "../icons/like-icon.png";
import editIcon from "../icons/edit-icon.png";
import deleteIcon from "../icons/delete-icon.png";
import sendIcon from "../icons/send-icon-post.png";
import logo from "../assets/deepshield-logo.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    if (!user || user.nickname !== post.author) {
      alert("You are not authorized to edit this post.");
      return;
    }
  
    const newTitle = prompt("Enter new title:", post.title);
    const newContent = prompt("Enter new content:", post.content);
  
    if (!newTitle || !newContent) {
      alert("Title and content cannot be empty.");
      return;
    }
  
    try {
      const res = await axios.put(`${API_BASE_URL}/api/forum/posts/${post._id}`, {
        title: newTitle,
        content: newContent,
        author: post.author, // Ensure the author field is included
        userId: user.nickname, // API might require this field for validation
      });
  
      setPost(res.data);
      alert("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error.response?.data || error);
      alert(error.response?.data?.error || "Error updating post. Please try again.");
    }
  };

  // Delete Post
  const handleDeletePost = async () => {
    if (!user || user.nickname !== post.author) return;
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/forum/posts/${post._id}`, {
        data: { userId: user.nickname },
      });

      alert("Post deleted!");
      navigate("/community");
    } catch (error) {
      alert("Error deleting post.");
    }
  };

  const handleLikePost = async () => {
    if (!user) {
      alert("You must be logged in to like a post.");
      return;
    }
  
    try {
      const res = await axios.post(`${API_BASE_URL}/api/forum/posts/${post._id}/like`, {
        userId: user.nickname, // Ensure userId is sent
      });
  
      setPost((prevPost) => ({
        ...prevPost,
        likes: res.data.likes || prevPost.likes + 1, // Ensure UI updates correctly
      }));
    } catch (error) {
      console.error("Error liking post:", error.response?.data || error);
      alert(error.response?.data?.error || "Error liking post. Please try again.");
    }
  };
  

  // Edit Comment
  const handleEditComment = async (commentId, currentContent, commentAuthor) => {
    if (!user || user.nickname !== commentAuthor) return;
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
      alert("Error updating comment.");
    }
  };

  // Delete Comment
  const handleDeleteComment = async (commentId, commentAuthor) => {
    if (!user || user.nickname !== commentAuthor) return;
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/forum/posts/${post._id}/comments/${commentId}`, {
        data: { userId: user.nickname },
      });

      setComments(comments.filter(comment => comment._id !== commentId));
      alert("Comment deleted successfully!");
    } catch (error) {
      alert("Error deleting comment.");
    }
  };

  // Post a Comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to comment.");
      return;
    }

    if (!commentText.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/forum/posts/${post._id}/comments`, {
        content: commentText.trim(),
        author: user.nickname,
      });

      setComments([...comments, res.data]);
      setCommentText("");
    } catch (error) {
      alert("Error posting comment. Please try again.");
    }
  };

  if (loading) return <p>Loading post...</p>;

  return (
    <div className={`main-container ${isScrolled ? "scrolled" : ""}`}>
     {/* Header */}
     {/* Header (Disappears on Scroll) */}
     <header className={`header ${isScrolled ? "hidden" : ""}`}>
       <img src={logo} alt="DeepShield Logo" className="header-logo" />
       <h1 className="header-title" style={{ fontWeight: "normal", marginRight: "-50px"}}>
         <Link to="/dashboard" className="logo-link">
           <span className="deep">D</span><span className="black">eep</span>
           <span className="shield">S</span><span className="black">hield</span>
         </Link>
       </h1>
       <div className="auth-links-container" style={{ marginRight: "50px" }}>
         <div className="auth-links">
           <Link to="/login">login</Link>
           <span> / </span>
           <Link to="/signup">sign up</Link>
         </div>
       </div>
     </header>


     {/* Navigation Bar (Fixed) */}
     <nav className="nav-bar">
       <h1 className="nav-title">
         <Link to="/dashboard" className="logo-link">
           <span className="deep">D</span><span className="white">eep</span>
           <span className="shield">S</span><span className="white">hield</span>
         </Link>
       </h1>
       <div className="auth-links-container" style={{ marginRight: "100px" }}>
         <div className="nav-links">
           <Link to="/report">Report a Deepfake</Link>
           <Link to="/assistant">Get Mental Support</Link>
           <Link to="/community">Join the Community</Link>
           <Link to="/about-us">About Us</Link>
         </div>
       </div>
     </nav>

      {/* Post Container */}
      <div className="post-container">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <p className="post-author">Posted by: {post.author}</p>
        <p className="post-time">Posted on: {new Date(post.createdAt).toLocaleString()}</p>

        <div className="post-actions">
          <button className="like-button" onClick={handleLikePost}>
            <img src={likeIcon} alt="Like" />
            <span>{post.likes} Likes</span>
          </button>

          {user && user.nickname === post.author && (
            <div className="post-options">
              <button onClick={handleEditPost}><img src={editIcon} alt="Edit" /></button>
              <button onClick={handleDeletePost}><img src={deleteIcon} alt="Delete" /></button>
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="comment-section">
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="comment-box">
              <p className="comment-text"><strong>{comment.author}:</strong> {comment.content}</p>
              <p className="comment-time">Posted on: {new Date(comment.createdAt).toLocaleString()}</p>

              {user && user.nickname === comment.author && (
                <div className="comment-options">
                  <button onClick={() => handleEditComment(comment._id, comment.content, comment.author)}>
                    <img src={editIcon} alt="Edit" />
                  </button>
                  <button onClick={() => handleDeleteComment(comment._id, comment.author)}>
                    <img src={deleteIcon} alt="Delete" />
                  </button>
                </div>
              )}
            </div>
          ))
        )}

        {/* Write Comment Box */}
        <form className="comment-input" onSubmit={handleSubmitComment}>
          <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." required />
          <button type="submit">
            <img src={sendIcon} alt="Send" />
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default PostDetail;
