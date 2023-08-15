import styled from "@emotion/styled";
import React from "react";
import { useParams, Link } from "react-router-dom";
import ParentPost from "./ParentPost";
import Post from "./Post";
import { supabase } from "./supabase";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { Rate } from "antd";

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const InputComment = styled.input`
  outline: none;
  font-size: 16px;
  margin: 0 auto;
  height: 20px;
  padding: 10px;
  border-radius: 0.2rem;
  border: none;
  marign-right: 10px;
`;

const PostButton = styled.button`
  all: unset;
  color: white;
  :disabled {
    background-color: gray;
  }
  background-color: rgb(29, 155, 240);
  padding: 10px;
  height: 20px;
  width: 60px;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  border-bottom: 1px solid #aaa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
`;

export default function Reply({ post, refresh, addLoadingComment }) {
  const [spellName, setSpellName] = React.useState("");
  const [strength, setStrength] = React.useState(3);
  const [loading, setLoading] = React.useState(false);
  const addSpell = async () => {
    addLoadingComment({ spell: spellName });
    const id = Date.now() + Math.floor(Math.random() * 100);
    // Get Image Path
    // fetch https://finetune-virtual.tenant-fjuengermann-ai.coreweave.cloud/spell
    console.log("INSIDE ADD SPEL");
    console.log(post.image, spellName, "SPELL SENT");
    setLoading(true);
    const response = await fetch(
      "https://finetune-virtual.tenant-fjuengermann-ai.coreweave.cloud/spell",
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: post.image,
          spell: spellName,
          cfg_text: 8.5 + strength * 0.8,
          cfg_image: 1.4,
        }),
      }
    );

    // get json response
    const json = await response.json();

    console.log(json.url, "RESPONSE");

    await supabase.from("posts").insert({
      id: id,
      image: json.url,
      spell: spellName,
      created_at: new Date().toISOString(),
      parent: post.id,
    });
    setLoading(false);

    console.log("added spell", spellName);
    refresh();
  };
  return (
    <Wrapper>
      <div>
        <InputComment
          value={spellName}
          placeholder={"Turn into Wizard..."}
          onChange={(e) => setSpellName(e.target.value)}
        />
        {loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <PostButton onClick={addSpell}>Spell</PostButton>
        )}
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <p style={{ marginRight: "20px", fontWeight: "bold" }}>Strength</p>
        <Rate
          character="🔥"
          value={strength}
          onChange={(value) => setStrength(value)}
          style={{ fontSize: 20, marginTop: "10px" }}
        />
      </div>
    </Wrapper>
  );
}
