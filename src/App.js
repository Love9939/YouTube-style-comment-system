import "./styles.css";

import React, { useState } from "react";

const Comment = ({ comment, addReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim()) {
      addReply(comment.id, {
        id: Date.now(),
        text: replyText,
        replies: [],
      });
      setReplyText("");
      setShowReplyBox(false);
    }
  };

  return (
    <div className="comment">
      <p>{comment.text}</p>
      <button
        className="reply-btn"
        onClick={() => setShowReplyBox(!showReplyBox)}
      >
        Reply
      </button>

      {showReplyBox && (
        <div className="reply-box">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button onClick={handleReply}>Post Reply</button>
        </div>
      )}

      <div className="replies">
        {comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} addReply={addReply} />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const addComment = () => {
    if (commentText.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), text: commentText, replies: [] },
      ]);
      setCommentText("");
    }
  };

  const addReply = (parentId, reply) => {
    const addNestedReply = (items) =>
      items.map((item) =>
        item.id === parentId
          ? { ...item, replies: [...item.replies, reply] }
          : { ...item, replies: addNestedReply(item.replies) }
      );

    setComments(addNestedReply(comments));
  };

  return (
    <div className="container">
      <h2>Comment System</h2>
      <div className="comment-input">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={addComment}>Comment</button>
      </div>

      <div className="comment-list">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} addReply={addReply} />
        ))}
      </div>
    </div>
  );
}
