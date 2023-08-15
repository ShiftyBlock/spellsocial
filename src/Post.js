import styled from "styled-components";

import { VscComment, VscHeart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  padding-top: 20px;
  border-bottom: 1px solid #aaa;
`;

const UserColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
`;

const PostColumn = styled.div`
  width: 90%;
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  align-items: flex-start;
`;

const PostImage = styled.img`
  border: 1px solid #aaa;
  border-radius: 8px;
  margin-top: 15px;
  width: 90%;
`;
const PostImageLoading = styled.div`
  margin-top: 15px;
  width: 90%;
`;

const PostTitle = styled.span`
  display: flex;
  flex-direction: row;
`;

const PostUsername = styled.label`
  font-weight: bold;
  padding-right: 10px;
`;

const PostUserID = styled.label`
  color: #aaa;
`;

const PostComment = styled.label`
  padding-top: 10px;
  text-align: left;
  margin-right: 20px;
  color: #888;
`;

const SpellContainer = styled.div`
  background-color: #9893da;
  color: white;
  max-width: 78%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 7px;
  padding-bottom: 7px;
  //   border: 1px solid #2b2d42;
  border-radius: 4px;
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
  margin-top: 15px;
  align-items: center;
`;

const LikesIcon = styled.label`
  color: #aaa;
  font-size: 15pt;
`;
const LikesText = styled.label`
  color: #aaa;
  font-size: 13pt;
  margin-left: 5px;
  margin-bottom: 6px;
  margin-right: 15px;
`;

function Post({ post }) {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => post.id !== "loading" && navigate(`/post/${post.id}`)}
    >
      {/*<Link to={`/post/${post.id}`}>*/}
      <UserColumn>
        <img src={post.userPicture} width="50px" alt=""></img>
      </UserColumn>
      <PostColumn>
        <PostTitle>
          <PostUsername>{post.username}</PostUsername>
          <PostUserID>@{post.userid}</PostUserID>
        </PostTitle>
        <PostComment>{post.comment}</PostComment>
        {post.spell && (
          <SpellContainer>
            ✨<Spell>{post.spell}</Spell>
          </SpellContainer>
        )}
        {post.image ? (
          <PostImage src={post.image} width="200px"></PostImage>
        ) : (
          <PostImageLoading />
        )}
        <InteractionRow>
          <LikesIcon>
            <VscComment />
          </LikesIcon>
          <LikesText>{post.numComments}</LikesText>
          <LikesIcon>
            <VscHeart />
          </LikesIcon>
          <LikesText>{post.likes}</LikesText>
        </InteractionRow>
      </PostColumn>
      {/*</Link>*/}
    </Container>
  );
}

export default Post;
