import React from "react";
import logo from "./logo.svg";
import { ref, uploadBytes } from "firebase/storage";
import "./App.css";
import ImageUploading from "react-images-uploading";
import { storage, db } from "./firebase/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { supabase } from "./supabase";
import { v4 as uuid } from "uuid";
import Spell from "./Spell";

function UploadButton() {
  const [images, setImages] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
  const [comment, setComment] = React.useState("");
  const [imageAsUrl, setImageAsUrl] = React.useState({ imgUrl: "" });
  console.log(posts);
  const uploadImageToServer = async () => {
    const image = images[0].file;
    const imagePath = uuid();
    const { data, error } = await supabase.storage
      .from("images")
      .upload(imagePath, image);
    const id = Date.now() + Math.floor(Math.random() * 100);
    await supabase.from("posts").insert({
      id: id,
      image: `https://fteqfgebeqglejxnroll.supabase.co/storage/v1/object/public/images/${imagePath}`,
      spell: null,
      comment: comment,
      created_at: new Date().toISOString(),
      parent: null,
      username: "You",
      userid: "you",
      userPicture: "/profileImages/profileImage.png",
      likes: Math.floor(Math.random() * 800) + 1,
    });
  };

  const getAllPosts = async () => {
    // poll get all posts every second
    setInterval(async () => {
      const { data, error } = await supabase.from("posts").select("*");
      setPosts(data);
    }, 2000);
  };

  // get all posts react use effect
  React.useEffect(() => {
    getAllPosts();
  }, []);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
            <button onClick={uploadImageToServer}>Upload</button>
          </div>
        )}
      </ImageUploading>
      <div>
        <div>comment</div>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>
      <div>
        {posts.map((post) => (
          <Spell post={post} />
        ))}
      </div>
    </div>
  );
}

export default UploadButton;
