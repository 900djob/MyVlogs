import React, { useEffect, useState } from "react";
import Auth from "../../../hoc/auth";
import { Row, Col, List } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "antd/lib/avatar/avatar";
import SideVideos from "./Sections/SideVideos";

const VideoDetail = () => {
  const videoId = useParams().videoId;
  const variable = { videoId: videoId };

  const [VideoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
    axios.post("/api/videos/getVideoDetail", variable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setVideoDetail(res.data.videoDetail);
      } else {
        alert("비디오를 불러올 수 없습니다.");
      }
    });
  }, []);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video style={{ width: "100%" }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
            <List.Item actions>
              <List.Item.Meta 
                avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image}/>}
                title={VideoDetail.title}
                description={VideoDetail.description}
              />
            </List.Item>
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideos />
        </Col>
      </Row>
    </>
  );
};

export default Auth(VideoDetail, null);
