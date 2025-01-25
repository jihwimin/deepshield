const express = require("express");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const router = express.Router();

// Create a new post
router.post("/posts", async (req, res) => {
    try {
      const { title, content, author, category } = req.body;
  
      // Validate inputs
      if (!title || !content || !author || !category) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newPost = new Post({ title, content, author, category, likes: 0 });
      await newPost.save();
  
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Error creating post" });
    }
  });
  

// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// Get a single post
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error fetching post" });
  }
});

// Edit a Post
router.put("/posts/:id", async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, category },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Error updating post" });
  }
});

// Delete a Post
router.delete("/posts/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id }); // Delete all related comments
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
});

// Create a comment on a post
router.post("/posts/:id/comments", async (req, res) => {
  try {
    const { content, author } = req.body;
    const newComment = new Comment({ postId: req.params.id, content, author });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error adding comment" });
  }
});

// Get all comments for a post
router.get("/posts/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id }).sort({ createdAt: 1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
});

// Edit a Comment
router.put("/posts/:postId/comments/:commentId", async (req, res) => {
    try {
      const { content } = req.body;
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        { content },
        { new: true }
      );
      res.json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: "Error updating comment" });
    }
  });
  
// Delete a Comment
router.delete("/posts/:postId/comments/:commentId", async (req, res) => {
try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: "Comment deleted successfully" });
} catch (error) {
    res.status(500).json({ error: "Error deleting comment" });
}
});

// Like a Post (One Like Per User)
router.post("/posts/:id/like", async (req, res) => {
    try {
      const { userId } = req.body; // Get the user ID (nickname)
  
      if (!userId) {
        return res.status(400).json({ error: "User ID (nickname) is required." });
      }
  
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: "Post not found." });
  
      // ✅ Prevent multiple likes from the same user
      if (post.likedBy.includes(userId)) {
        return res.status(400).json({ error: "You have already liked this post." });
      }
  
      // ✅ Add like and store the user in likedBy array
      post.likes += 1;
      post.likedBy.push(userId);
      await post.save();
  
      res.json({ likes: post.likes });
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ error: "Error liking post." });
    }
  });
  
module.exports = router;
