import React from "react";
import { supabase } from "./supabase";
import UploadButton from "./UploadButton";
import UploadButtonFresh from "./UploadButtonFresh";

import Feed from "./Feed";

const loadPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .is("parent", null)
    .order("created_at", { ascending: false });

  console.log("all posts:", data, "error", error);
  return data;
};

export default function Frontpage() {
  const [posts, setPosts] = React.useState([]);

  const refresh = async () => {
    const new_posts = await loadPosts();
    setPosts(new_posts);
  };
  React.useEffect(() => {
    refresh();
  }, []);

  // refresh every 

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <h1>Page 1</h1>
      <header className="App-header">
        <UploadButtonFresh />
        <UploadButton />
      </header> */}
      <UploadButtonFresh refresh={refresh}/>
      <Feed posts={posts} />
    </div>
  );
}
