import React, { useEffect, useState } from "react";
import Auth from "../../../hoc/auth";
import { Row, Col, List } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "antd/lib/avatar/avatar";
import SideVideos from "./Sections/SideVideos";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";
import { useSelector } from "react-redux";

const VideoDetail = () => {
  const videoId = useParams().videoId;
  const user = useSelector(state => state.user)

  const [VideoDetail, setVideoDetail] = useState([]);
  const [Comments, setComments] = useState([]);

  useEffect(() => {
    let variable = { videoId: videoId };

    axios.post("/api/videos/getVideoDetail", variable).then((res) => {
      if (res.data.success) {
        setVideoDetail(res.data.videoDetail);
      } else {
        alert("비디오를 불러올 수 없습니다.");
      }
    });

    axios.post("/api/comment/getComments", variable).then((res) => {
      if (res.data.success) {
        setComments(res.data.comments)
      } else {
        alert("댓글을 불러올 수 없습니다.");
      }
    });
  }, [videoId]);

  if (VideoDetail.writer) {
    var subscribeBtn = VideoDetail.writer._id !== user.userData._id && (
      <Subscribe
        userTo={VideoDetail.writer._id}
        userFrom={user.userData._id}
      />
    );
  }

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment))
  }

  return (
    <>
      {VideoDetail.writer && (
        <Row gutter={[16, 16]}>
          <Col lg={18} xs={24}>
            <div style={{ width: "100%", padding: "3rem 4rem" }}>
              <div>
                <video
                  style={{ width: "100%" }}
                  src={`http://localhost:5000/${VideoDetail.filePath}`}
                  controls
                />
                <List.Item actions={[subscribeBtn]}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={VideoDetail.writer && VideoDetail.writer.image}
                      />
                    }
                    title={VideoDetail.title}
                    description={VideoDetail.description}
                  />
                </List.Item>
                <Comment refreshFunction={refreshFunction} commentList={Comments} postId={videoId} />
              </div>
            </div>
          </Col>
          <Col lg={6} xs={24}>
            <SideVideos />
          </Col>
        </Row>
      )}
    </>
  );
};

export default Auth(VideoDetail, null);
