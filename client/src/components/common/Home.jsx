import React from "react";
import { useContext, useEffect, useState } from "react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext.jsx";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import BlurText from "./BlurText";

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

    setCurrentUser({
      ...currentUser,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.emailAddresses[0].emailAddress,
      profileImageUrl: user?.imageUrl,
    });

    return () => clearTimeout(timeoutId);
  }, [isLoaded]);

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
                text="Isn't this so cool?!"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-2xl mb-8 w-100"
                style={{ fontSize: '1000px' }}
              />
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
