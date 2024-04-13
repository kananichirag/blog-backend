const Comment = require("../model/CommentModal");

const CreateComment = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;

    if (userId != req.user.id) {
      return res.json({
        success: false,
        msg: "You are not allowed to create this comment..!!",
      });
    }

    const newComment = new Comment({ userId, postId, content });
    await newComment.save();

    res.json({ success: true, msg: "Comment posted.!!", comment: newComment });
  } catch (error) {
    console.log(error);
  }
};

const GetPostComment = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });

    res.json(comments);
  } catch (error) {
    console.log(error);
  }
};

const LikeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.json({ msg: "Comment not Found.!!" });
    }

    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex == -1) {
      comment.numberoflikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberoflikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
  }
};

const EditComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.json({ msg: "Comment not Found.!!" });
    }

    if (comment.userId != req.user.id && !req.user.isAdmin) {
      return res.json({ msg: "You are not allow to edit this comment.!!" });
    }

    const editedcomment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { content: req.body.content },
      { new: true }
    );
    res.status(200).json(editedcomment);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  CreateComment,
  GetPostComment,
  LikeComment,
  EditComment,
};
