import React from "react";
import "./App.css";
import ImageUploading from "react-images-uploading";
import { storage, db } from "./firebase/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { supabase } from "./supabase";

import { v4 as uuid } from "uuid";

function Spell({ post }) {
  const [spellName, setSpellName] = React.useState("");
  const addSpell = async () => {
    const id = Date.now() + Math.floor(Math.random() * 100);
    // Get Image Path
    // fetch https://finetune-virtual.tenant-fjuengermann-ai.coreweave.cloud/spell
    console.log("INSIDE ADD SPEL");
    console.log(post.image, spellName, "SPELL SENT");
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

    console.log("added spell", spellName);
  };
  return (
    <div key={post.id}>
      <img src={post.image} />
      <p>{post.spell}</p>
      <input value={spellName} onChange={(e) => setSpellName(e.target.value)} />
      <button onClick={addSpell}>add spell</button>
    </div>
  );
}

export default Spell;
