import styled from "@emotion/styled";
import React from "react";
import { useParams, Link } from "react-router-dom";
import ParentPost from "./ParentPost";
import Post from "./Post";
import Reply from "./Reply";
import { supabase } from "./supabase";

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`;

const fetchPost = async (id) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  console.log("post:", data, "error", error);
  return data;
};
const fetchComments = async (id) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("parent", id)
    .order("created_at", { ascending: false });
  console.log("comments", data, "error", error);
  return data;
};

function randomChoice(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}

function seedContent(posts) {
  const postsSeeded = posts.map((p) => ({
    ...p,
    ...(p.username ? {} : randomChoice([
      {
        username: "Elon Musk",
        userid: "elonmusk",
      },
      {
        username: "Logan Paul",
        userid: "loganpaul",
      },
      {
        username: "Batman",
        userid: "batman",
      },
      {
        username: "Prof. X",
        userid: "professor",
      },
      {
        username: "You",
        userid: "you",
      },
    ])),
    userPicture: p.userPicture ?? "/profileImages/profileImage.png",
    likes: Math.floor(Math.random() * 800) + 1,
    numComments: Math.floor(Math.random() * 20) + 1,
  }));
  return postsSeeded;
}

export default function Postpage() {
  const { id } = useParams();
  console.log("post id", id);
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    fetchPost(id).then((new_post) => setPost(new_post));
    fetchComments(id).then((new_comments) =>
      setComments(seedContent(new_comments))
    );
  }, [id]);

  const refreshComments = async () => {
    const newComments = await fetchComments(id);
    const commentsSeeded = seedContent(newComments);
    setComments(commentsSeeded);
  };

  const addLoadingComment = ({ spell }) => {
    setComments([
      {
        id: "loading",
        spell,
      },
      ...comments,
    ]);
  };

  if (!post) {
    return <div>Loading...</div>;
  }
  const postSeeded = {
    ...post,
    ...(post.username ? {} : randomChoice([
      {
        username: "Elon Musk",
        userid: "elonmusk",
      },
      {
        username: "Logan Paul",
        userid: "loganpaul",
      },
      {
        username: "Batman",
        userid: "batman",
      },
      {
        username: "Prof. X",
        userid: "professor",
      },
      {
        username: "You",
        userid: "you",
      },
    ])),
    userPicture: post.userPicture ?? "/profileImages/profileImage.png",
    likes: Math.floor(Math.random() * 800) + 1,
    numComments: comments.length,
  };

  return (
    <div>
      <ParentPost post={postSeeded} />
      <Reply
        post={post}
        refresh={refreshComments}
        addLoadingComment={addLoadingComment}
      />
      <Container>
        {comments.map((c) => (
          <Post key={c.id} post={c} />
        ))}
      </Container>
    </div>
  );
}
