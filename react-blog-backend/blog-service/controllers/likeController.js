const Like = require("../models/Like");
const Post = require("../models/Post");
const logger = require("../blogLogs/logger"); // Import logger for logging request and response details

const addLike = async (req, res) => {
  try {
    const targetPost = Post.findById(req.params.id);
    if (!targetPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (Like.findOne) {
      return res
        .status(400)
        .json({ message: "A like already exists for this user and post" });
    } else {
      const like = new Like({
        user: req.user.id,
        post: req.params.id,
      });
      await like.save();
      targetPost.likes.push(like._id);
      await targetPost.save();
      res.status(201).json({ message: "Like added successfully" });
    }
  } catch (error) {
    logger.error(`Error occurred while adding like: ${error.message}`, {
      stack: error.stack,
    });
    res
      .status(500)
      .json({ message: "Failed to add like", error: error.message });
  }
};

const removeLike = async (req, res) => {
  try {
    const targetPost = await Post.findById(req.params.id);
    const targetLike = await like.findOne({
      user: req.user.id,
      post: req.params.id,
    });
    if (!targetLike) {
      return res.status(404).json({ message: "Like not Found" });
    } else if (targetLike.user != req.user.id) {
      return res.status(403).json({ message: "Unauthorized to remove like" });
    } else {
      targetLike.deleteOne();
      targetPost.likes = targetPost.likes.filter(
        (like) => like._id.toString() !== targetLike._id.toString()
      );
    }
  } catch (error) {
    logger.error(`Error occurred while removing the like ${error.message}`, {
      stack: error.stack,
    });
    res
      .status(500)
      .json({ message: "Failed to remove like", error: error.massage });
  }
};
// TODO
// 1. Setup and Imports
// Objective: Import necessary modules and models.
// Steps:
// Import the Like model to interact with the likes collection:
// Import the Post model to interact with the posts collection:

// 2. Implement the addLike Function
// Function Name: addLike
// Objective: Add a like to a specific post by the current user.
// Steps:
// Use Post.findById(req.params.id) to check if the post exists.
// Return a 404 Not Found error if the post does not exist.
// Use Like.findOne() to check if the user has already liked the post.
// Return a 400 Bad Request error if a like already exists for this user and post.
// Create a new Like document with the user (from req.user.id) and post (from req.params.id).
// Save the Like document using like.save().
// Update the post:
// Add the like._id to the post.likes array.
// Save the updated post using post.save().
// Respond with a 201 Created status and the created like.

// 3. Implement the removeLike Function
// Function Name: removeLike
// Objective: Remove a like from a specific post by the current user.
// Steps:
// Use Like.findOne() to find the like document for the current user and post.
// Return a 404 Not Found error if the like does not exist.
// Check if the like.user matches req.user.id.
// Return a 403 Forbidden error if the current user is not authorized to remove the like.
// Delete the like using like.deleteOne().
// Update the post:
// Remove the like._id from the post.likes array using the filter method.
// Save the updated post using post.save().
// Respond with a success message.

// 4. Implement the getLikesByPost Function
// Function Name: getLikesByPost
// Objective: Fetch all likes for a specific post.
// Steps:
// Use Like.find() to retrieve all likes where the post matches req.params.id.
// Use populate() to include the user's name and email fields in the result.
// Respond with the retrieved likes in JSON format.

// 5. Error Handling
// Objective: Ensure robust error handling for each function.
// Steps:
// Wrap the logic of each function in a try...catch block.
// Log any errors to the console for debugging.
// Respond with a 500 Internal Server Error status and a descriptive error message in case of failure.
