import React from "react";
import { useContext, useEffect, useState } from "react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext.jsx";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import BlurText from "./BlurText";
import { getBaseUrl } from "../utils/config.js";
import Particles from "./Particles";
import ASCIIText from "./ASCIIText";
import ScrollVelocity from "./ScrollVelocity";
import { useRef } from "react";
import VariableProximity from "./VariableProximity";

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
  const containerRef = useRef(null);

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
            <div className=" p-5 rounded-5">
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <ASCIIText
                  text="HabiFy !!"
                  enableWaves={true}
                  asciiFontSize={1}
                />

                <div style={{ marginTop: "700px" }}>
                  <ScrollVelocity
                    texts={["Task It", "Complete It", "Get Rewards"]}
                    velocity={100}
                    className="custom-scroll-text"
                  />
                </div>
                <div ref={containerRef} style={{ position: "relative" }}>
                  {/* <VariableProximity
                    label={
                      "Hover me! And then star React Bits on GitHub, or else..."
                    }
                    className={"variable-proximity-demo"}
                    fromFontVariationSettings="'wght' 400, 'opsz' 30"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={containerRef}
                    radius={100}
                    falloff="linear"
                  /> */}
                </div>
              </div>
            </div>
          )}
          {isSignedIn === true && (
            <div className="card">
              <p>Go to Dashboard </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
