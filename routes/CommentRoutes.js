const express = require("express");
const CommentRoute = express.Router();
const CommentController = require("../Controller/CommentController");
const { verifyToken } = require("../utils/verifyuser");

CommentRoute.post("/create", verifyToken, CommentController.CreateComment);
CommentRoute.get("/getcomment/:postId", CommentController.GetPostComment);
CommentRoute.put(
  "/likecomment/:commentId",
  verifyToken,
  CommentController.LikeComment
);

CommentRoute.put(
  "/editcomment/:commentId",
  verifyToken,
  CommentController.EditComment
);
module.exports = CommentRoute;
