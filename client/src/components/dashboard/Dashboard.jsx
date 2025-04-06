import React, { useContext, useEffect, useState } from "react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import { getBaseUrl } from "../utils/config.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";

function Dashboard() {
  const { currentUser } = useContext(userAuthorContextObj);
  const [userDet, setUserDet] = useState("");
  const navigate = useNavigate();
  const [showHabitInput, setShowHabitInput] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [showDailyInput, setShowDailyInput] = useState(false);
  const [newDailyName, setNewDailyName] = useState("");
  const [doneDailies, setDoneDailies] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${getBaseUrl()}/user-api/userDet`, {
          params: { email: currentUser.email },
        });
        setUserDet(res.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUserDetails();
  }, [currentUser.email]);

  useEffect(() => {
    console.log("user details: ", userDet);
  }, [userDet]);

  const incrementHabit = async (taskName) => {
    try {
      const response = await axios.put(`${getBaseUrl()}/user-api/t-incr`, {
        email: currentUser.email,
        taskName,
      });
      console.log("Task incremented:", response.data.tasks);
      // Optional: refresh user details to update score/level
      setUserDet((prev) => ({
        ...prev,
        tasks: response.data.tasks,
        score: prev.score + 5, // assuming +5 for now
      }));
    } catch (error) {
      console.error(
        "Error incrementing habit:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  const decrementHabit = async (taskName) => {
    try {
      const response = await axios.put(`${getBaseUrl()}/user-api/t-decr`, {
        email: currentUser.email,
        taskName,
      });
      console.log("Task decremented:", response.data.tasks);
      setUserDet((prev) => ({
        ...prev,
        score: prev.score - 5,
        tasks: response.data.tasks,
      }));
    } catch (error) {
      console.error(
        "Error decrementing habit:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  const createHabit = async () => {
    if (!newHabitName.trim()) return;

    try {
      const res = await axios.post(`${getBaseUrl()}/user-api/create-task`, {
        email: userDet.email,
        taskName: newHabitName.trim(),
      });

      setUserDet((prev) => ({
        ...prev,
        tasks: res.data.tasks,
      }));

      setNewHabitName("");
      setShowHabitInput(false);
    } catch (err) {
      console.error("Error creating habit:", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const createDaily = async () => {
    if (!newDailyName.trim()) return;

    try {
      const res = await axios.post(`${getBaseUrl()}/user-api/create-daily`, {
        email: userDet.email,
        taskName: newDailyName.trim(),
      });

      setUserDet((prev) => ({
        ...prev,
        daily: res.data.daily,
      }));

      setNewDailyName("");
      setShowDailyInput(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add daily");
    }
  };
  const handleDailyClick = (dailyName) => {
    if (!doneDailies.includes(dailyName)) {
      setDoneDailies((prev) => [...prev, dailyName]);
    }
  };
  const incrementDaily = async (taskName) => {
    if (doneDailies.includes(taskName)) return; // 👈 Prevent double click

    try {
      const res = await axios.put(`${getBaseUrl()}/user-api/d-incr`, {
        email: userDet.email,
        taskName,
      });

      setUserDet((prev) => ({
        ...prev,
        daily: res.data.daily,
        score: prev.score + 10, // Optional visual feedback
      }));

      setDoneDailies((prev) => [...prev, taskName]); // ✅ Mark as done
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to increment daily");
    }
  };

  const avatars = [
    {
      name: "Zen Frog",
      emoji: "🐸",
      cost: 60,
    },
    {
      name: "Cozy Cat",
      emoji: "🐱",
      cost: 70,
    },
    {
      name: "Night Coder",
      emoji: "🧛‍♂",
      cost: 80,
    },
    {
      name: "Space Explorer",
      emoji: "👽",
      cost: 90,
    },
    {
      name: "Wizard of Focus",
      emoji: "🧙‍♂",
      cost: 100,
    },
    {
      name: "Skeleton Punk",
      emoji: "💀",
      cost: 110,
    },
    {
      name: "Productivity Hero",
      emoji: "🦸‍♀",
      cost: 120,
    },
    {
      name: "Cyber Bot",
      emoji: "🤖",
      cost: 130,
    },
    {
      name: "Royal Achiever",
      emoji: "👑",
      cost: 140,
    },
    {
      name: "Dragon Tamer",
      emoji: "🐉",
      cost: 150,
    },
  ];

  return (
    <div className="dashboard">
      {/* Top Section */}
      <div
        style={{ backgroundColor: "#6f42c1" }}
        className="text-white p-3 rounded-top"
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <img
              src={currentUser.profileImageUrl}
              alt="User Avatar"
              style={{
                marginRight: "8px",
                width: "100px",
                borderRadius: "10px",
              }}
            />
            <div className="d-flex flex-column justify-content-between my-3">
              <h6 className="mb-0">{currentUser.firstName}</h6>
              <small className="d-flex justify-content-between w-100">
                <span>⚡ {userDet.score}</span>
                <span>Level: {Math.floor((userDet.score || 0) / 100) + 1}</span>
              </small>
              <div
                className="bg-white rounded mt-1"
                style={{ padding: "2px 6px" }}
              >
                <ProgressBar
                  value={userDet.score % 100}
                  showValue
                  style={{ height: "12px" }}
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

      {/* Main Sections */}
      <div className="container my-4">
        <div className="row justify-content-center g-4">
          {/* Habits Section */}
          <div className="col-md-3">
            <div className="section-box">
              <h6 className="mb-3 fw-bold">Habits</h6>
              {userDet?.tasks?.length > 0 ? (
                userDet.tasks.map((task, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center border rounded px-2 py-1 mb-2"
                  >
                    <span>
                      {task.name}{" "}
                      <span className="badge bg-secondary">{task.count}</span>
                    </span>
                    <div>
                      <button
                        className="btn btn-sm btn-success me-1"
                        onClick={() => incrementHabit(task.name)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => decrementHabit(task.name)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No habits yet.</p>
              )}

              <div className="mt-3">
                {showHabitInput ? (
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Enter habit name"
                      value={newHabitName}
                      onChange={(e) => setNewHabitName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && createHabit()}
                    />
                    <button
                      className="btn btn-success me-1"
                      onClick={createHabit}
                    >
                      ✔
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowHabitInput(false);
                        setNewHabitName("");
                      }}
                    >
                      ✖
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setShowHabitInput(true)}
                  >
                    Add a Habit
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Dailies Section */}

          <div className="col-md-3">
            <div className="section-box p-3 rounded border bg-white shadow-sm">
              <h6 className="mb-3 fw-bold d-flex justify-content-between align-items-center">
                Dailies
                <span className="badge bg-purple">
                  {userDet?.daily?.length || 0}
                </span>
              </h6>

              {userDet?.daily?.length > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {userDet.daily.map((d, i) => {
                    const isDone = doneDailies.includes(d.name);
                    return (
                      <div
                        key={i}
                        className={`d-flex justify-content-between align-items-center px-3 py-2 rounded ${
                          isDone
                            ? "bg-light text-muted text-decoration-line-through"
                            : "bg-body"
                        }`}
                        style={{
                          cursor: isDone ? "not-allowed" : "pointer",
                          border: "1px solid #ddd",
                          transition: "background 0.2s ease",
                        }}
                        onClick={() => {
                          if (!isDone) incrementDaily(d.name);
                        }}
                      >
                        <span>{d.name}</span>
                        <span className="badge bg-secondary">{d.count}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted mt-2">No dailies yet.</p>
              )}

              {/* Input section */}
              <div className="mt-3">
                {showDailyInput ? (
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Enter daily name"
                      value={newDailyName}
                      onChange={(e) => setNewDailyName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && createDaily()}
                    />
                    <button
                      className="btn btn-success me-1"
                      onClick={createDaily}
                    >
                      ✔
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowDailyInput(false);
                        setNewDailyName("");
                      }}
                    >
                      ✖
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-outline-primary btn-sm w-100"
                    onClick={() => setShowDailyInput(true)}
                  >
                    Add a Daily
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Rewards Section */}
          <div className="col-md-5">
            <div className="section-box">
              <h6 className="mb-3 fw-bold">Avatar Shop</h6>
              <div className="d-flex flex-wrap gap-3">
                {avatars
                  .filter((a) => !userDet?.rewards?.includes(a.name))
                  .map((a, idx) => (
                    <div
                      key={idx}
                      className="d-flex flex-column align-items-center justify-content-between p-2 rounded border"
                      style={{
                        width: "90px",
                        minHeight: "130px",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <div style={{ fontSize: "1.8rem" }}>{a.emoji}</div>
                      <div
                        className="text-center"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {a.name}
                      </div>
                      <span
                        className="badge bg-warning text-dark"
                        style={{ fontSize: "0.75rem" }}
                      >
                        ⚡ {a.cost}
                      </span>
                      <button
                        className="btn btn-sm btn-outline-primary mt-1"
                        style={{ fontSize: "0.7rem" }}
                        onClick={() => handleBuyAvatar(a)}
                      >
                        Buy
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
