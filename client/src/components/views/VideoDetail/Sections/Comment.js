import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import { Button, Input } from 'antd';
import ReplyComment from './ReplyComment';

const { TextArea } = Input;

const Comment = (props) => {
  const user = useSelector(state => state.user)

  const [CommentValue, setCommentValue] = useState("");

  const handleComment = (e) => {
    setCommentValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      content: CommentValue,
      postId: props.postId
    }

    axios.post('/api/comment/saveComment', variables)
    .then(res => {
      if(res.data.success) {
        setCommentValue("")
        props.refreshFunction(res.data.result);
      } else {
        alert('댓글을 등록할 수 없습니다.')
      }
    })
  }

  return (
    <>
      <div>
        <br />
        <p>Replies</p>
        <hr />
        {/* Comments List */}
        {props.commentList &&
          props.commentList.map(
            (comment, index) =>
              !comment.responseTo && (
                <React.Fragment key={index}>
                  <SingleComment
                    comment={comment}
                    postId={props.postId}
                    refreshFunction={props.refreshFunction}
                  />
                  <ReplyComment
                    commentList={props.commentList}
                    parentCommentId={comment._id}
                    postId={props.postId}
                    refreshFunction={props.refreshFunction}
                  />
                </React.Fragment>
              )
          )}

        {/* Root Comment Form */}
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
      </div>
    </>
  );
};

export default Comment;
