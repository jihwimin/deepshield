import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../config";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/forum/posts/${id}`).then((res) => setPost(res.data));
    axios.get(`${API_BASE_URL}/api/forum/posts/${id}/comments`).then((res) => setComments(res.data));
  }, [id]);

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
      {comments.map((comment) => (
        <p key={comment._id}><strong>{comment.author}:</strong> {comment.content}</p>
      ))}
    </div>
  );
};

export default PostDetail;
