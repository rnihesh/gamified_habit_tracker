import React from "react";
import { useContext, useEffect, useState } from "react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext.jsx";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import BlurText from "./BlurText";
import { getBaseUrl } from "../utils/config.js";

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);

  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log("isSignedIn :", isSignedIn);
  console.log("user :", user);
  console.log("isLoaded :", isLoaded);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 300);

    if (isLoaded && user) {
      setCurrentUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }

    return () => clearTimeout(timeoutId);
  }, [isLoaded, user]);

  useEffect(() => {
    if (currentUser?.email) {
      localStorage.setItem("currentuser", JSON.stringify(currentUser));
      console.log("Saved to localStorage:", currentUser);

      // Send user to your DB
      axios
        .post(`${getBaseUrl()}/user-api/user`, currentUser)
        .then((res) => {
          console.log("User created in DB:", res.data);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.error("Error creating user in DB:", err);
          setError("Could not create user");
        });
    }
  }, [currentUser]);

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="container">
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          {isSignedIn === false && (
            <div className="home-item p-5 rounded-5">
              <BlurText
                text="Welcome to HabiFy !?"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-2xl mb-8 w-100"
                style={{ fontSize: "1000px" }}
              />
              <div
                style={{ width: "100%", height: "600px", position: "relative" }}
              ></div>
            </div>
          )}
          {isSignedIn === true && (
            <div className="card">
              <ProgressBar value={50}></ProgressBar>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
