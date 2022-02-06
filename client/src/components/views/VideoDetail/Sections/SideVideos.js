import React, { useEffect, useState } from "react";
import axios from "axios";

const SideVideos = () => {
  const [SideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/videos/getVideos").then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setSideVideos(res.data.videos);
      } else {
        alert("비디오를 불러올 수 없습니다.");
      }
    });
  }, []);

  const renderSideVideos = SideVideos.map((video, index) => {

    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    console.log(video)
    
    return (
      <div key={index}
        style={{
          display: "flex",
          marginTop: "1rem",
          marginBottom: "1rem",
          padding: "0 2rem",
        }}
      >
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <a href>
            <img
              style={{ width: "100%", height: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </div>
        <div style={{ width: "50%"}}>
          <a href style={{color: "grey"}}>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {video.title}
            </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views}</span>
            <br />
            <span>
              {minutes} : {seconds}
            </span>
          </a>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div style={{ marginTop: "3rem" }} />
      {renderSideVideos}
    </React.Fragment>
  );
};

export default SideVideos;
