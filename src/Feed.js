import styled from "styled-components";
import { Link } from "react-router-dom";

import ParentPost from "./ParentPost";
import Post from "./Post";

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  justify-content: center;
  margin: 0 auto;
`;

const posts = [
  {
    id: 1674341186711,
    created_at: "2023-01-21T22:46:26.615+00:00",
    spell: "Give this person a hat",
    image: "09cd1905-e9f4-4ffa-85c3-bc38ca184ea8",
    comment: "Hey, look I made this very cool post",
    username: "Logan Paul",
    userid: "loganpaul",
    userPicture: "/profileImages/profileImage.png",
    parent: null,
    likes: 2718,
    numComments: 10,
  },
  {
    id: 1674341186711,
    created_at: "2023-01-21T22:46:26.615+00:00",
    spell: "Set this building on fire",
    image: "09cd1905-e9f4-4ffa-85c3-bc38ca184ea8",
    comment:
      "I'm very excited about Spell Social. I think it's gonna be the next social platform",
    username: "Elon Musk",
    userid: "elonmusk",
    userPicture: "/profileImages/profileImage.png",
    parent: null,
    likes: 352,
    numComments: 4,
  },
];

function randomChoice(array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}

function Feed({ posts }) {
  const postSeeded = posts.map((p) => ({
    ...p,
    ...randomChoice([
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
    ]),
    userPicture: "/profileImages/profileImage.png",
    likes: Math.floor(Math.random() * 800) + 1,
    numComments: Math.floor(Math.random() * 20) + 1,
  }));
  return (
    <Container>
      {postSeeded.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Container>
  );
}

export default Feed;
