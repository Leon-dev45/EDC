import React, { useEffect } from "react";
import { useState } from "react";
import { auth, provider } from "../firebase-con/firebase_config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const navigation = useNavigate();

  const mouseHover = (type) => {
    if (type == 1) {
      setHover1(true);
    } else {
      setHover2(true);
    }
  };
  const mouseLeave = (type) => {
    if (type == 1) {
      setHover1(false);
    } else {
      setHover2(false);
    }
  };

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        if (user) {
          localStorage.setItem("user", user.displayName);
          navigation("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <p style={{ fontWeight: "bold", fontSize: 50, color: "black" }}>
        Login Page
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <input
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
          placeholder="Enter you mail"
        />
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
        >
          Continue with email
        </button> */}
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
          onClick={googleLogin}
        >
          Continue with google
        </button>
      </div>
    </div>
  );
}
