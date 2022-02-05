import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "./PostPage.module.css";
import Auth from "../../../hoc/auth";
import { Typography, Button, Form, message, Input } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Musics" },
  { value: 3, label: "Pets & Animals" },
];

const PostPage = () => {
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("film & animation");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");

  const onTitleChange = (e) => {
    setVideoTitle(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onPrivateChange = (e) => {
    setPrivate(e.target.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/videos/uploadfiles", formData, config).then((res) => {
      if (res.data.success) {

        let variable = {
          filePath: res.data.filePath,
          fileName: res.data.fileName,
        };
        setFilePath(res.data.filePath)

        axios.post("api/videos/thumbnails", variable).then((res) => {
          if (res.data.success) {
            setDuration(res.data.fileDuration)
            setThumbnailPath(res.data.thumbsFilePath)
          } else {
            alert("썸네일 생성에 실패했습니다.");
          }
        });
      } else {
        alert("업로드에 실패헸습니다.");
      }
    });
  };

  return (
    <>
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Title level={2}> Upload Video</Title>
        </div>
        <form onSubmit>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* drop zone */}
            <Dropzone onDrop={onDrop} mutiple={false} maxSize={800000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <AiOutlinePlus
                    style={{ fontSize: "3rem", cursor: "pointer" }}
                  />
                </div>
              )}
            </Dropzone>

            {/* thumbnail */}
            {ThumbnailPath && (
              <div>
                <img
                  src={`http://localhost:5000/${ThumbnailPath}`}
                  alt="thumbnail"
                />
              </div>
            )}
          </div>
          <br />
          <br />
          <label>Title</label>
          <Input onChange={onTitleChange} value={VideoTitle} />
          <br />
          <br />
          <label>Description</label>
          <TextArea onChange={onDescriptionChange} value={Description} />
          <br />
          <br />
          <label>Visibility :</label>
          <select
            style={{
              width: "20%",
              height: "2rem",
              marginLeft: "1rem",
              marginRight: "2rem",
            }}
            onChange={onPrivateChange}
          >
            {PrivateOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <label>Genre :</label>
          <select
            style={{
              width: "20%",
              height: "2rem",
              marginLeft: "1rem",
              marginRight: "2rem",
            }}
            onChange={onCategoryChange}
          >
            {CategoryOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <br />
          <br />
          <Button type="primary" size="large" onClick>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default Auth(PostPage, true);
