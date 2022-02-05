import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "./PostPage.module.css";
import Auth from "../../../hoc/auth";
import { Typography, Button, Form, message, Input } from "antd";
import Dropzone from "react-dropzone";

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

  return (
    <>
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Title level={2}> Upload Video</Title>
        </div>
        <form onSubmit>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* drop zone */}
            <Dropzone onDrop mutiple maxSize>
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
            <div>
              <img src alt />
            </div>
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
          <select style={{width: "20%", height:"2rem"}} onChange={onPrivateChange}>
            {PrivateOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <br />
          <br />
          <select style={{width: "20%", height:"2rem"}} onChange={onCategoryChange}>
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
