import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
} from "@ant-design/icons";
import axios from "axios";

const LikeDislike = (props) => {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  let variable = {};
  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    axios.post("/api/like/getLikes", variable).then((res) => {
      if (res.data.success) {
        setLikes(res.data.likes.length);
        res.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("좋아요를 불러올 수 없습니다.");
      }
    });

    axios.post("/api/like/getDislikes", variable).then((res) => {
      if (res.data.success) {
        setDislikes(res.data.dislikes.length);
        res.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("싫어요를 불러올 수 없습니다.");
      }
    });
  }, []);

  const onLike = () => {
    /*
      ㅇ 좋아요를 하지 않았을 경우
        - 좋아요를 +1 하고
        - 좋아요 상태를 liked로 한다.

      이때, 싫어요 버튼을 누른 상태라면(싫어요가 1인 상태)
        - 싫어요를 없애고
        - 싫어요를 -1 한다.

      ㅇ 좋아요를 한 경우(좋아요가 1인 상태)
        - 좋아요상태를 null로 하고
        - 좋아요를 -1 한다.
     */
    if (LikeAction !== "liked") {
      axios.post("/api/like/upLike", variable).then((res) => {
        if (res.data.success) {
          setLikes(Likes + 1);
          setLikeAction("liked");
          if (DislikeAction === "disliked") {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          alert("좋아요를 할 수 없습니다.");
        }
      })
    } else {
      axios.post("/api/like/unLike", variable).then((res) => {
        if (res.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert("좋아요를 취소할 수 없습니다.");
        }
      });
    }
  };
    /*
      ㅇ 싫어요를 한 경우(싫어요가 1인 상태)
        - 싫어요를 -1 하고
        - 싫어요 상태를 null로 한다.
      
      ㅇ 싫어요를 하지 않은 경우
        - 싫어요를 +1 하고
        - 싫어요 상태를 dislike로 한다.

      이때, 좋아요를 한 경우(좋아요가 1인 상태)
        - 좋아요를 null로 하고
        - 좋아요를 -1 한다.
    */
  const onDislike = () => {
    if (DislikeAction === "disliked") {
      axios.post("/api/like/unDislike", variable).then((res) => {
        if (res.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert("싫어요를 할 수 없습니다.");
        }
      });
    } else {
      axios.post("/api/like/upDislike", variable).then((res) => {
        if (res.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction("disliked");
          if (LikeAction === "liked") {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          alert("싫어요를 취소할 수 없습니다.");
        }
      });
    }
  };

  return (
    <>
      <div>
        <span key="comment-like">
          <Tooltip title="like">
            {LikeAction === "liked" ? (
              <span>
                <LikeFilled onClick={onLike} />
                <span
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    cursor: "auto",
                  }}
                >
                  {Likes}
                </span>
              </span>
            ) : (
              <span>
                <LikeOutlined onClick={onLike} />
                <span
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    cursor: "auto",
                  }}
                >
                  {Likes}
                </span>
              </span>
            )}
          </Tooltip>
        </span>
        <span key="comment-dislike">
          <Tooltip title="dislike">
            {DislikeAction === "disliked" ? (
              <span>
                <DislikeFilled onClick={onDislike} />
                <span
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    cursor: "auto",
                  }}
                >
                  {Dislikes}
                </span>
              </span>
            ) : (
              <span>
                <DislikeOutlined onClick={onDislike} />
                <span
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    cursor: "auto",
                  }}
                >
                  {Dislikes}
                </span>
              </span>
            )}
          </Tooltip>
        </span>
      </div>
    </>
  );
};

export default LikeDislike;
