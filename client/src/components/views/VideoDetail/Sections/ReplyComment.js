import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

const ReplyComment = (props) => {

  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReply, setOpenReply] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    props.commentList.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.commentList, props.parentCommentId]);
  

  const renderCommentLists = (parentCommentId) =>
    props.commentList.map((comment, index) => (
      <React.Fragment key={index}>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: '80%', marginLeft: '40px' }}>
            <SingleComment
              comment={comment}
              postId={props.postId}
              refreshFunction={props.refreshFunction}
            />
            <ReplyComment
              commentList={props.commentList}
              postId={props.postId}
              parentCommentId={comment._id}
              refreshFunction={props.refreshFunction}
            />
          </div>
        )}
      </React.Fragment>
    ));
  

  const onHandleChange = () => {
    setOpenReply(!OpenReply);
  }

  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: "0", color: "grey", cursor: "pointer" }}
          onClick={onHandleChange}
        >
          View {ChildCommentNumber} more comment(s)
        </p>
      )}
      {OpenReply && renderCommentLists(props.parentCommentId)}
    </div>
  );
};

export default ReplyComment;
