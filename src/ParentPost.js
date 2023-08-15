import styled from "styled-components";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

import { VscComment, VscHeart } from "react-icons/vsc";

const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border-bottom: 1px solid #aaa;
`;

const PostRow = styled.div``;

const PostImage = styled.img`
  border: 1px solid #aaa;
  border-radius: 8px;
  width: 90%;
  margin-top: 15px;
`;

const PostUsername = styled.label`
  font-size: 14pt;
  font-weight: bold;
  padding-right: 10px;
`;

const PostUserID = styled.label`
  color: #aaa;
  font-size: 11pt;
`;

const PostComment = styled.div`
  padding-top: 10px;
  text-align: left;
  font-size: 14pt;
  margin-right: 20px;
  margin-left: 20px;
  color: #888;
`;

const SpellContainer = styled.div`
  background-color: #9893da;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 7px;
  padding-bottom: 7px;
  border-radius: 4px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
`;

const Spell = styled.div`
  margin-left: 10px;
`;

const InteractionRow = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid #aaa;
  padding-top: 16px;
  padding-bottom: 12px;
  padding-left: 20px;
  margin-top: 15px;
  align-items: center;
`;

const LikesIcon = styled.label`
  color: #aaa;
  font-size: 17pt;
`;
const LikesText = styled.label`
  color: #aaa;
  font-size: 14pt;
  margin-left: 5px;
  margin-bottom: 6px;
  margin-right: 15px;
`;

const UserRow = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  margin-bottom: 10px;
  align-items: flex-start;
`;

const UserInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px;
`;

const Back = styled.div`
  text-align: left;
  padding-left: 20px;
  padding-bottom: 10px;
`;

function ParentPost(props) {
  const navigate = useNavigate();
  return (
    <Container>
      <Back onClick={() => navigate(-1)}>Back</Back>
      <UserRow>
        <img src={props.post.userPicture} width="50px" alt=""></img>
        <UserInfoColumn>
          <PostUsername>{props.post.username}</PostUsername>
          <PostUserID>@{props.post.userid}</PostUserID>
        </UserInfoColumn>
      </UserRow>
      <PostRow>
        <PostComment>{props.post.comment}</PostComment>
        {props.post.spell && (
          <SpellContainer>
            ✨<Spell>{props.post.spell}</Spell>
          </SpellContainer>
        )}
        <PostImage src={props.post.image} width="200px"></PostImage>
      </PostRow>
      <InteractionRow>
        <LikesIcon>
          <VscComment />
        </LikesIcon>
        <LikesText>{props.post.numComments}</LikesText>
        <LikesIcon>
          <VscHeart />
        </LikesIcon>
        <LikesText>{props.post.likes}</LikesText>
      </InteractionRow>
    </Container>
  );
}

export default ParentPost;
