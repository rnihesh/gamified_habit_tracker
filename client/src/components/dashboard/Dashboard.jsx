import React, { useContext, useEffect, useState } from "react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import { getBaseUrl } from "../utils/config.js";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";

function Dashboard() {
  const { currentUser } = useContext(userAuthorContextObj);
  console.log(currentUser);
  const [userDet, setUserDet] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${getBaseUrl()}/user-api/userDet`, {
          params: { email: currentUser.email },
        });
        setUserDet(res.data);
        console.log("res.data: ", res.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUserDetails();
    console.log("user details: ", userDet);
  }, [currentUser.email]);
  useEffect(() => {
    console.log("user details: ", userDet);
  }, [userDet]);

  return (
    <div className="dashboard">
      {/* Top Section (Purple Header) */}
      <div
        style={{ backgroundColor: "#6f42c1" }}
        className="text-white p-3 rounded-top"
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex ">
            {/* Avatar */}
            <img
              src={currentUser.profileImageUrl}
              alt="User Avatar"
              className=" mr-2"
              style={{
                marginRight: "8px",
                width: "100px",
                borderRadius: "10px",
              }}
            />
            <div className="d-flex flex-column justify-content-between  my-3">
              <h6 className="mb-0">{currentUser.firstName}</h6>
              <div>
                <small>
                  <div className="d-flex justify-content-between">
                    <span>⚡️ {userDet.score}</span>
                    <span>
                      Level: {Math.floor((userDet.score || 0) / 100) + 1}
                    </span>
                  </div>
                </small>
              </div>
              <div className="card">
                {/* <p>{userDet}</p> */}
                <ProgressBar
                  value={userDet.score % 100}
                  showValue
                  style={{ height: "15px" }}
                  color="lightblue"
                />
              </div>
            </div>
          </div>
          <div>
            <h5 className="mb-0 pixeFont">Play HabiFy</h5>
            <button
              className="btn btn-light btn-sm mt-2"
              onClick={() => navigate("/leaderboard")}
            >
              Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container my-4">
        <div className="row justify-content-center">
          {/* Habits Section */}
          <div className="col-md-3 mx-3 mb-4">
            <div>
              <h5 className="mb-3">Habits</h5>
              <ul className="ps-3">
                <li>Take a short break</li>
                <li>Click here to do this bad habit you'd like to quit</li>
                <li>Sleep</li>
              </ul>
              <button className="btn btn-outline-primary btn-sm mt-2">
                Add a Habit
              </button>
            </div>
          </div>

          {/* Dailies Section */}
          <div className="col-md-3 mx-3 mb-4">
            <div>
              <h5 className="mb-3">Dailies</h5>
              <ul className="ps-3">
                <li>5 minutes of quiet breathing</li>
              </ul>
              <button className="btn btn-outline-primary btn-sm mt-2">
                Add a Daily
              </button>
            </div>
          </div>

          {/* Rewards Section */}
          <div className="col-md-3 mx-3 mb-4">
            <div>
              <h5 className="mb-3">Rewards</h5>
              <ul className="ps-3">
                <li>Reward yourself!</li>
              </ul>
              <button className="btn btn-outline-primary btn-sm mt-2">
                Add a Reward
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
