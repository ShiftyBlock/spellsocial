import logo from "./logo.svg";
import "./App.css";
import styled from "@emotion/styled";
import React from "react";
import { useDropzone } from "react-dropzone";
import { FileImageFilled } from "@ant-design/icons";
import { supabase } from "./supabase";
import { v4 as uuid } from "uuid";

const Button = styled.div`
  border-radius: 100px;
  width: 90px;
  line-height: 80px;
  height: 90px;
  color: white;
  background-color: rgb(29, 155, 240);
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 80px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  right: 30px;
  bottom: 20px;
  position: fixed;
  text-align: center;
  z-index: 100;
`;

const HeaderH1 = styled.div`
  color: black;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const WrapperPost = styled.div`
  height: 100vh;
  position: fixed;
  width: 100vw;
  left: 0;
  top: 0;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Image = styled.div`
  background-image: url("${(props) => props.img}");
  width: 100px;
  height: 100px;
  background-size: cover;
  margin-bottom: 20px;
`;

const CommentWrapper = styled.div`
  flex-direction: column;
  display: flex;
  text-align: left;
  margin-bottom: 20px;
`;

const InputComment = styled.input`
  outline: none;
  font-size: 16px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 0.2rem;
  border: 1px solid black;
`;

const Label = styled.label`
  color: black;
  margin-bottom: 10px;
`;

const DropWrapper = styled.div`
  color: black;
  background: #f2f2f2;
  padding: 10px;
  width: 100%;
  margin-right: 20p;
  padding: 40px;
  border: 1px dashed #818181;
  margin-bottom: 20px;
`;

const PostButton = styled.button`
  all: unset;

  :disabled {
    background-color: gray;
  }
  background-color: rgb(29, 155, 240);
  padding: 10px;
  height: 20px;
  width: 100px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const GoBack = styled.div`
  background-color: gray;
  padding: 10px;
  height: 20px;
  width: 100px;
  border-radius: 10px;
`;

const BigWrapper = styled.div`
  top: 0px;
  bottom: 0px;
  z-index: 100;
`;

const sendToGPT = async (id, img) => {
  const response = await fetch(
    "https://finetune-virtual.tenant-fjuengermann-ai.coreweave.cloud/gpt-post",
    {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        image_url: img,
      }),
    }
  );
  console.log("RESPONSE", response.json());
};

function UploadButtonFresh({refresh}) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [comment, setComment] = React.useState("");
  const [imagePath, setImagePath] = React.useState("");

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  React.useEffect(() => {
    const image = acceptedFiles[0];

    const imagepth = uuid();
    supabase.storage
      .from("images")
      .upload(imagepth, image)
      .then(() => {
        setImagePath(imagepth);
        console.log("SET PATH", imagepth);
      });
  }, [acceptedFiles]);
  console.log(acceptedFiles);
  const uploadImageToServer = async () => {
    const id = Date.now() + Math.floor(Math.random() * 100);
    const img = `https://fteqfgebeqglejxnroll.supabase.co/storage/v1/object/public/images/${imagePath}`;
    await supabase.from("posts").insert({
      id: id,
      image: img,
      spell: null,
      comment: comment,
      created_at: new Date().toISOString(),
      parent: null,
    });
    setOpen(false);
    refresh();
    sendToGPT(id, img);
  };
  // state
  const [open, setOpen] = React.useState(false);
  return (
    <BigWrapper className="UploadButtonFresh">
      {open && (
        <WrapperPost>
          <HeaderH1>Create post</HeaderH1>
          <CommentWrapper>
            <Label>Post name</Label>
            <InputComment
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </CommentWrapper>
          <DropWrapper {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Upload image!</p>
            <FileImageFilled style={{ fontSize: "60px", color: "gray" }} />
          </DropWrapper>
          {imagePath && (
            <Image
              img={`https://fteqfgebeqglejxnroll.supabase.co/storage/v1/object/public/images/${imagePath}`}
            />
          )}
          <PostButton
            disabled={!imagePath || !comment}
            onClick={uploadImageToServer}
          >
            Post
          </PostButton>
          <GoBack onClick={() => setOpen(false)}>Go Back</GoBack>
        </WrapperPost>
      )}
      <Button onClick={() => setOpen(true)}>+</Button>
    </BigWrapper>
  );
}

export default UploadButtonFresh;
