import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LikeDislike from "./LikeDislike";

const { TextArea } = Input;

const SingleComment = (props) => {
  const videoId = useParams().videoId;
  const user = useSelector((state) => state.user);

  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");

  const onClickReplyOpen = (props) => {
    setOpenReply(!OpenReply);
  };

  const handleComment = (e) => {
    setCommentValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      content: CommentValue,
      postId: videoId,
      responseTo: props.comment._id,
    };

    axios.post("/api/comment/saveComment", variables).then((res) => {
      if (res.data.success) {
        setCommentValue("");
        setOpenReply(!OpenReply);
        props.refreshFunction(res.data.result);
      } else {
        alert("댓글을 등록할 수 없습니다.");
      }
    });
  };

  const actions = [
    <LikeDislike userId={user.userData._id} commentId={props.comment._id} />
    ,<span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  return (
    <>
      <div>
        {props.comment.writer && (
          <Comment
            actions={actions}
            author={props.comment.writer.name}
            avatar={<Avatar src={props.comment.writer.image} alt />}
            content={<p>{props.comment.content}</p>}
          />
        )}
      </div>
      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleComment}
            value={CommentValue}
            placeholder="댓글을 작성해주세요."
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </>
  );
};

export default SingleComment;
