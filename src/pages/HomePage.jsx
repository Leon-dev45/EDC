import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-con/firebase_config";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const user = localStorage.getItem("user");
  const [idea, setIdea] = useState({
    name: "",
    idea: "",
  });
  const navigation = useNavigate();

  const mouseHover = (type) => {
    if (type === 1) {
      setHover1(true);
    } else {
      setHover2(true);
    }
  };
  const mouseLeave = (type) => {
    if (type === 1) {
      setHover1(false);
    } else {
      setHover2(false);
    }
  };

  const addIdeas = async () => {
    if (idea.idea.length > 5) {
      try {
        const docRef = await addDoc(collection(db, "ideas"), {
          name: user,
          idea: idea.idea,
        });
        setIdea({
          name: "",
          idea: "",
        });
        alert("We have registered your idea");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div>
      <p style={{ fontSize: 50, fontWeight: "bold", color: "black" }}>
        {`Submit your ideas`}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <input
            type="text"
            style={{
              width: "60vh",
              height: 30,
              borderWidth: 2,
              borderColor: "gray",
              borderStyle: "solid",
              borderRadius: 5,
              padding: 5,
            }}
            placeholder="Enter your ideas here..."
            onChange={() =>
              setIdea((prev) => ({ ...prev, idea: event.target.value }))
            }
          />
          {idea.idea.length <= 5 && idea.idea.length > 0 && (
            <p
              style={{
                color: "red",
                fontStyle: "italic",
                textAlign: "start",
              }}
            >
              Idea field should contain more than 6 characters
            </p>
          )}
        </div>

        <button
          onMouseOver={() => mouseHover(2)}
          onMouseLeave={() => mouseLeave(2)}
          style={{
            width: "40vh",
            borderColor: "gray",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 10,
            backgroundColor: hover2 ? "gray" : "white",
          }}
          onClick={addIdeas}
        >
          Submit
        </button>
        <button
          onMouseOver={() => mouseHover(1)}
          onMouseLeave={() => mouseLeave(1)}
          style={{
            width: "40vh",
            borderColor: "gray",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 10,
            backgroundColor: hover1 ? "gray" : "white",
          }}
          onClick={() => navigation("/ideas")}
        >
          Submitted Ideas (Admin only)
        </button>
      </div>
    </div>
  );
}
